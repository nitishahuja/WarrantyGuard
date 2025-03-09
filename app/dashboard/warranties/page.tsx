import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { WarrantyList } from "@/components/dashboard/warranty-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

export default function WarrantiesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Warranties" text="Manage all active and expired warranties.">
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="all">All Warranties</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <WarrantyList status="active" />
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <WarrantyList status="expiring" />
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <WarrantyList status="expired" />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <WarrantyList />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

