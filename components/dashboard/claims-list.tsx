import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface ClaimsListProps {
  status?: "pending" | "in-progress" | "resolved" | "rejected"
}

const claims = [
  {
    id: "CLM-7834",
    customer: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "A",
    },
    product: {
      name: "Premium Laptop X1",
      serialNumber: "LPX1-7845-9371",
      image: "/placeholder.svg?height=40&width=40&text=LP",
    },
    issue: "Screen flickering when using external monitor",
    description:
      "The screen starts flickering when I connect an external monitor via HDMI. This happens consistently after about 10 minutes of use.",
    dateSubmitted: "2023-03-04",
    status: "pending",
    warranty: {
      id: "WAR-1234",
      expiryDate: "2025-01-15",
    },
  },
  {
    id: "CLM-7835",
    customer: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "S",
    },
    product: {
      name: "Smart Watch Pro",
      serialNumber: "SWP-4572-8391",
      image: "/placeholder.svg?height=40&width=40&text=SW",
    },
    issue: "Battery not charging past 80%",
    description:
      "The watch won't charge beyond 80% regardless of how long it stays on the charger. I've tried multiple chargers with the same result.",
    dateSubmitted: "2023-03-03",
    status: "in-progress",
    warranty: {
      id: "WAR-1235",
      expiryDate: "2024-02-20",
    },
  },
  {
    id: "CLM-7836",
    customer: {
      name: "Miguel Rodriguez",
      email: "miguel@example.com",
      avatar: "M",
    },
    product: {
      name: "Wireless Headphones",
      serialNumber: "WH-3456-7891",
      image: "/placeholder.svg?height=40&width=40&text=WH",
    },
    issue: "Left earpiece not working",
    description:
      "The left earpiece has stopped producing sound. The right one works fine, and I've tried resetting the headphones multiple times.",
    dateSubmitted: "2023-03-02",
    status: "pending",
    warranty: {
      id: "WAR-1240",
      expiryDate: "2024-06-15",
    },
  },
  {
    id: "CLM-7837",
    customer: {
      name: "Emma Thompson",
      email: "emma@example.com",
      avatar: "E",
    },
    product: {
      name: "Refrigerator Pro",
      serialNumber: "RPF-1234-5678",
      image: "/placeholder.svg?height=40&width=40&text=RF",
    },
    issue: "Ice maker not functioning",
    description:
      "The ice maker stopped working about a week ago. I've checked the water supply and it seems fine. No ice is being produced at all.",
    dateSubmitted: "2023-03-01",
    status: "resolved",
    resolution: "Technician visit - replaced faulty ice maker component",
    warranty: {
      id: "WAR-1236",
      expiryDate: "2024-05-10",
    },
  },
  {
    id: "CLM-7838",
    customer: {
      name: "David Garcia",
      email: "david@example.com",
      avatar: "D",
    },
    product: {
      name: "Leather Sofa Classic",
      serialNumber: "LSC-3456-7891",
      image: "/placeholder.svg?height=40&width=40&text=LS",
    },
    issue: "Leather peeling on armrest",
    description:
      "The leather on the right armrest has started to peel after 6 months of use. Normal usage, no damage from sharp objects or pets.",
    dateSubmitted: "2023-02-28",
    status: "rejected",
    resolution: "Claim rejected - damage consistent with wear and tear not covered under warranty",
    warranty: {
      id: "WAR-1239",
      expiryDate: "2025-11-20",
    },
  },
]

export function ClaimsList({ status }: ClaimsListProps) {
  const filteredClaims = status ? claims.filter((claim) => claim.status === status) : claims

  return (
    <div className="grid gap-6">
      {filteredClaims.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No claims found</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {status === "pending"
                ? "There are no pending claims requiring your attention."
                : status === "in-progress"
                  ? "There are no claims currently in progress."
                  : status === "resolved"
                    ? "There are no resolved claims to display."
                    : "There are no claims matching your criteria."}
            </p>
          </div>
        </Card>
      ) : (
        filteredClaims.map((claim) => (
          <Card key={claim.id}>
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{claim.id}</CardTitle>
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
                  <CardDescription className="mt-1">Submitted on {formatDate(claim.dateSubmitted)}</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${claim.customer.avatar}`}
                      alt={claim.customer.name}
                    />
                    <AvatarFallback>{claim.customer.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{claim.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{claim.customer.email}</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar className="mt-0.5">
                      <AvatarImage src={claim.product.image} alt={claim.product.name} />
                      <AvatarFallback>{claim.product.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-medium">{claim.product.name}</h4>
                      <p className="text-xs text-muted-foreground">S/N: {claim.product.serialNumber}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 inline mr-1" />
                        Warranty valid until {formatDate(claim.warranty.expiryDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h3 className="text-sm font-medium mb-2">Issue Reported</h3>
                  <p className="text-sm mb-4">{claim.issue}</p>

                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="text-sm">{claim.description}</p>

                  {claim.resolution && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <h3 className="text-sm font-medium mb-1 flex items-center">
                        {claim.status === "resolved" ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            Resolution
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-500 mr-2" />
                            Rejection Reason
                          </>
                        )}
                      </h3>
                      <p className="text-sm">{claim.resolution}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 pt-4">
              {claim.status === "pending" && (
                <>
                  <Button variant="outline" size="sm">
                    Reject
                  </Button>
                  <Button size="sm">Process Claim</Button>
                </>
              )}

              {claim.status === "in-progress" && (
                <>
                  <Button variant="outline" size="sm">
                    Request Info
                  </Button>
                  <Button variant="destructive" size="sm">
                    Reject
                  </Button>
                  <Button size="sm">Resolve</Button>
                </>
              )}

              {(claim.status === "resolved" || claim.status === "rejected") && (
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              )}
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}

