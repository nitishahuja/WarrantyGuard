"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "@/components/ui/chart"

const data = [
  {
    name: "Electronics",
    active: 423,
    expired: 142,
    expiringSoon: 85,
  },
  {
    name: "Appliances",
    active: 368,
    expired: 94,
    expiringSoon: 114,
  },
  {
    name: "Furniture",
    active: 253,
    expired: 52,
    expiringSoon: 78,
  },
  {
    name: "Automotive",
    active: 165,
    expired: 36,
    expiringSoon: 42,
  },
  {
    name: "Other",
    active: 75,
    expired: 18,
    expiringSoon: 23,
  },
]

export function WarrantyStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
        <Bar dataKey="active" name="Active" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expired" name="Expired" fill="#ef4444" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expiringSoon" name="Expiring Soon" fill="#f59e0b" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

