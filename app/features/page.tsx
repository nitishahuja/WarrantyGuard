import { Database } from "lucide-react"
import ComingSoonPage from "../coming-soon"

export default function FeaturesPage() {
  return (
    <ComingSoonPage
      title="Features"
      description="Our complete feature list is being updated. Please check back soon."
      icon={Database}
      backUrl="/"
      backLabel="Back to Home"
    />
  )
}

