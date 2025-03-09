"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useToast } from "@/components/ui/use-toast"
import { signOut } from "next-auth/react"

export default function LogoutPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut({ redirect: false })

        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        })

        // Redirect to home page
        router.push("/")
      } catch (error) {
        console.error("Logout failed:", error)
        toast({
          title: "Logout failed",
          description: "There was a problem logging you out. Please try again.",
          variant: "destructive",
        })
      }
    }

    handleLogout()
  }, [router, toast])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <h1 className="text-2xl font-semibold tracking-tight">Logging out...</h1>
        <p className="text-sm text-muted-foreground">Please wait while we securely log you out of your account.</p>
      </div>
    </div>
  )
}

