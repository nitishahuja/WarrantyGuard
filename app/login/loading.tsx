import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function LoginLoading() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground mt-4">Loading login form...</p>
      </div>
    </div>
  )
}

