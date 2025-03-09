"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { getServerSession } from "next-auth/next"

import prisma from "@/lib/db"
import { authOptions } from "@/lib/auth"

// Schema for product creation
const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a product category"),
  warrantyMonths: z.coerce.number().min(1, "Warranty period must be at least 1 month"),
  serialFormat: z.string().min(3, "Serial number format is required"),
})

export async function createProduct(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "BUSINESS") {
    return {
      error: {
        _form: ["You must be logged in as a business to create products"],
      },
    }
  }

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    warrantyMonths: formData.get("warrantyMonths"),
    serialFormat: formData.get("serialFormat"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, description, category, warrantyMonths, serialFormat } = validatedFields.data

  // Get business profile
  const businessProfile = await prisma.businessProfile.findFirst({
    where: {
      userId: session.user.id,
    },
  })

  if (!businessProfile) {
    return {
      error: {
        _form: ["Business profile not found"],
      },
    }
  }

  // Create product
  await prisma.product.create({
    data: {
      name,
      description,
      category,
      warrantyMonths,
      serialFormat,
      businessId: businessProfile.id,
    },
  })

  revalidatePath("/dashboard/products")
  redirect("/dashboard/products")
}

export async function getProducts() {
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
    orderBy: {
      createdAt: "desc",
    },
  })

  return products
}

export async function getProductById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  // Get product
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      business: true,
      registrations: {
        include: {
          customer: {
            include: {
              user: true,
            },
          },
        },
      },
      claims: {
        include: {
          customer: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })

  // Check if user has access to this product
  if (session.user.role === "BUSINESS") {
    const businessProfile = await prisma.businessProfile.findFirst({
      where: {
        userId: session.user.id,
      },
    })

    if (!businessProfile || product?.businessId !== businessProfile.id) {
      return null
    }
  }

  return product
}

