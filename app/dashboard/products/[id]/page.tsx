import Link from "next/link"
import { ArrowLeft, Download, Edit, QrCode, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export default function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // In a real app, you would fetch the product data based on the ID
  const product = {
    id: params.id,
    name: "Premium Laptop X1",
    description: "High-performance laptop with 16GB RAM and 512GB SSD",
    category: "electronics",
    warrantyMonths: 24,
    image: "/placeholder.svg?height=300&width=500&text=Laptop",
    serialFormat: "LPX1-####-####",
    registrations: 145,
    activeClaims: 3,
    warrantyTerms: [
      "Coverage for manufacturing defects",
      "Free repair or replacement of defective parts",
      "Coverage for electrical and mechanical failures",
      "Excludes accidental damage",
      "Excludes normal wear and tear",
      "Warranty void if product is tampered with or modified",
    ],
    registeredUnits: [
      {
        serialNumber: "LPX1-7845-9371",
        customer: {
          name: "Alex Johnson",
          email: "alex@example.com",
        },
        purchaseDate: "2023-01-15",
        expiryDate: "2025-01-15",
        status: "active",
      },
      {
        serialNumber: "LPX1-7846-1234",
        customer: {
          name: "Sarah Williams",
          email: "sarah@example.com",
        },
        purchaseDate: "2023-02-20",
        expiryDate: "2025-02-20",
        status: "active",
      },
      {
        serialNumber: "LPX1-7847-5678",
        customer: {
          name: "Michael Brown",
          email: "michael@example.com",
        },
        purchaseDate: "2022-11-05",
        expiryDate: "2024-11-05",
        status: "active",
      },
    ],
    claims: [
      {
        id: "CLM-7834",
        customer: {
          name: "Alex Johnson",
          email: "alex@example.com",
        },
        serialNumber: "LPX1-7845-9371",
        issue: "Screen flickering when using external monitor",
        dateSubmitted: "2023-03-04",
        status: "pending",
      },
      {
        id: "CLM-7840",
        customer: {
          name: "Michael Brown",
          email: "michael@example.com",
        },
        serialNumber: "LPX1-7847-5678",
        issue: "Keyboard keys sticking",
        dateSubmitted: "2023-02-28",
        status: "in-progress",
      },
    ],
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Product Details" text="View and manage product information and warranties.">
        <div className="flex gap-2">
          <Link href="/dashboard/products">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-3">
          <Card>
            <div className="aspect-video w-full relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-2 right-2">{product.category}</Badge>
            </div>

            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Warranty Period</p>
                    <p className="font-medium">{product.warrantyMonths} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Serial Format</p>
                    <p className="font-mono text-sm">{product.serialFormat}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registrations</p>
                    <p className="font-medium">{product.registrations}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Claims</p>
                    <p className="font-medium">{product.activeClaims}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Warranty Terms</h3>
                  <ul className="space-y-1 ml-6 list-disc text-sm">
                    {product.warrantyTerms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button variant="outline" className="w-full">
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Codes
              </Button>
              <Button variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Product
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Tabs defaultValue="registrations" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="registrations">Registered Units</TabsTrigger>
              <TabsTrigger value="claims">Warranty Claims</TabsTrigger>
            </TabsList>

            <TabsContent value="registrations">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Registered Units</CardTitle>
                    <CardDescription>Customers who have registered this product</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.registeredUnits.map((unit, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
                      >
                        <div>
                          <p className="font-medium">{unit.customer.name}</p>
                          <p className="text-sm text-muted-foreground">{unit.customer.email}</p>
                          <p className="text-xs font-mono mt-1">{unit.serialNumber}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:text-right">
                          <div className="flex items-center gap-2 sm:justify-end">
                            <Badge variant={unit.status === "active" ? "default" : "destructive"}>
                              {unit.status === "active" ? "Active" : "Expired"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Purchased: {formatDate(unit.purchaseDate)}
                          </p>
                          <p className="text-xs text-muted-foreground">Expires: {formatDate(unit.expiryDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Registrations
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="claims">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Warranty Claims</CardTitle>
                    <CardDescription>Claims submitted for this product</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.claims.map((claim, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{claim.id}</p>
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
                                ? "Pending"
                                : claim.status === "in-progress"
                                  ? "In Progress"
                                  : claim.status === "resolved"
                                    ? "Resolved"
                                    : "Rejected"}
                            </Badge>
                          </div>
                          <p className="text-sm">{claim.issue}</p>
                          <p className="text-xs font-mono mt-1">{claim.serialNumber}</p>
                        </div>
                        <div className="mt-2 sm:mt-0 sm:text-right">
                          <p className="text-sm">{claim.customer.name}</p>
                          <p className="text-xs text-muted-foreground">{claim.customer.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted: {formatDate(claim.dateSubmitted)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Claims
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  )
}

