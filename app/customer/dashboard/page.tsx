import Link from "next/link"
import { ArrowUpRight, Clock, Plus, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CustomerRegisteredProducts } from "@/components/customer/registered-products"
import { CustomerWarrantyStatus } from "@/components/customer/warranty-status"
import { CustomerRecentClaims } from "@/components/customer/recent-claims"

export default function CustomerDashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Dashboard" text="Manage your product warranties and claims.">
        <Link href="/customer/register-product">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Register Product
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="warranties">My Warranties</TabsTrigger>
          <TabsTrigger value="claims">My Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Warranties</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Across all your registered products</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Expiring within 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Claims</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Claims awaiting resolution</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Warranty Status</CardTitle>
                <CardDescription>Overview of your product warranties</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CustomerWarrantyStatus />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
                <CardDescription>Status of your recent warranty claims</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerRecentClaims />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Registered Products</CardTitle>
                <CardDescription>Products you've registered for warranty coverage</CardDescription>
              </div>
              <Link href="/customer/products">
                <Button variant="outline" size="sm" className="gap-1">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <CustomerRegisteredProducts limit={3} />
            </CardContent>
            <CardFooter>
              <Link href="/customer/register-product" className="w-full">
                <Button className="w-full">Register New Product</Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="warranties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Warranties</CardTitle>
              <CardDescription>All your registered product warranties</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerRegisteredProducts />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>My Claims</CardTitle>
                <CardDescription>Track the status of your warranty claims</CardDescription>
              </div>
              <Link href="/customer/claims/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Claim
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <CustomerRecentClaims showAll />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

