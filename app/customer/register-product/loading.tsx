import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function RegisterProductLoading() {
  return (
    <div className="container max-w-md py-12 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground mt-4">Loading product registration form...</p>
      </div>
    </div>
  )
}

