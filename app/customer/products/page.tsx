import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CustomerRegisteredProducts } from "@/components/customer/registered-products"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomerProductsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Products" text="View and manage your registered products.">
        <Link href="/customer/register-product">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Register Product
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="active">Active Warranties</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <CustomerRegisteredProducts />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <CustomerRegisteredProducts />
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <CustomerRegisteredProducts />
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <CustomerRegisteredProducts />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

