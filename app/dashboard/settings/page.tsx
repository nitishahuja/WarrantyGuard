import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your warranty program settings and configurations." />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Warranty Program Settings</CardTitle>
              <CardDescription>Configure the default settings for your warranty program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Acme Inc." />
                <p className="text-sm text-muted-foreground">
                  This will appear on all warranty certificates and customer communications.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@acme.com" />
                <p className="text-sm text-muted-foreground">
                  Customer inquiries and warranty claims will be directed to this email.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input id="support-phone" defaultValue="+1 (555) 123-4567" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Default Warranty Settings</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-warranty">Default Warranty Period (Months)</Label>
                    <Input id="default-warranty" type="number" defaultValue="12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry-reminder">Expiry Reminder (Days Before)</Label>
                    <Input id="expiry-reminder" type="number" defaultValue="30" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-approve" defaultChecked />
                  <Label htmlFor="auto-approve">Auto-approve product registrations</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="send-certificate" defaultChecked />
                  <Label htmlFor="send-certificate">Send warranty certificate upon registration</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your warranty portal and customer communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md border flex items-center justify-center bg-muted">
                      <span className="text-2xl font-bold text-muted-foreground">A</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Logo
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Recommended size: 200x200px. Max file size: 2MB.</p>
                </div>

                <div className="space-y-2">
                  <Label>Email Header Image</Label>
                  <div className="h-20 w-full rounded-md border flex items-center justify-center bg-muted">
                    <span className="text-sm text-muted-foreground">No image uploaded</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Image
                  </Button>
                  <p className="text-sm text-muted-foreground">Recommended size: 600x200px. Max file size: 2MB.</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Color Scheme</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-md bg-primary"></div>
                      <Input id="primary-color" defaultValue="#2563eb" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-md bg-secondary"></div>
                      <Input id="secondary-color" defaultValue="#f3f4f6" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Templates</h3>

                <div className="space-y-2">
                  <Label htmlFor="email-footer">Email Footer Text</Label>
                  <Input id="email-footer" defaultValue="© 2023 Acme Inc. All rights reserved." />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="include-social" defaultChecked />
                  <Label htmlFor="include-social">Include social media links in emails</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Branding</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your warranty system with other services and platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M3.5 21h17"></path>
                        <path d="M3.5 7V3h17v4"></path>
                        <path d="M3.5 10.5h17"></path>
                        <path d="M3.5 14h17"></path>
                        <path d="M3.5 17.5h17"></path>
                        <path d="M9.5 3v18"></path>
                        <path d="M14.5 3v18"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">CRM Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with your CRM system to sync customer data
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Help Desk Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with your help desk to manage warranty claims
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Email Marketing Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect with your email marketing platform</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">ERP Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect with your ERP system for inventory management
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription plan and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Current Plan: Business Pro</h3>
                    <p className="text-sm text-muted-foreground">$49/month, billed annually</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="secondary">Active</Badge>
                      <span className="text-xs text-muted-foreground">Renews on Jan 1, 2024</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Change Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel Plan
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Payment Method</h3>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Visa ending in 4242</h3>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <Button variant="outline">Add Payment Method</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Billing History</h3>

                <div className="rounded-lg border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                    <div>Date</div>
                    <div>Description</div>
                    <div>Amount</div>
                    <div className="text-right">Receipt</div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 p-4 border-b">
                    <div className="text-sm">Jan 1, 2023</div>
                    <div className="text-sm">Annual Subscription - Business Pro</div>
                    <div className="text-sm">$588.00</div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 p-4">
                    <div className="text-sm">Jan 1, 2022</div>
                    <div className="text-sm">Annual Subscription - Business Pro</div>
                    <div className="text-sm">$588.00</div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

