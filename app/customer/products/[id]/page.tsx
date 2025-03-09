import Link from "next/link"
import { ArrowLeft, Calendar, Clock, FileText, ShieldCheck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"

export default function CustomerProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // In a real app, you would fetch the product data based on the ID
  const product = {
    id: params.id,
    name: "Premium Laptop X1",
    serialNumber: "LPX1-7845-9371",
    brand: "TechPro",
    model: "X1-2023",
    category: "Electronics",
    purchaseDate: "2023-01-15",
    expiryDate: "2025-01-15",
    status: "active",
    daysLeft: 320,
    retailer: "TechStore Online",
    image: "/placeholder.svg?height=300&width=500&text=Laptop",
    warrantyTerms: [
      "Coverage for manufacturing defects",
      "Free repair or replacement of defective parts",
      "Coverage for electrical and mechanical failures",
      "Excludes accidental damage",
      "Excludes normal wear and tear",
      "Warranty void if product is tampered with or modified",
    ],
    claimHistory: [
      {
        id: "CLM-1001",
        date: "2023-06-10",
        issue: "Screen flickering when using external monitor",
        status: "pending",
      },
    ],
    documents: [
      {
        name: "Purchase Receipt",
        date: "2023-01-15",
        type: "receipt",
      },
      {
        name: "Warranty Certificate",
        date: "2023-01-15",
        type: "warranty",
      },
      {
        name: "User Manual",
        date: "2023-01-15",
        type: "manual",
      },
    ],
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Product Details" text="View warranty information and claim history.">
        <Link href="/customer/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
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
              <Badge
                className="absolute top-2 right-2"
                variant={
                  product.status === "active" ? "default" : product.status === "expiring" ? "warning" : "destructive"
                }
              >
                {product.status === "active"
                  ? "Active Warranty"
                  : product.status === "expiring"
                    ? "Expiring Soon"
                    : "Expired"}
              </Badge>
            </div>

            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                {product.brand} • {product.model}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Serial Number</p>
                    <p className="font-mono text-sm">{product.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p>{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                    <p>{formatDate(product.purchaseDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Retailer</p>
                    <p>{product.retailer}</p>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Warranty Period</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p>{formatDate(product.purchaseDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p>{formatDate(product.expiryDate)}</p>
                    </div>
                  </div>
                  {product.status !== "expired" && (
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{product.daysLeft} days remaining</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2">
              {product.status !== "expired" && (
                <Button className="w-full" asChild>
                  <Link href={`/customer/claims/new?product=${product.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    File Warranty Claim
                  </Link>
                </Button>
              )}
              <Button className="w-full" variant={product.status === "expired" ? "default" : "outline"} asChild>
                <Link href={`/customer/products/extend-warranty?productId=${product.id}`}>
                  <Shield className="mr-2 h-4 w-4" />
                  {product.status === "expired" ? "Renew Warranty" : "Extend Warranty"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-4">
          <Tabs defaultValue="warranty" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="warranty">Warranty Terms</TabsTrigger>
              <TabsTrigger value="claims">Claim History</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="warranty">
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Terms & Conditions</CardTitle>
                  <CardDescription>Details of your warranty coverage for this product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">What's Covered</h3>
                    </div>
                    <ul className="space-y-2 ml-6 list-disc">
                      {product.warrantyTerms.map((term, index) => (
                        <li key={index} className="text-sm">
                          {term}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-md bg-muted p-4 mt-6">
                      <h3 className="font-medium mb-2">Need Support?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        If you're experiencing issues with your product, our support team is here to help.
                      </p>
                      <Button variant="outline" className="w-full">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="claims">
              <Card>
                <CardHeader>
                  <CardTitle>Claim History</CardTitle>
                  <CardDescription>Previous warranty claims for this product</CardDescription>
                </CardHeader>
                <CardContent>
                  {product.claimHistory.length > 0 ? (
                    <div className="space-y-4">
                      {product.claimHistory.map((claim) => (
                        <div key={claim.id} className="flex items-start gap-4 p-4 border rounded-md">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{claim.id}</h4>
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
                            <p className="text-sm text-muted-foreground mb-1">Submitted on {formatDate(claim.date)}</p>
                            <p className="text-sm">{claim.issue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="rounded-full bg-muted p-3 mx-auto mb-4 w-fit">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">No claims yet</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You haven't filed any warranty claims for this product.
                      </p>
                      {product.status !== "expired" && (
                        <Button asChild>
                          <Link href={`/customer/claims/new?product=${product.id}`}>File a Claim</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Product Documents</CardTitle>
                  <CardDescription>Access your product documentation and receipts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {product.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-muted p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Added on {formatDate(doc.date)}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}

                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        Upload New Document
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardShell>
  )
}

