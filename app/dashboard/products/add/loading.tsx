import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function AddProductLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Add New Product" text="Loading product form..." />

      <Skeleton className="h-[600px] w-full" />
    </DashboardShell>
  )
}

