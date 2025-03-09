"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { signIn } from "next-auth/react"

import prisma from "@/lib/db"

// Schema for registration
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["BUSINESS", "CUSTOMER"]),
})

// Schema for business registration
const businessRegisterSchema = registerSchema.extend({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  phone: z.string().min(10, "Please enter a valid phone number"),
})

// Schema for login
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export async function registerUser(formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password, role } = validatedFields.data

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return {
      error: {
        email: ["User with this email already exists"],
      },
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role,
    },
  })

  // Create profile based on role
  if (role === "BUSINESS") {
    // If business registration, get additional fields
    const businessFields = businessRegisterSchema.safeParse({
      name,
      email,
      password,
      role,
      companyName: formData.get("companyName"),
      industry: formData.get("industry"),
      phone: formData.get("phone"),
    })

    if (!businessFields.success) {
      // Delete user if business fields are invalid
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      })

      return {
        error: businessFields.error.flatten().fieldErrors,
      }
    }

    const { companyName, industry, phone } = businessFields.data

    await prisma.businessProfile.create({
      data: {
        companyName,
        industry,
        phone,
        userId: user.id,
      },
    })
  } else {
    // Create customer profile
    await prisma.customerProfile.create({
      data: {
        userId: user.id,
      },
    })
  }

  // Send verification email (in a real app)
  // await sendVerificationEmail(user.email);

  revalidatePath("/login")
  redirect("/login?registered=true")
}

export async function loginUser(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    // Check user role and redirect accordingly
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user?.role === "BUSINESS") {
      redirect("/dashboard")
    } else {
      redirect("/customer/dashboard")
    }
  } catch (error) {
    return {
      error: {
        _form: ["Invalid email or password"],
      },
    }
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return {
      error: {
        email: ["Please enter a valid email address"],
      },
    }
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    // Don't reveal that the user doesn't exist for security
    return {
      success: true,
    }
  }

  // Generate reset token
  const token = crypto.randomUUID()
  const expires = new Date(Date.now() + 3600000) // 1 hour

  // Save token to database
  await prisma.passwordReset.upsert({
    where: {
      userId: user.id,
    },
    update: {
      token,
      expires,
    },
    create: {
      userId: user.id,
      token,
      expires,
    },
  })

  // Send reset email (in a real app)
  // await sendPasswordResetEmail(user.email, token);

  return {
    success: true,
  }
}

