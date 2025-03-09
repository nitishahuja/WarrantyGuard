"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, FileSpreadsheet, FileText, Download, AlertCircle, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ImportProductsPage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [results, setResults] = useState<{
    total: number
    successful: number
    failed: number
    errors: Array<{ row: number; message: string }>
  } | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)

    if (file && !file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file",
        variant: "destructive",
      })
      setSelectedFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()

    const file = e.dataTransfer.files?.[0] || null
    setSelectedFile(file)

    if (file && !file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV or Excel file",
        variant: "destructive",
      })
      setSelectedFile(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 300)

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    clearInterval(progressInterval)
    setUploadProgress(100)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate success with some random errors
    const mockResults = {
      total: Math.floor(Math.random() * 20) + 10,
      successful: 0,
      failed: 0,
      errors: [] as Array<{ row: number; message: string }>,
    }

    // Add some random errors
    const errorMessages = [
      "Invalid product name",
      "Duplicate serial number format",
      "Missing warranty months",
      "Category not found",
      "Description too short",
    ]

    const errorCount = Math.floor(Math.random() * 3)
    for (let i = 0; i < errorCount; i++) {
      const row = Math.floor(Math.random() * mockResults.total) + 1
      const message = errorMessages[Math.floor(Math.random() * errorMessages.length)]
      mockResults.errors.push({ row, message })
    }

    mockResults.failed = mockResults.errors.length
    mockResults.successful = mockResults.total - mockResults.failed

    setResults(mockResults)
    setUploadStatus(mockResults.failed > 0 ? "error" : "success")
    setIsUploading(false)

    toast({
      title:
        mockResults.failed > 0
          ? `Import completed with ${mockResults.failed} errors`
          : "All products imported successfully",
      description: `${mockResults.successful} of ${mockResults.total} products were imported successfully.`,
      variant: mockResults.failed > 0 ? "default" : "default",
    })
  }

  const resetImport = () => {
    setSelectedFile(null)
    setUploadStatus("idle")
    setUploadProgress(0)
    setResults(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const downloadTemplate = () => {
    toast({
      title: "Template downloaded",
      description: "The product import template has been downloaded to your device.",
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Import Products" text="Bulk import products from CSV or Excel files.">
        <Link href="/dashboard/products">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Bulk Product Import</CardTitle>
            <Badge variant="outline">Beta</Badge>
          </div>
          <CardDescription>Upload a CSV or Excel file to add multiple products at once.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              {uploadStatus === "idle" && (
                <>
                  <div
                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-10"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".csv,.xlsx"
                            onChange={handleFileSelect}
                            ref={fileInputRef}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-muted-foreground">CSV or Excel files up to 5MB</p>
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="mt-4">
                      <div className="flex items-center gap-2 p-3 border rounded-md">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <Button onClick={handleUpload}>Upload</Button>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-center">
                    <Button variant="outline" onClick={downloadTemplate}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </div>
                </>
              )}

              {uploadStatus === "uploading" && (
                <div className="space-y-4 py-6">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <div>
                      <p className="font-medium">Uploading and processing file</p>
                      <p className="text-sm text-muted-foreground">
                        This may take a few moments depending on file size
                      </p>
                    </div>
                  </div>

                  <Progress value={uploadProgress} className="h-2" />

                  <p className="text-xs text-muted-foreground text-center">
                    {uploadProgress < 100 ? "Uploading and validating your data..." : "Processing products..."}
                  </p>
                </div>
              )}

              {(uploadStatus === "success" || uploadStatus === "error") && results && (
                <div className="space-y-6 py-4">
                  <div className="flex items-start gap-3">
                    {uploadStatus === "success" ? (
                      <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-2">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-500" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-amber-100 dark:bg-amber-900/20 p-2">
                        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {uploadStatus === "success"
                          ? "All products imported successfully!"
                          : "Import completed with errors"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {`${results.successful} of ${results.total} products were imported successfully.`}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="border rounded-md p-3">
                      <p className="text-2xl font-bold">{results.total}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                    <div className="border rounded-md p-3 bg-green-50 dark:bg-green-900/10">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-500">{results.successful}</p>
                      <p className="text-sm text-muted-foreground">Successful</p>
                    </div>
                    <div className="border rounded-md p-3 bg-red-50 dark:bg-red-900/10">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-500">{results.failed}</p>
                      <p className="text-sm text-muted-foreground">Failed</p>
                    </div>
                  </div>

                  {results.errors.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Errors</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left">Row</th>
                              <th className="px-4 py-2 text-left">Error</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {results.errors.map((error, i) => (
                              <tr key={i} className="hover:bg-muted/50">
                                <td className="px-4 py-2">{error.row}</td>
                                <td className="px-4 py-2 text-red-600 dark:text-red-500">{error.message}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={resetImport}>
                      Import Another File
                    </Button>
                    <Button asChild>
                      <Link href="/dashboard/products">View Products</Link>
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="instructions">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">How to Import Products</h3>
                  <p className="text-muted-foreground mt-1">Follow these steps to import multiple products at once:</p>
                </div>

                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Download the template spreadsheet using the button below</li>
                  <li>Fill in the product details according to the template format</li>
                  <li>Save the file as a CSV or Excel (.xlsx) format</li>
                  <li>Upload the completed file using the upload form</li>
                  <li>Review any errors and correct them in your file if needed</li>
                </ol>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Required Fields</AlertTitle>
                  <AlertDescription>
                    The following fields are required for each product:
                    <ul className="list-disc list-inside mt-2 ml-2">
                      <li>Product Name</li>
                      <li>Description</li>
                      <li>Category</li>
                      <li>Warranty Months</li>
                      <li>Serial Number Format</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="py-2">
                  <h4 className="font-medium">Field Descriptions</h4>
                  <div className="mt-2 border rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left">Field</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-left">Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr className="hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">Product Name</td>
                          <td className="px-4 py-2">Name of the product</td>
                          <td className="px-4 py-2">Premium Laptop X1</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">Description</td>
                          <td className="px-4 py-2">Detailed description of the product</td>
                          <td className="px-4 py-2">High-performance laptop with 16GB RAM</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">Category</td>
                          <td className="px-4 py-2">Product category</td>
                          <td className="px-4 py-2">electronics</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">Warranty Months</td>
                          <td className="px-4 py-2">Duration of warranty in months</td>
                          <td className="px-4 py-2">24</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="px-4 py-2 font-medium">Serial Format</td>
                          <td className="px-4 py-2">Format of serial numbers</td>
                          <td className="px-4 py-2">LPX1-####-####</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={downloadTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <p className="text-xs text-muted-foreground">Maximum file size: 5MB. Supported formats: CSV, XLSX</p>
          <Button variant="outline" asChild>
            <Link href="/dashboard/products">Cancel</Link>
          </Button>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}

