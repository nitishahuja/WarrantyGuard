"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, MessageSquare, Paperclip, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"

export default function ClaimDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [newMessage, setNewMessage] = useState("")

  // In a real app, you would fetch the claim data based on the ID
  const claim = {
    id: params.id,
    product: {
      id: "prod-2",
      name: "Smart Watch Pro",
      serialNumber: "SWP-4572-8391",
    },
    issue: "Battery not charging past 80%",
    description:
      "The watch won't charge beyond 80% regardless of how long it stays on the charger. I've tried multiple chargers with the same result. The issue started about a week ago.",
    dateSubmitted: "2023-03-01",
    status: "in-progress",
    lastUpdate: "2023-03-02",
    timeline: [
      {
        date: "2023-03-01T14:32:00",
        type: "created",
        description: "Claim submitted",
      },
      {
        date: "2023-03-02T09:15:00",
        type: "status-change",
        description: "Claim status changed to In Progress",
      },
      {
        date: "2023-03-02T09:20:00",
        type: "message",
        sender: "support",
        content:
          "Thank you for submitting your claim. I'll be assisting you with this issue. Could you please let me know if you've tried resetting the watch to factory settings?",
        senderName: "Support Agent",
      },
      {
        date: "2023-03-02T10:45:00",
        type: "message",
        sender: "customer",
        content:
          "Yes, I've tried resetting it twice but the issue persists. The battery still won't charge beyond 80%.",
        senderName: "You",
      },
      {
        date: "2023-03-02T11:30:00",
        type: "message",
        sender: "support",
        content:
          "Thank you for confirming. Based on your description, this could be a battery calibration issue or potentially a hardware problem. We'd like to run some diagnostics. Could you please install our diagnostic app and share the results?",
        senderName: "Support Agent",
      },
    ],
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // In a real app, you would send this message to your API
    console.log("Sending message:", newMessage)

    // Clear the input after sending
    setNewMessage("")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`Claim ${claim.id}`} text="View and manage your warranty claim.">
        <Link href="/customer/claims">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Claims
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Claim Details</CardTitle>
              <CardDescription>Information about your warranty claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge
                  className="mt-1"
                  variant={
                    claim.status === "pending"
                      ? "outline"
                      : claim.status === "in-progress"
                        ? "secondary"
                        : claim.status === "resolved"
                          ? "default"
                          : "destructive"
                  }
                >
                  {claim.status === "pending"
                    ? "Pending Review"
                    : claim.status === "in-progress"
                      ? "In Progress"
                      : claim.status === "resolved"
                        ? "Resolved"
                        : "Rejected"}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
                <p className="font-medium">{claim.product.name}</p>
                <p className="text-sm font-mono">{claim.product.serialNumber}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Submitted On</h3>
                <p>{formatDate(claim.dateSubmitted)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <p>{formatDate(claim.lastUpdate)}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Issue Reported</h3>
                <p className="font-medium mt-1">{claim.issue}</p>
                <p className="text-sm mt-2">{claim.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/customer/products/${claim.product.id}`}>View Product Details</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Communication</CardTitle>
              <CardDescription>Messages and updates about your claim</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-6">
                {claim.timeline.map((event, index) => (
                  <div key={index} className="relative pl-6 pb-6 last:pb-0">
                    {index !== claim.timeline.length - 1 && (
                      <span className="absolute left-2 top-2 bottom-0 w-0.5 bg-muted" />
                    )}

                    <div className="absolute left-0 top-2 rounded-full bg-muted w-4 h-4 flex items-center justify-center">
                      {event.type === "message" ? (
                        <MessageSquare className="h-2 w-2" />
                      ) : event.type === "status-change" ? (
                        <Clock className="h-2 w-2" />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground mb-1">{new Date(event.date).toLocaleString()}</div>

                    {event.type === "message" ? (
                      <div className={`flex gap-3 ${event.sender === "customer" ? "justify-end" : ""}`}>
                        {event.sender !== "customer" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=SA" />
                            <AvatarFallback>SA</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 max-w-[80%] ${
                            event.sender === "customer" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                          }`}
                        >
                          <p className="text-xs font-medium mb-1">{event.senderName}</p>
                          <p className="text-sm">{event.content}</p>
                        </div>
                        {event.sender === "customer" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" />
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ) : (
                      <div className="bg-muted rounded-md p-3">
                        <p className="text-sm">{event.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex w-full gap-2">
                <Button variant="outline" size="icon" type="button">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Textarea
                  placeholder="Type your message here..."
                  className="flex-1 min-h-10"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" type="button" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

