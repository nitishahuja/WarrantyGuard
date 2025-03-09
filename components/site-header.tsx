"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldCheck, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useSession, signOut } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationCenter } from "@/components/notifications/notification-center"

export function SiteHeader() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  // Check if user is logged in and determine their role
  const isLoggedIn = status === "authenticated"
  const isBusinessUser = isLoggedIn && session?.user?.role === "BUSINESS"
  const isCustomerUser = isLoggedIn && session?.user?.role === "CUSTOMER"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">WarrantyGuard</span>
        </Link>

        <div className="flex-1 flex justify-center">
          {!isLoggedIn && (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/features" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Features</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <ModeToggle />
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link href="/register?role=business">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </>
          ) : isBusinessUser ? (
            <>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 px-4">
                          <span>My Account</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <Link href="/dashboard" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <span className="font-medium">Dashboard</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 ml-7">Return to your main dashboard</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/products" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <span className="font-medium">My Products</span>
                              <p className="text-xs text-muted-foreground mt-1">View and manage your products</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/claims" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <span className="font-medium">My Claims</span>
                              <p className="text-xs text-muted-foreground mt-1">Track warranty claims</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/dashboard/products/add" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <span className="font-medium">Register Product</span>
                              <p className="text-xs text-muted-foreground mt-1">Add a new product to your catalog</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </>
          ) : isCustomerUser ? (
            <>
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-1 px-4">
                          <span>My Account</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <Link href="/customer/dashboard" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                <span className="font-medium">Dashboard</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 ml-7">Return to your main dashboard</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/customer/products" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <span className="font-medium">My Products</span>
                              <p className="text-xs text-muted-foreground mt-1">View your registered products</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/customer/claims" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <span className="font-medium">My Claims</span>
                              <p className="text-xs text-muted-foreground mt-1">Track your warranty claims</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <Link href="/customer/register-product" className="w-full">
                          <DropdownMenuItem>
                            <div className="flex flex-col w-full">
                              <span className="font-medium">Register Product</span>
                              <p className="text-xs text-muted-foreground mt-1">Register a new product warranty</p>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </>
          ) : null}

          {isLoggedIn && <NotificationCenter />}
          <ModeToggle />

          {isLoggedIn && (
            <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2">
              <span className="hidden sm:inline">Log Out</span>
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

