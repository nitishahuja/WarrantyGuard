"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { getServerSession } from "next-auth/next"

import prisma from "@/lib/db"
import { authOptions } from "@/lib/auth"

// Schema for product registration
const registerProductSchema = z.object({
  serialNumber: z.string().min(5, "Serial number must be at least 5 characters"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  retailer: z.string().optional(),
})

export async function registerProduct(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "CUSTOMER") {
    return {
      error: {
        _form: ["You must be logged in as a customer to register products"],
      },
    }
  }

  const validatedFields = registerProductSchema.safeParse({
    serialNumber: formData.get("serialNumber"),
    purchaseDate: formData.get("purchaseDate"),
    retailer: formData.get("retailer"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { serialNumber, purchaseDate, retailer } = validatedFields.data

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

  // Find product by serial number pattern
  // In a real app, you would have a more sophisticated way to match serial numbers
  const product = await prisma.product.findFirst({
    where: {
      serialFormat: {
        contains: serialNumber.split("-")[0],
      },
    },
  })

  if (!product) {
    return {
      error: {
        serialNumber: ["Product not found with this serial number"],
      },
    }
  }

  // Check if product is already registered
  const existingRegistration = await prisma.productRegistration.findFirst({
    where: {
      serialNumber,
    },
  })

  if (existingRegistration) {
    return {
      error: {
        serialNumber: ["This product is already registered"],
      },
    }
  }

  // Calculate expiry date
  const purchaseDateTime = new Date(purchaseDate)
  const expiryDate = new Date(purchaseDateTime)
  expiryDate.setMonth(expiryDate.getMonth() + product.warrantyMonths)

  // Register product
  await prisma.productRegistration.create({
    data: {
      serialNumber,
      purchaseDate: purchaseDateTime,
      expiryDate,
      retailer: retailer || "",
      status: "active",
      productId: product.id,
      customerId: customerProfile.id,
    },
  })

  revalidatePath("/customer/products")
  redirect("/customer/dashboard")
}

export async function getCustomerWarranties() {
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

  // Get registrations
  const registrations = await prisma.productRegistration.findMany({
    where: {
      customerId: customerProfile.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Process registrations to add status
  const now = new Date()
  const processedRegistrations = registrations.map((registration) => {
    const daysLeft = Math.ceil((registration.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    let status = "active"
    if (daysLeft <= 0) {
      status = "expired"
    } else if (daysLeft <= 30) {
      status = "expiring"
    }

    return {
      ...registration,
      daysLeft: Math.max(0, daysLeft),
      status,
    }
  })

  return processedRegistrations
}

export async function getBusinessWarranties() {
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

  // Get registrations
  const registrations = await prisma.productRegistration.findMany({
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
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Process registrations to add status
  const now = new Date()
  const processedRegistrations = registrations.map((registration) => {
    const daysLeft = Math.ceil((registration.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    let status = "active"
    if (daysLeft <= 0) {
      status = "expired"
    } else if (daysLeft <= 30) {
      status = "expiring"
    }

    return {
      ...registration,
      daysLeft: Math.max(0, daysLeft),
      status,
    }
  })

  return processedRegistrations
}

