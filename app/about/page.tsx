import { Info } from "lucide-react"
import ComingSoonPage from "../coming-soon"

export default function AboutPage() {
  return (
    <ComingSoonPage
      title="About Us"
      description="We're working on our company story. Please check back soon to learn more about our team and mission."
      icon={Info}
      backUrl="/"
      backLabel="Back to Home"
    />
  )
}

