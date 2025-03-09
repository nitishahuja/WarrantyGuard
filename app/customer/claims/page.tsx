import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { CustomerRecentClaims } from "@/components/customer/recent-claims"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CustomerClaimsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="My Claims" text="Track and manage your warranty claims.">
        <Link href="/customer/claims/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Claims</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <CustomerRecentClaims showAll />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <CustomerRecentClaims showAll />
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <CustomerRecentClaims showAll />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

