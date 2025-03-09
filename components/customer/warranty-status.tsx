"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Electronics",
    active: 2,
    expiringSoon: 1,
    expired: 0,
  },
  {
    name: "Appliances",
    active: 1,
    expiringSoon: 0,
    expired: 1,
  },
  {
    name: "Home",
    active: 1,
    expiringSoon: 0,
    expired: 0,
  },
]

export function CustomerWarrantyStatus() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            borderRadius: "var(--radius)",
          }}
          itemStyle={{ color: "var(--foreground)" }}
          labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
        />
        <Bar dataKey="active" name="Active" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expiringSoon" name="Expiring Soon" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expired" name="Expired" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

