import Link from "next/link"
import { Plus, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProductList } from "@/components/dashboard/product-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Products" text="Manage your product catalog and warranty terms.">
        <div className="flex gap-2">
          <Link href="/dashboard/products/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
          <Link href="/dashboard/products/import">
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Import Products
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="electronics">Electronics</TabsTrigger>
          <TabsTrigger value="appliances">Appliances</TabsTrigger>
          <TabsTrigger value="furniture">Furniture</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ProductList />
        </TabsContent>

        <TabsContent value="electronics" className="space-y-4">
          <ProductList category="electronics" />
        </TabsContent>

        <TabsContent value="appliances" className="space-y-4">
          <ProductList category="appliances" />
        </TabsContent>

        <TabsContent value="furniture" className="space-y-4">
          <ProductList category="furniture" />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

