import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Mail, MessageSquare, Phone } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface WarrantyListProps {
  status?: "active" | "expiring" | "expired"
}

const warranties = [
  {
    id: "WAR-1234",
    product: {
      name: "Premium Laptop X1",
      image: "/placeholder.svg?height=40&width=40&text=LP",
    },
    customer: {
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "A",
    },
    serialNumber: "LPX1-7845-9371",
    purchaseDate: "2023-01-15",
    expiryDate: "2025-01-15",
    status: "active",
    daysLeft: 320,
  },
  {
    id: "WAR-1235",
    product: {
      name: "Smart Watch Pro",
      image: "/placeholder.svg?height=40&width=40&text=SW",
    },
    customer: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "S",
    },
    serialNumber: "SWP-4572-8391",
    purchaseDate: "2023-02-20",
    expiryDate: "2024-02-20",
    status: "expiring",
    daysLeft: 25,
  },
  {
    id: "WAR-1236",
    product: {
      name: "Refrigerator Pro",
      image: "/placeholder.svg?height=40&width=40&text=RF",
    },
    customer: {
      name: "Miguel Rodriguez",
      email: "miguel@example.com",
      avatar: "M",
    },
    serialNumber: "RPF-1234-5678",
    purchaseDate: "2021-05-10",
    expiryDate: "2024-05-10",
    status: "expiring",
    daysLeft: 62,
  },
  {
    id: "WAR-1237",
    product: {
      name: "Washing Machine X7",
      image: "/placeholder.svg?height=40&width=40&text=WM",
    },
    customer: {
      name: "Emma Thompson",
      email: "emma@example.com",
      avatar: "E",
    },
    serialNumber: "WMX7-5678-9123",
    purchaseDate: "2022-08-15",
    expiryDate: "2024-08-15",
    status: "active",
    daysLeft: 165,
  },
  {
    id: "WAR-1238",
    product: {
      name: "Coffee Maker Deluxe",
      image: "/placeholder.svg?height=40&width=40&text=CM",
    },
    customer: {
      name: "David Garcia",
      email: "david@example.com",
      avatar: "D",
    },
    serialNumber: "CMD-8912-3456",
    purchaseDate: "2022-03-05",
    expiryDate: "2023-03-05",
    status: "expired",
    daysLeft: 0,
  },
  {
    id: "WAR-1239",
    product: {
      name: "Leather Sofa Classic",
      image: "/placeholder.svg?height=40&width=40&text=LS",
    },
    customer: {
      name: "Sophia Martinez",
      email: "sophia@example.com",
      avatar: "S",
    },
    serialNumber: "LSC-3456-7891",
    purchaseDate: "2020-11-20",
    expiryDate: "2025-11-20",
    status: "active",
    daysLeft: 630,
  },
]

export function WarrantyList({ status }: WarrantyListProps) {
  const filteredWarranties = status ? warranties.filter((warranty) => warranty.status === status) : warranties

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredWarranties.map((warranty) => (
        <Card key={warranty.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{warranty.id}</CardTitle>
              <Badge
                variant={
                  warranty.status === "active" ? "default" : warranty.status === "expiring" ? "warning" : "destructive"
                }
              >
                {warranty.status === "active" ? "Active" : warranty.status === "expiring" ? "Expiring Soon" : "Expired"}
              </Badge>
            </div>
            <CardDescription>
              {warranty.product.name} • {warranty.serialNumber}
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-0">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={warranty.product.image} alt={warranty.product.name} />
                <AvatarFallback>{warranty.product.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-medium">Customer</h4>
                <div className="flex items-center gap-2 text-sm">{warranty.customer.name}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Purchase Date</p>
                <p className="font-medium">{formatDate(warranty.purchaseDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expiry Date</p>
                <p className="font-medium">{formatDate(warranty.expiryDate)}</p>
              </div>
            </div>

            {warranty.status !== "expired" && (
              <div className="mt-4 flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{warranty.daysLeft} days remaining</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between pt-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" title="Email Customer">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
              <Button variant="ghost" size="icon" title="Call Customer">
                <Phone className="h-4 w-4" />
                <span className="sr-only">Call</span>
              </Button>
              <Button variant="ghost" size="icon" title="Message Customer">
                <MessageSquare className="h-4 w-4" />
                <span className="sr-only">Message</span>
              </Button>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

