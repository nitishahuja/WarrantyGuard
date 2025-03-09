"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ShieldCheck, QrCode, Camera, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { QRScanner } from "@/components/qr-scanner"
import { registerProduct } from "@/lib/actions/warranties"
import { Badge } from "@/components/ui/badge"

const registerFormSchema = z.object({
  serialNumber: z.string().min(5, {
    message: "Serial number must be at least 5 characters.",
  }),
  purchaseDate: z.string().min(1, {
    message: "Purchase date is required.",
  }),
  retailer: z.string().optional(),
})

export default function RegisterProductPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showScanner, setShowScanner] = useState(false)
  const [activeTab, setActiveTab] = useState("serial")
  const [mounted, setMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      serialNumber: "",
      purchaseDate: "",
      retailer: "",
    },
  })

  const handleQRScan = (data: string) => {
    form.setValue("serialNumber", data)
    setShowScanner(false)
    setActiveTab("serial")
    toast({
      title: "QR Code Scanned",
      description: `Serial number detected: ${data}`,
    })
  }

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("serialNumber", values.serialNumber)
      formData.append("purchaseDate", values.purchaseDate)
      formData.append("retailer", values.retailer || "")

      const result = await registerProduct(formData)

      if (result?.error) {
        setError("Failed to register product. Please check your information and try again.")
        return
      }

      toast({
        title: "Product registered successfully",
        description: "Your warranty is now active.",
      })

      router.push("/customer/dashboard")
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-12">
      <Link
        href="/customer/dashboard"
        className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm font-medium mb-6"
      >
        <ShieldCheck className="h-4 w-4" />
        <span>Back to Dashboard</span>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Register Your Product</CardTitle>
              <CardDescription>Enter your product details to activate your warranty</CardDescription>
            </div>
            {activeTab === "qr" && <Badge variant="outline">Beta</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="serial" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="serial">Serial Number</TabsTrigger>
              <TabsTrigger value="qr">Scan QR Code</TabsTrigger>
            </TabsList>

            <TabsContent value="serial">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input placeholder="XXX-0000-0000" {...field} />
                        </FormControl>
                        <FormDescription>Enter the serial number from your product</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purchaseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="retailer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Retailer (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Where did you purchase this product?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register Product"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="qr" className="flex flex-col items-center justify-center space-y-4">
              {mounted && showScanner ? (
                <QRScanner onScan={handleQRScan} onClose={() => setShowScanner(false)} />
              ) : (
                <>
                  <div className="h-64 w-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                    <div className="text-center space-y-4 p-4 flex flex-col items-center">
                      <QrCode className="h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Scan the QR code on your product or packaging</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowScanner(true)}
                        className="flex items-center gap-2 mx-auto"
                      >
                        <Camera className="h-4 w-4" />
                        Open Camera
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center max-w-xs">
                    Position the QR code within the camera frame. Make sure you have good lighting for best results.
                  </p>
                </>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full border-t pt-4">
            <h3 className="text-sm font-medium flex items-center mb-2">
              <CheckCircle2 className="h-4 w-4 mr-2 text-primary" />
              Benefits of Registration
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
              <li>Activate your product warranty</li>
              <li>Receive important product updates</li>
              <li>Get timely expiry notifications</li>
              <li>Access to easy warranty claims process</li>
            </ul>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

