"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, ShieldCheck, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function VerifyEmailPage({
  params,
}: {
  params: { token: string }
}) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const { token } = params

  useEffect(() => {
    // Simulate API call to verify email
    const verifyEmail = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // For demo purposes, we'll consider tokens with "valid" to be successful
        if (token.includes("valid")) {
          setStatus("success")
        } else {
          setStatus("error")
        }
      } catch (error) {
        console.error("Email verification failed:", error)
        setStatus("error")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm font-medium mb-10">
        <ShieldCheck className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            {status === "loading"
              ? "Verifying your email address..."
              : status === "success"
                ? "Your email has been verified!"
                : "Email verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === "loading" ? (
            <LoadingSpinner size="lg" />
          ) : status === "success" ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Verification Successful</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your email address has been successfully verified. You can now access all features of your account.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                <XCircle className="h-8 w-8 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Verification Failed</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We couldn't verify your email address. The verification link may have expired or is invalid.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {status === "loading" ? (
            <p className="text-sm text-muted-foreground">Please wait...</p>
          ) : status === "success" ? (
            <Button asChild>
              <Link href="/login">Continue to Login</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Back to Login</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

