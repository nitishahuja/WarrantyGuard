import Link from "next/link"
import { Edit, MoreHorizontal, QrCode, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProductListProps {
  category?: string
}

const products = [
  {
    id: "prod-1",
    name: "Premium Laptop X1",
    description: "High-performance laptop with 16GB RAM and 512GB SSD",
    category: "electronics",
    warrantyMonths: 24,
    image: "/placeholder.svg?height=100&width=200&text=Laptop",
    serialFormat: "LPX1-####-####",
    registrations: 145,
    activeClaims: 3,
  },
  {
    id: "prod-2",
    name: "Smart Watch Pro",
    description: "Fitness tracker with heart rate monitoring and GPS",
    category: "electronics",
    warrantyMonths: 12,
    image: "/placeholder.svg?height=100&width=200&text=Watch",
    serialFormat: "SWP-####-####",
    registrations: 89,
    activeClaims: 1,
  },
  {
    id: "prod-3",
    name: "Refrigerator Pro",
    description: "Double-door refrigerator with smart temperature control",
    category: "appliances",
    warrantyMonths: 36,
    image: "/placeholder.svg?height=100&width=200&text=Fridge",
    serialFormat: "RPF-####-####",
    registrations: 72,
    activeClaims: 2,
  },
  {
    id: "prod-4",
    name: "Washing Machine X7",
    description: "Front-loading washing machine with 8kg capacity",
    category: "appliances",
    warrantyMonths: 24,
    image: "/placeholder.svg?height=100&width=200&text=Washer",
    serialFormat: "WMX7-####-####",
    registrations: 56,
    activeClaims: 0,
  },
  {
    id: "prod-5",
    name: "Leather Sofa Classic",
    description: "Premium leather 3-seater sofa with 10-year frame warranty",
    category: "furniture",
    warrantyMonths: 60,
    image: "/placeholder.svg?height=100&width=200&text=Sofa",
    serialFormat: "LSC-####-####",
    registrations: 42,
    activeClaims: 1,
  },
  {
    id: "prod-6",
    name: "Dining Table Set",
    description: "Wooden dining table with 6 chairs",
    category: "furniture",
    warrantyMonths: 36,
    image: "/placeholder.svg?height=100&width=200&text=Table",
    serialFormat: "DTS-####-####",
    registrations: 28,
    activeClaims: 0,
  },
]

export function ProductList({ category }: ProductListProps) {
  const filteredProducts = category ? products.filter((product) => product.category === category) : products

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product) => (
        <Card key={product.id}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="mt-1">{product.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Codes
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="aspect-video relative overflow-hidden rounded-md">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Warranty Period</span>
                <span className="font-medium">{product.warrantyMonths} months</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Serial Format</span>
                <span className="font-mono text-xs">{product.serialFormat}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Registrations</span>
                <span className="font-medium">{product.registrations}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Active Claims</span>
                <span className="font-medium">{product.activeClaims}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Badge variant="outline" className="text-xs capitalize">
              {product.category}
            </Badge>
            <Link href={`/dashboard/products/${product.id}`}>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

