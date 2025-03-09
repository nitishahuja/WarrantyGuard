import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function ClaimsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Warranty Claims" text="Loading your claims data..." />

      <div className="grid gap-6">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </DashboardShell>
  )
}

