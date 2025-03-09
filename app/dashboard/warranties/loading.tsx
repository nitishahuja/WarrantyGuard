import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function WarrantiesLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Warranties" text="Loading your warranty information..." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
      </div>
    </DashboardShell>
  )
}

