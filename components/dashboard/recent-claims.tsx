import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const claims = [
  {
    id: "CLM-7834",
    customer: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "A",
    },
    product: "Premium Laptop X1",
    issue: "Screen flickering",
    status: "pending",
    date: "2 hours ago",
  },
  {
    id: "CLM-7835",
    customer: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "S",
    },
    product: "Smart Watch Pro",
    issue: "Battery not charging",
    status: "in-progress",
    date: "5 hours ago",
  },
  {
    id: "CLM-7836",
    customer: {
      name: "Miguel Rodriguez",
      email: "miguel@example.com",
      avatar: "M",
    },
    product: "Wireless Headphones",
    issue: "Left earpiece not working",
    status: "pending",
    date: "1 day ago",
  },
]

export function RecentClaims() {
  return (
    <div className="space-y-8">
      {claims.map((claim) => (
        <div key={claim.id} className="flex items-start gap-4">
          <Avatar>
            <AvatarImage
              src={`/placeholder.svg?height=40&width=40&text=${claim.customer.avatar}`}
              alt={claim.customer.name}
            />
            <AvatarFallback>{claim.customer.avatar}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{claim.customer.name}</p>
              <p className="text-xs text-muted-foreground">•</p>
              <p className="text-xs text-muted-foreground">{claim.date}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Claim #{claim.id} for {claim.product}
            </p>
            <p className="text-sm">Issue: {claim.issue}</p>
            <div className="flex items-center pt-1">
              <Badge variant={claim.status === "pending" ? "outline" : "secondary"}>
                {claim.status === "pending" ? "Pending Review" : "In Progress"}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

