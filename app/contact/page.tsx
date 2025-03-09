"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: z.infer<typeof contactFormSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    toast({
      title: "Message sent successfully",
      description: "We'll get back to you as soon as possible.",
    })
  }

  return (
    <div className="container py-12 max-w-6xl">
      <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1 text-sm font-medium mb-10">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
              <p className="text-muted-foreground mt-2">
                Have questions about our warranty management platform? We're here to help. Fill out the form and we'll
                get back to you as soon as possible.
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-medium">Contact Information</h3>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">support@warrantyguard.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-muted-foreground">
                    123 Warranty Blvd, Suite 200
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-medium">Office Hours</h3>
              <dl className="mt-3 space-y-1">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Monday - Friday</dt>
                  <dd>9:00 AM - 6:00 PM EST</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Saturday</dt>
                  <dd>10:00 AM - 3:00 PM EST</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Sunday</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20 mb-4">
                    <Mail className="h-8 w-8 text-green-600 dark:text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Message Sent Successfully</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Thank you for reaching out. One of our team members will contact you shortly.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 000-0000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="billing">Billing</SelectItem>
                                <SelectItem value="demo">Request a Demo</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about your inquiry..."
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Please be as specific as possible so we can better assist you.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="border-t p-4 text-xs text-muted-foreground">
              By submitting this form, you agree to our Privacy Policy and Terms of Service.
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

