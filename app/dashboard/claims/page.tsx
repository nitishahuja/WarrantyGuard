import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ClaimsList } from "@/components/dashboard/claims-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

export default function ClaimsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Warranty Claims" text="Manage and process warranty claims from your customers.">
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <ClaimsList status="pending" />
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <ClaimsList status="in-progress" />
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <ClaimsList status="resolved" />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <ClaimsList />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

