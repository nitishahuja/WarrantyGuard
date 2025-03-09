"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for analytics
const registrationData = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 18 },
  { month: "Mar", count: 15 },
  { month: "Apr", count: 22 },
  { month: "May", count: 28 },
  { month: "Jun", count: 32 },
  { month: "Jul", count: 35 },
  { month: "Aug", count: 40 },
  { month: "Sep", count: 48 },
  { month: "Oct", count: 52 },
  { month: "Nov", count: 58 },
  { month: "Dec", count: 65 },
]

const claimsData = [
  { month: "Jan", approved: 2, rejected: 1, pending: 1 },
  { month: "Feb", approved: 3, rejected: 2, pending: 2 },
  { month: "Mar", approved: 2, rejected: 1, pending: 1 },
  { month: "Apr", approved: 4, rejected: 1, pending: 2 },
  { month: "May", approved: 5, rejected: 2, pending: 3 },
  { month: "Jun", approved: 6, rejected: 2, pending: 2 },
  { month: "Jul", approved: 7, rejected: 3, pending: 4 },
  { month: "Aug", approved: 8, rejected: 2, pending: 3 },
  { month: "Sep", approved: 9, rejected: 3, pending: 4 },
  { month: "Oct", approved: 10, rejected: 4, pending: 5 },
  { month: "Nov", approved: 12, rejected: 3, pending: 4 },
  { month: "Dec", approved: 14, rejected: 4, pending: 6 },
]

export function AnalyticsOverview() {
  const [period, setPeriod] = useState("yearly")
  const [mounted, setMounted] = useState(false)

  // Only run on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter data based on selected period
  const filteredRegistrationData =
    period === "monthly"
      ? registrationData.slice(-1)
      : period === "quarterly"
        ? registrationData.slice(-3)
        : registrationData

  const filteredClaimsData =
    period === "monthly" ? claimsData.slice(-1) : period === "quarterly" ? claimsData.slice(-3) : claimsData

  // Show skeleton during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Track your warranty program performance</CardDescription>
            </div>
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Product Registrations</h3>
              <Skeleton className="h-[300px] w-full" />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Warranty Claims</h3>
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <CardTitle>Analytics Overview</CardTitle>
            <Badge variant="outline">Beta</Badge>
          </div>
          <Tabs defaultValue="yearly" value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Product Registrations</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredRegistrationData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                    itemStyle={{ color: "var(--foreground)" }}
                    labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Registrations"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Warranty Claims</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredClaimsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                    itemStyle={{ color: "var(--foreground)" }}
                    labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
                  />
                  <Legend />
                  <Bar dataKey="approved" name="Approved" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" name="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

