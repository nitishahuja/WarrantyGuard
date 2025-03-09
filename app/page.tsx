import Link from "next/link"
import { ArrowRight, ShieldCheck, RefreshCw, BellRing, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-8">
      <HeroSection />

      {/* Features Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Warranty Management</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to digitize your product warranty process
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 shadow-sm">
            <ShieldCheck className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Digital Warranties</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Create and manage digital warranties for all your products
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 shadow-sm">
            <RefreshCw className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Easy Registration</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Customers register products via serial numbers or QR codes
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 shadow-sm">
            <BellRing className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Auto Notifications</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Send automated reminders before warranty expiry
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-lg border p-6 shadow-sm">
            <Zap className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Claims Processing</h3>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Efficiently track and process warranty claims
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform connects businesses and customers for seamless warranty management
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
            <h3 className="text-xl font-bold">Businesses Add Products</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Upload product details and set warranty terms through your business dashboard
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
            <h3 className="text-xl font-bold">Customers Register</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Customers register their purchases using serial numbers or QR codes
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
            <h3 className="text-xl font-bold">Automated Management</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Platform sends reminders, processes claims, and provides analytics
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-6 rounded-lg bg-primary p-8 text-center text-primary-foreground md:p-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Digitize Your Warranty Process?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/90 md:text-xl/relaxed">
              Join businesses that have streamlined their warranty management and improved customer satisfaction.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/register?role=business">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Sign Up for Businesses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register?role=customer">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Customer Registration
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

