"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { getServerSession } from "next-auth/next"

import prisma from "@/lib/db"
import { authOptions } from "@/lib/auth"

// Schema for claim creation
const claimSchema = z.object({
  productId: z.string().min(1, "Please select a product"),
  issueType: z.string().min(1, "Please select an issue type"),
  issueDescription: z.string().min(10, "Description must be at least 10 characters"),
  contactPreference: z.string().min(1, "Please select a contact preference"),
})

export async function createClaim(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "CUSTOMER") {
    return {
      error: {
        _form: ["You must be logged in as a customer to submit claims"],
      },
    }
  }

  const validatedFields = claimSchema.safeParse({
    productId: formData.get("productId"),
    issueType: formData.get("issueType"),
    issueDescription: formData.get("issueDescription"),
    contactPreference: formData.get("contactPreference"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { productId, issueType, issueDescription, contactPreference } = validatedFields.data

  // Get customer profile
  const customerProfile = await prisma.customerProfile.findFirst({
    where: {
      userId: session.user.id,
    },
  })

  if (!customerProfile) {
    return {
      error: {
        _form: ["Customer profile not found"],
      },
    }
  }

  // Check if product is registered to this customer
  const registration = await prisma.productRegistration.findFirst({
    where: {
      productId,
      customerId: customerProfile.id,
    },
  })

  if (!registration) {
    return {
      error: {
        productId: ["You don't have a registered product with this ID"],
      },
    }
  }

  // Check if warranty is still valid
  const now = new Date()
  if (registration.expiryDate < now) {
    return {
      error: {
        _form: ["Warranty for this product has expired"],
      },
    }
  }

  // Create claim
  const claim = await prisma.warrantyClaim.create({
    data: {
      issue: issueType,
      description: issueDescription,
      contactPreference,
      status: "pending",
      productId,
      customerId: customerProfile.id,
      registrationId: registration.id,
    },
  })

  // Create initial timeline entry
  await prisma.claimTimeline.create({
    data: {
      type: "created",
      description: "Claim submitted",
      claimId: claim.id,
    },
  })

  revalidatePath("/customer/claims")
  redirect("/customer/claims")
}

export async function getCustomerClaims() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "CUSTOMER") {
    return []
  }

  // Get customer profile
  const customerProfile = await prisma.customerProfile.findFirst({
    where: {
      userId: session.user.id,
    },
  })

  if (!customerProfile) {
    return []
  }

  // Get claims
  const claims = await prisma.warrantyClaim.findMany({
    where: {
      customerId: customerProfile.id,
    },
    include: {
      product: true,
      registration: true,
      timeline: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return claims
}

export async function getBusinessClaims() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "BUSINESS") {
    return []
  }

  // Get business profile
  const businessProfile = await prisma.businessProfile.findFirst({
    where: {
      userId: session.user.id,
    },
  })

  if (!businessProfile) {
    return []
  }

  // Get products
  const products = await prisma.product.findMany({
    where: {
      businessId: businessProfile.id,
    },
    select: {
      id: true,
    },
  })

  const productIds = products.map((product) => product.id)

  // Get claims
  const claims = await prisma.warrantyClaim.findMany({
    where: {
      productId: {
        in: productIds,
      },
    },
    include: {
      product: true,
      customer: {
        include: {
          user: true,
        },
      },
      registration: true,
      timeline: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return claims
}

export async function updateClaimStatus(claimId: string, status: string) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "BUSINESS") {
    return {
      error: "Unauthorized",
    }
  }

  // Get business profile
  const businessProfile = await prisma.businessProfile.findFirst({
    where: {
      userId: session.user.id,
    },
  })

  if (!businessProfile) {
    return {
      error: "Business profile not found",
    }
  }

  // Get claim
  const claim = await prisma.warrantyClaim.findUnique({
    where: {
      id: claimId,
    },
    include: {
      product: true,
    },
  })

  if (!claim) {
    return {
      error: "Claim not found",
    }
  }

  // Check if business owns the product
  const product = await prisma.product.findUnique({
    where: {
      id: claim.productId,
    },
  })

  if (!product || product.businessId !== businessProfile.id) {
    return {
      error: "Unauthorized",
    }
  }

  // Update claim status
  await prisma.warrantyClaim.update({
    where: {
      id: claimId,
    },
    data: {
      status,
    },
  })

  // Add timeline entry
  await prisma.claimTimeline.create({
    data: {
      type: "status-change",
      description: `Claim status changed to ${status}`,
      claimId,
    },
  })

  revalidatePath(`/dashboard/claims`)
  revalidatePath(`/dashboard/claims/${claimId}`)

  return {
    success: true,
  }
}

export async function addClaimMessage(claimId: string, message: string, sender: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      error: "Unauthorized",
    }
  }

  // Get claim
  const claim = await prisma.warrantyClaim.findUnique({
    where: {
      id: claimId,
    },
    include: {
      product: true,
      customer: true,
    },
  })

  if (!claim) {
    return {
      error: "Claim not found",
    }
  }

  // Check if user has access to this claim
  if (session.user.role === "BUSINESS") {
    const businessProfile = await prisma.businessProfile.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!businessProfile) {
      return {
        error: "Business profile not found",
      }
    }

    const product = await prisma.product.findUnique({
      where: {
        id: claim.productId,
      },
    })

    if (!product || product.businessId !== businessProfile.id) {
      return {
        error: "Unauthorized",
      }
    }
  } else if (session.user.role === "CUSTOMER") {
    const customerProfile = await prisma.customerProfile.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!customerProfile || claim.customerId !== customerProfile.id) {
      return {
        error: "Unauthorized",
      }
    }
  }

  // Add message to timeline
  await prisma.claimTimeline.create({
    data: {
      type: "message",
      description: message,
      sender,
      claimId,
    },
  })

  if (session.user.role === "BUSINESS") {
    revalidatePath(`/dashboard/claims/${claimId}`)
  } else {
    revalidatePath(`/customer/claims/${claimId}`)
  }

  return {
    success: true,
  }
}

