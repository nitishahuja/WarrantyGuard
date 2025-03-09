import Link from "next/link"
import { ArrowUpRight, Clock, Plus, RefreshCw, ShieldAlert, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentClaims } from "@/components/dashboard/recent-claims"
import { WarrantyStats } from "@/components/dashboard/warranty-stats"
import { RecentRegistrations } from "@/components/dashboard/recent-registrations"
import { AnalyticsOverview } from "@/components/dashboard/analytics-overview"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your product warranties, registrations, and claims.">
        <Link href="/dashboard/products/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            Analytics
            <Badge variant="outline" className="ml-1 h-4 px-1 text-[10px]">
              Beta
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-1">
            Notifications
            <Badge variant="outline" className="ml-1 h-4 px-1 text-[10px]">
              Coming Soon
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Warranties</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">Expiring within 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Claims</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">+4 new claims today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73</div>
                <p className="text-xs text-muted-foreground">+12.3% from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Warranty Statistics</CardTitle>
                <CardDescription>Distribution of your warranties by product category and status</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <WarrantyStats />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Claims</CardTitle>
                <CardDescription>Recent warranty claims requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentClaims />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Product Registrations</CardTitle>
                <CardDescription>New customers who have registered their products</CardDescription>
              </div>
              <Link href="/dashboard/registrations">
                <Button variant="outline" size="sm" className="gap-1">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <RecentRegistrations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsOverview />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Notification Settings</CardTitle>
                <Badge>Coming Soon</Badge>
              </div>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center">
                <RefreshCw className="h-10 w-10 text-muted-foreground" />
                <h3 className="font-medium">Coming Soon</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Notification settings will be available in the next update. Configure email and SMS alerts for new
                  registrations, claims, and warranty expirations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

