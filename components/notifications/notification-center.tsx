"use client"

import { useState, useEffect } from "react"
import { Bell, X, Check, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  description: string
  type: "info" | "warning" | "success"
  read: boolean
  timestamp: number // Store as timestamp to avoid hydration issues
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only run client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)

    // In a real app, you would fetch notifications from an API
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Warranty Expiring Soon",
        description: "Your Premium Laptop X1 warranty expires in 30 days.",
        type: "warning",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
      },
      {
        id: "2",
        title: "Claim Status Updated",
        description: "Your claim #CLM-7834 has been updated to 'In Progress'.",
        type: "info",
        read: false,
        timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
      },
      {
        id: "3",
        title: "Product Registration Successful",
        description: "Your Smart Watch Pro has been successfully registered.",
        type: "success",
        read: true,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  // Client-side only date formatting to prevent hydration mismatch
  const formatDate = (timestamp: number) => {
    if (!mounted) return ""

    const now = Date.now()
    const diffMs = now - timestamp
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "info":
      default:
        return <AlertCircle className="h-5 w-5 text-blue-500" />
    }
  }

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Notifications</h3>
            <Badge variant="outline" className="text-xs">
              Beta
            </Badge>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Bell className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs text-muted-foreground">You're all caught up!</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors",
                    !notification.read && "bg-muted/30",
                  )}
                >
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                        {notification.title}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xs text-muted-foreground">{formatDate(notification.timestamp)}</p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

