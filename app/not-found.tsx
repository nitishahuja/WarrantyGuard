import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[600px] text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}

