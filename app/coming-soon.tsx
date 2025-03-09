import Link from "next/link"
import { ArrowLeft, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ComingSoonPageProps {
  title: string
  description: string
  icon: LucideIcon
  backUrl: string
  backLabel: string
}

export default function ComingSoonPage({ title, description, icon: Icon, backUrl, backLabel }: ComingSoonPageProps) {
  return (
    <div className="container py-12 max-w-3xl">
      <Link
        href={backUrl}
        className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm font-medium mb-10"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{backLabel}</span>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <Badge>Coming Soon</Badge>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8 gap-6">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-12 w-12 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-medium">Feature Coming Soon</h3>
            <p className="text-muted-foreground max-w-lg">
              We're working hard to bring you this feature. Check back soon for updates!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link href={backUrl}>Return to {backLabel}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

