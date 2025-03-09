import Link from "next/link"
import { ArrowLeft, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DemoPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm font-medium mb-10">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle className="text-2xl">Schedule a Demo</CardTitle>
            <Badge>Coming Soon</Badge>
          </div>
          <CardDescription>
            We're finalizing our demo scheduling system. Please check back soon or use the contact form to request a
            demo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8 gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <CalendarDays className="h-12 w-12 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-medium">Feature Coming Soon</h3>
            <p className="text-muted-foreground max-w-lg">
              Our demo scheduling system is currently under development. We're working hard to provide an easy way to
              book personalized demos with our product specialists.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

