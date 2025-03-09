import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { AuthProvider } from "@/components/auth-provider"
import { cookies } from "next/headers"
import { ChatWindow } from "@/components/chat/chat-window"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WarrantyGuard - Digital Warranty & Product Registration",
  description: "Manage product warranties, registrations, and claims in one platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the theme cookie to prevent hydration mismatch
  const cookieStore = cookies()
  const themeCookie = cookieStore.get("theme")
  const theme = themeCookie?.value || "light"

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>
              <SiteFooter />
              <ChatWindow />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'