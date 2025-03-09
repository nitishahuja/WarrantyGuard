import { CreditCard } from "lucide-react"
import ComingSoonPage from "../coming-soon"

export default function PricingPage() {
  return (
    <ComingSoonPage
      title="Pricing"
      description="Our pricing plans are being finalized. Please check back soon or contact us for more information."
      icon={CreditCard}
      backUrl="/"
      backLabel="Back to Home"
    />
  )
}

