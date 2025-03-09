import Link from "next/link"
import { ShieldCheck } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:py-12">
        <div className="flex flex-col gap-2 md:w-1/3">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="font-bold">WarrantyGuard</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Digital warranty management platform that helps businesses create, manage, and track product warranties
            while providing customers with a seamless experience.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Product</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/integrations">Integrations</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Company</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/about">About Us</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/careers">Careers</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-medium">Legal</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/cookies">Cookie Policy</Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="container border-t py-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WarrantyGuard. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              LinkedIn
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

