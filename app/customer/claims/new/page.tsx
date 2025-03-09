"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Upload, X, FileText, Image, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClaim } from "@/lib/actions/claims"
import { getCustomerWarranties } from "@/lib/actions/warranties"
import { Badge } from "@/components/ui/badge"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "application/pdf"]

const claimFormSchema = z.object({
  productId: z.string({
    required_error: "Please select a product.",
  }),
  issueType: z.string({
    required_error: "Please select an issue type.",
  }),
  issueDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  contactPreference: z.string({
    required_error: "Please select a contact preference.",
  }),
  attachments: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, `File size must be less than 10MB.`)
          .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "File type not supported."),
        preview: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.number(),
      }),
    )
    .optional(),
})

export default function NewClaimPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("product")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [attachments, setAttachments] = useState<any[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const form = useForm<z.infer<typeof claimFormSchema>>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      productId: productId || "",
      issueType: "",
      issueDescription: "",
      contactPreference: "",
      attachments: [],
    },
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const registrations = await getCustomerWarranties()

        // Filter out expired warranties
        const activeRegistrations = registrations.filter((reg) => reg.status !== "expired")

        // Format products for select dropdown
        const formattedProducts = activeRegistrations.map((reg) => ({
          id: reg.productId,
          name: reg.product.name,
          serialNumber: reg.serialNumber,
        }))

        setProducts(formattedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (productId) {
      form.setValue("productId", productId)
    }
  }, [productId, form])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const newAttachments = [...attachments]

    files.forEach((file) => {
      // Check file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive",
        })
        return
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        newAttachments.push({
          file,
          preview: e.target?.result as string,
          name: file.name,
          type: file.type,
          size: file.size,
        })
        setAttachments([...newAttachments])
        form.setValue("attachments", newAttachments)
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
    form.setValue("attachments", newAttachments)
  }

  async function onSubmit(values: z.infer<typeof claimFormSchema>) {
    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("productId", values.productId)
      formData.append("issueType", values.issueType)
      formData.append("issueDescription", values.issueDescription)
      formData.append("contactPreference", values.contactPreference)

      // Add attachments if any
      if (values.attachments && values.attachments.length > 0) {
        values.attachments.forEach((attachment, index) => {
          formData.append(`attachment_${index}`, attachment.file)
        })
      }

      const result = await createClaim(formData)

      if (result?.error) {
        setError("Failed to submit claim. Please check your information and try again.")
        return
      }

      toast({
        title: "Claim submitted successfully",
        description: "Your warranty claim has been submitted. We'll review it shortly.",
      })

      router.push("/customer/claims")
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Submit Warranty Claim" text="File a new warranty claim for your registered product.">
        <Link href="/customer/claims">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Claims
          </Button>
        </Link>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
          <CardDescription>Provide details about the issue you're experiencing with your product.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertDescription className="text-red-800 dark:text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          {isLoadingProducts ? (
            <div className="flex justify-center py-8">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Loading your products...</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <Alert className="mb-6">
              <AlertDescription>
                You don't have any active product warranties. Please register a product first.
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Product</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a registered product" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} ({product.serialNumber})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Choose the product that's experiencing issues</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issueType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select issue type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hardware">Hardware Failure</SelectItem>
                          <SelectItem value="software">Software Issue</SelectItem>
                          <SelectItem value="connectivity">Connectivity Problem</SelectItem>
                          <SelectItem value="power">Power/Battery Issue</SelectItem>
                          <SelectItem value="display">Display/Screen Problem</SelectItem>
                          <SelectItem value="audio">Audio Problem</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="issueDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Issue Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please describe the issue in detail. Include when it started and any troubleshooting steps you've already taken."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Be as specific as possible to help us diagnose the problem</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-sm font-medium">Attach Photos or Videos (Optional)</h3>
                    <Badge variant="outline">Beta</Badge>
                  </div>
                  <div
                    className={`mt-1 flex justify-center rounded-md border-2 ${isDragging ? "border-primary" : "border-dashed border-input"} px-6 py-10`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="flex text-sm text-muted-foreground">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-background px-2 font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={handleFileChange}
                            accept={ACCEPTED_FILE_TYPES.join(",")}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF, PDF up to 10MB each</p>
                    </div>
                  </div>

                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-medium">Attached Files</h4>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                        {attachments.map((attachment, index) => (
                          <div key={index} className="relative rounded-md border p-2 flex items-center gap-2">
                            {attachment.type.startsWith("image/") ? (
                              <Image className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div className="flex-1 truncate text-sm">
                              <p className="truncate font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{(attachment.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="contactPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>How would you like us to contact you about this claim?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.push("/customer/claims")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit Claim"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

