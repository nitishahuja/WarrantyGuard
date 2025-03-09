import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Loading..." text="Please wait while we load your dashboard." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[125px] w-full" />
        <Skeleton className="h-[125px] w-full" />
        <Skeleton className="h-[125px] w-full" />
        <Skeleton className="h-[125px] w-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Skeleton className="col-span-4 h-[350px] w-full" />
        <Skeleton className="col-span-3 h-[350px] w-full" />
      </div>

      <Skeleton className="h-[400px] w-full mt-4" />
    </DashboardShell>
  )
}

