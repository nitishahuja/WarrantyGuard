import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Check if user is authenticated
  const isAuthenticated = !!token

  // Define protected routes
  const isBusinessRoute = pathname.startsWith("/dashboard")
  const isCustomerRoute = pathname.startsWith("/customer")
  const isAuthRoute = pathname === "/login" || pathname === "/register" || pathname.startsWith("/reset-password")

  // Redirect logic
  if (isAuthRoute) {
    if (isAuthenticated) {
      // Redirect authenticated users away from auth pages
      if (token.role === "BUSINESS") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      } else {
        return NextResponse.redirect(new URL("/customer/dashboard", request.url))
      }
    }
    // Allow unauthenticated users to access auth pages
    return NextResponse.next()
  }

  if (isBusinessRoute) {
    // Check if user is authenticated and has business role
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url))
    }

    if (token.role !== "BUSINESS") {
      return NextResponse.redirect(new URL("/customer/dashboard", request.url))
    }

    return NextResponse.next()
  }

  if (isCustomerRoute) {
    // Check if user is authenticated and has customer role
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, request.url))
    }

    if (token.role !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/customer/:path*", "/login", "/register", "/reset-password/:path*"],
}

