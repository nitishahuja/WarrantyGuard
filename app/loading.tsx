import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="container flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground mt-4">Loading...</p>
      </div>
    </div>
  )
}

