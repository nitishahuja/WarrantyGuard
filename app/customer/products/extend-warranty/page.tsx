"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, Shield, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { formatDate, formatCurrency } from "@/lib/utils"

export default function ExtendWarrantyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const productId = searchParams.get("productId")
  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState<"basic" | "premium" | "ultimate">("basic")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock product data - in a real app, this would be fetched based on the productId
  const product = {
    id: productId || "prod-1",
    name: "Premium Laptop X1",
    serialNumber: "LPX1-7845-9371",
    currentWarrantyEnd: "2024-06-15",
    image: "/placeholder.svg?height=100&width=100&text=Laptop",
  }

  const warrantyPlans = {
    basic: {
      name: "Basic Extension",
      duration: 12,
      price: 79,
      coverage: ["Hardware failures", "Manufacturing defects", "Power-related issues"],
    },
    premium: {
      name: "Premium Extension",
      duration: 24,
      price: 149,
      coverage: ["Everything in Basic", "Accidental damage", "Liquid damage", "Priority support"],
    },
    ultimate: {
      name: "Ultimate Extension",
      duration: 36,
      price: 199,
      coverage: ["Everything in Premium", "Theft protection", "Lost item coverage", "24/7 support hotline"],
    },
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep((prev) => prev + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  const handleSubmitPayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setStep(3)

    toast({
      title: "Warranty Extended Successfully",
      description: `Your warranty for ${product.name} has been extended by ${warrantyPlans[plan].duration} months.`,
    })
  }

  const getNewWarrantyEndDate = () => {
    const currentEnd = new Date(product.currentWarrantyEnd)
    const newEnd = new Date(currentEnd)
    newEnd.setMonth(newEnd.getMonth() + warrantyPlans[plan].duration)
    return formatDate(newEnd.toISOString())
  }

  return (
    <div className="container max-w-3xl py-12">
      <Link
        href="/customer/products"
        className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm font-medium mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to My Products</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Extend Your Warranty</h1>
        <p className="text-muted-foreground mt-1">
          Add additional protection to your product with an extended warranty.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <Progress value={step * 33.33} className="h-2" />
        <div className="flex justify-between mt-2 text-sm">
          <div className={step >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>1. Select Plan</div>
          <div className={step >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>2. Payment</div>
          <div className={step >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>3. Confirmation</div>
        </div>
      </div>

      {/* Step 1: Select Plan */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose Your Warranty Extension</CardTitle>
            <CardDescription>Select the warranty plan that best fits your needs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 border rounded-md">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">Serial Number: {product.serialNumber}</p>
                <p className="text-sm mt-1">
                  Current warranty expires:{" "}
                  <span className="font-medium">{formatDate(product.currentWarrantyEnd)}</span>
                </p>
              </div>
            </div>

            <RadioGroup value={plan} onValueChange={(value) => setPlan(value as "basic" | "premium" | "ultimate")}>
              <div className="grid gap-4">
                <div className="relative">
                  <RadioGroupItem value="basic" id="basic" className="peer sr-only" />
                  <Label
                    htmlFor="basic"
                    className="flex flex-col gap-1 rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{warrantyPlans.basic.name}</span>
                      <span className="text-primary font-semibold">{formatCurrency(warrantyPlans.basic.price)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {warrantyPlans.basic.duration} months extension
                    </span>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="premium" id="premium" className="peer sr-only" />
                  <Label
                    htmlFor="premium"
                    className="flex flex-col gap-1 rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex justify-between">
                      <div>
                        <span className="font-medium">{warrantyPlans.premium.name}</span>
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Most Popular
                        </span>
                      </div>
                      <span className="text-primary font-semibold">{formatCurrency(warrantyPlans.premium.price)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {warrantyPlans.premium.duration} months extension
                    </span>
                  </Label>
                </div>

                <div className="relative">
                  <RadioGroupItem value="ultimate" id="ultimate" className="peer sr-only" />
                  <Label
                    htmlFor="ultimate"
                    className="flex flex-col gap-1 rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{warrantyPlans.ultimate.name}</span>
                      <span className="text-primary font-semibold">{formatCurrency(warrantyPlans.ultimate.price)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {warrantyPlans.ultimate.duration} months extension
                    </span>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="rounded-md border p-4">
              <h4 className="font-medium mb-2">What's Included in {warrantyPlans[plan].name}</h4>
              <ul className="space-y-1">
                {warrantyPlans[plan].coverage.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                New warranty expiration: <span className="font-medium">{getNewWarrantyEndDate()}</span>
              </p>
            </div>
            <Button onClick={handleNextStep}>Continue to Payment</Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Enter your payment information to complete your warranty extension.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Order Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span>{product.serialNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {warrantyPlans[plan].name} ({warrantyPlans[plan].duration} months)
                  </span>
                  <span>{formatCurrency(warrantyPlans[plan].price)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(warrantyPlans[plan].price)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Card Information</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="CVC" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Billing Address</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zipcode">ZIP / Postal Code</Label>
                    <Input id="zipcode" placeholder="ZIP" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Country" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-xs text-muted-foreground">
              By proceeding, you agree to our{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </div>
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button onClick={handleSubmitPayment} disabled={isProcessing}>
                {isProcessing ? <>Processing Payment...</> : <>Pay {formatCurrency(warrantyPlans[plan].price)}</>}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
            <CardTitle>Warranty Extended Successfully!</CardTitle>
            <CardDescription>
              Your warranty has been successfully extended. Here's a summary of your purchase:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 border rounded-md">
                <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">Serial Number: {product.serialNumber}</p>
                </div>
              </div>

              <div className="grid gap-3 text-sm">
                <div className="grid grid-cols-2 gap-1 p-2 border-b">
                  <span className="text-muted-foreground">Plan Type:</span>
                  <span className="font-medium">{warrantyPlans[plan].name}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 border-b">
                  <span className="text-muted-foreground">Extension Period:</span>
                  <span className="font-medium">{warrantyPlans[plan].duration} months</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 border-b">
                  <span className="text-muted-foreground">Old Expiry Date:</span>
                  <span className="font-medium">{formatDate(product.currentWarrantyEnd)}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 border-b">
                  <span className="text-muted-foreground">New Expiry Date:</span>
                  <span className="font-medium">{getNewWarrantyEndDate()}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 border-b">
                  <span className="text-muted-foreground">Transaction Amount:</span>
                  <span className="font-medium">{formatCurrency(warrantyPlans[plan].price)}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 border-b">
                  <span className="text-muted-foreground">Confirmation Number:</span>
                  <span className="font-medium">WE-{Math.floor(Math.random() * 100000)}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 p-2 border-b">
                  <span className="text-muted-foreground">Transaction Date:</span>
                  <span className="font-medium">{formatDate(new Date().toISOString())}</span>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <div className="flex items-start gap-2 text-sm">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Your extended warranty is now active</p>
                    <p className="text-muted-foreground mt-1">
                      A confirmation email with your warranty certificate has been sent to your registered email
                      address.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.print()}>
              Print Receipt
            </Button>
            <Button asChild>
              <Link href="/customer/products">Back to My Products</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

