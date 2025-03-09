import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText, ShieldCheck } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface CustomerRegisteredProductsProps {
  limit?: number
}

const products = [
  {
    id: "prod-1",
    name: "Premium Laptop X1",
    serialNumber: "LPX1-7845-9371",
    brand: "TechPro",
    purchaseDate: "2023-01-15",
    expiryDate: "2025-01-15",
    status: "active",
    daysLeft: 320,
    image: "/placeholder.svg?height=100&width=200&text=Laptop",
  },
  {
    id: "prod-2",
    name: "Smart Watch Pro",
    serialNumber: "SWP-4572-8391",
    brand: "WearTech",
    purchaseDate: "2023-02-20",
    expiryDate: "2024-02-20",
    status: "expiring",
    daysLeft: 25,
    image: "/placeholder.svg?height=100&width=200&text=Watch",
  },
  {
    id: "prod-3",
    name: "Wireless Headphones",
    serialNumber: "WH-3456-7891",
    brand: "AudioMax",
    purchaseDate: "2022-06-15",
    expiryDate: "2024-06-15",
    status: "active",
    daysLeft: 140,
    image: "/placeholder.svg?height=100&width=200&text=Headphones",
  },
  {
    id: "prod-4",
    name: "Coffee Maker Deluxe",
    serialNumber: "CMD-8912-3456",
    brand: "HomeAppliance",
    purchaseDate: "2022-03-05",
    expiryDate: "2023-03-05",
    status: "expired",
    daysLeft: 0,
    image: "/placeholder.svg?height=100&width=200&text=Coffee",
  },
  {
    id: "prod-5",
    name: '4K Smart TV 55"',
    serialNumber: "TV4K-5678-9012",
    brand: "VisionTech",
    purchaseDate: "2023-05-10",
    expiryDate: "2025-05-10",
    status: "active",
    daysLeft: 435,
    image: "/placeholder.svg?height=100&width=200&text=TV",
  },
]

export function CustomerRegisteredProducts({ limit }: CustomerRegisteredProductsProps) {
  const displayProducts = limit ? products.slice(0, limit) : products

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-video w-full relative">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
            <Badge
              className="absolute top-2 right-2"
              variant={
                product.status === "active" ? "default" : product.status === "expiring" ? "warning" : "destructive"
              }
            >
              {product.status === "active" ? "Active" : product.status === "expiring" ? "Expiring Soon" : "Expired"}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </CardHeader>

          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serial Number:</span>
                <span className="font-mono">{product.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Date:</span>
                <span>{formatDate(product.purchaseDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Warranty Until:</span>
                <span>{formatDate(product.expiryDate)}</span>
              </div>

              {product.status !== "expired" && (
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{product.daysLeft} days remaining</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/customer/products/${product.id}`}>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Details
              </Link>
            </Button>
            {product.status !== "expired" && (
              <Button size="sm" className="w-full" asChild>
                <Link href={`/customer/claims/new?product=${product.id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  File Claim
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

