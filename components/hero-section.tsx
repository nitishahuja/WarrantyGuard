import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-b from-primary/10 via-background to-background py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Digital Warranty Management <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Streamline your warranty process, reduce paperwork, and enhance customer experience with our digital
            warranty and product registration platform.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/register?role=business">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg">
              Request Demo
            </Button>
          </Link>
        </div>

        <div className="mt-12 w-full max-w-5xl rounded-lg border bg-background/50 shadow-lg backdrop-blur-sm overflow-hidden">
          <div className="aspect-video w-full bg-gray-900/5 dark:bg-gray-50/5 relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center md:p-10">
              <h3 className="text-xl font-bold">Dashboard Preview</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Powerful analytics and warranty management tools for businesses
              </p>
            </div>
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Dashboard Preview"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">99.9% Uptime</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium">SOC 2 Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-medium">GDPR Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}

