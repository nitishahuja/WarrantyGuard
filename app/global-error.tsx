"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mb-6" />
          <h1 className="text-4xl font-bold tracking-tight mb-2">Something went wrong!</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            We've encountered a critical error. Please try refreshing the page or contact support if the problem
            persists.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono mb-6">Error reference: {error.digest}</p>
          )}
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  )
}

