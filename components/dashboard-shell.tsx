import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return <div className="flex flex-1 flex-col space-y-8 p-8 pt-6">{children}</div>
}

