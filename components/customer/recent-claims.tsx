import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock, MessageSquare } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface CustomerRecentClaimsProps {
  showAll?: boolean
}

const claims = [
  {
    id: "CLM-1001",
    product: {
      name: "Premium Laptop X1",
      serialNumber: "LPX1-7845-9371",
    },
    issue: "Screen flickering when using external monitor",
    dateSubmitted: "2023-03-04",
    status: "pending",
    lastUpdate: "2023-03-04",
  },
  {
    id: "CLM-1002",
    product: {
      name: "Smart Watch Pro",
      serialNumber: "SWP-4572-8391",
    },
    issue: "Battery not charging past 80%",
    dateSubmitted: "2023-03-01",
    status: "in-progress",
    lastUpdate: "2023-03-02",
    messages: 2,
  },
  {
    id: "CLM-1003",
    product: {
      name: "Wireless Headphones",
      serialNumber: "WH-3456-7891",
    },
    issue: "Left earpiece not working",
    dateSubmitted: "2023-02-15",
    status: "resolved",
    lastUpdate: "2023-02-20",
    resolution: "Replacement unit shipped",
  },
  {
    id: "CLM-1004",
    product: {
      name: '4K Smart TV 55"',
      serialNumber: "TV4K-5678-9012",
    },
    issue: "HDMI port 2 not detecting inputs",
    dateSubmitted: "2023-02-10",
    status: "rejected",
    lastUpdate: "2023-02-12",
    resolution: "Physical damage detected - not covered under warranty",
  },
]

export function CustomerRecentClaims({ showAll = false }: CustomerRecentClaimsProps) {
  const displayClaims = showAll ? claims : claims.slice(0, 2)

  return (
    <div className="space-y-4">
      {displayClaims.map((claim) => (
        <Card key={claim.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{claim.id}</CardTitle>
              <Badge
                variant={
                  claim.status === "pending"
                    ? "outline"
                    : claim.status === "in-progress"
                      ? "secondary"
                      : claim.status === "resolved"
                        ? "default"
                        : "destructive"
                }
              >
                {claim.status === "pending"
                  ? "Pending Review"
                  : claim.status === "in-progress"
                    ? "In Progress"
                    : claim.status === "resolved"
                      ? "Resolved"
                      : "Rejected"}
              </Badge>
            </div>
            <CardDescription>
              {claim.product.name} • {claim.product.serialNumber}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-medium">Issue Reported</h4>
                <p className="text-sm">{claim.issue}</p>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span>{formatDate(claim.dateSubmitted)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Last Update:</span>
                  <span>{formatDate(claim.lastUpdate)}</span>
                </div>
              </div>

              {(claim.status === "resolved" || claim.status === "rejected") && claim.resolution && (
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <h4 className="text-sm font-medium mb-1">
                    {claim.status === "resolved" ? "Resolution" : "Rejection Reason"}
                  </h4>
                  <p className="text-sm">{claim.resolution}</p>
                </div>
              )}

              {claim.messages && (
                <div className="flex items-center gap-2 mt-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{claim.messages} new messages</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/customer/claims/${claim.id}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}

      {!showAll && claims.length > 2 && (
        <div className="text-center">
          <Button variant="link" asChild>
            <Link href="/customer/claims">
              View all claims
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      {showAll && claims.length === 0 && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No claims found</h3>
            <p className="text-sm text-muted-foreground max-w-md">You haven't submitted any warranty claims yet.</p>
          </div>
        </Card>
      )}
    </div>
  )
}

