"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createProduct } from "@/lib/actions/products"
import { Alert, AlertDescription } from "@/components/ui/alert"

const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a product category.",
  }),
  warrantyMonths: z.coerce.number().min(1, {
    message: "Warranty period must be at least 1 month.",
  }),
  serialFormat: z.string().min(3, {
    message: "Serial number format is required.",
  }),
})

export default function AddProductPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      warrantyMonths: 12,
      serialFormat: "",
    },
  })

  async function onSubmit(values: z.infer<typeof productFormSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("category", values.category)
      formData.append("warrantyMonths", values.warrantyMonths.toString())
      formData.append("serialFormat", values.serialFormat)

      const result = await createProduct(formData)

      if (result?.error) {
        setError("Failed to add product. Please check your information and try again.")
        return
      }

      toast({
        title: "Product added successfully",
        description: "Your product has been added to your catalog.",
      })

      router.push("/dashboard/products")
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Add New Product" text="Add a new product to your catalog with warranty details.">
        <Link href="/dashboard/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Enter the details of your product and warranty terms.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Premium Laptop X1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="appliances">Appliances</SelectItem>
                          <SelectItem value="furniture">Furniture</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a detailed description of your product"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="warrantyMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Warranty Period (Months)</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormDescription>Standard warranty duration for this product</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serialFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial Number Format</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC-####-####" {...field} />
                      </FormControl>
                      <FormDescription>Use # for digits, e.g., ABC-####-####</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Image</label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-input px-6 py-10">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-muted-foreground">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-background px-2 font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Warranty Terms (Optional)</label>
                  <Textarea placeholder="Enter additional warranty terms and conditions" className="min-h-[160px]" />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard/products")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding Product..." : "Add Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

