"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formatDate } from "@/lib/utils"

// Sample data for registrations
const registrationsData = Array.from({ length: 50 }, (_, i) => ({
  id: `REG-${1234 + i}`,
  customer: {
    name: [
      "Olivia Chen",
      "James Wilson",
      "Emma Thompson",
      "David Garcia",
      "Sophia Martinez",
      "Michael Brown",
      "Isabella Lopez",
      "Daniel Lee",
      "Charlotte Davis",
      "Matthew Taylor",
      "Amelia Rodriguez",
      "Ethan Nguyen",
      "Emily White",
      "Benjamin Kim",
      "Abigail Turner",
      "Alexander Smith",
    ][Math.floor(Math.random() * 16)],
    email: `customer${1234 + i}@example.com`,
    avatar: ["O", "J", "E", "D", "S", "M", "I", "D", "C", "M", "A", "E", "B", "A", "A", "S"][
      Math.floor(Math.random() * 16)
    ],
  },
  product: [
    'Smart TV 55"',
    "Refrigerator Pro",
    "Washing Machine X7",
    "Coffee Maker Deluxe",
    "Blender Professional",
    "Premium Laptop X1",
    "Wireless Headphones",
    "Smart Watch Pro",
    "Air Purifier Max",
    "Robot Vacuum Cleaner",
    "Gaming Console XS",
    "Smartphone Ultra",
    "Bluetooth Speaker",
    "Digital Camera Pro",
    "Electric Toothbrush",
  ][Math.floor(Math.random() * 15)],
  serialNumber: `${["STV", "RPF", "WMX", "CMD", "BLP", "LPX", "WHP", "SWP", "APM", "RVC", "GXS", "SPU", "BSP", "DCP", "ELT"][Math.floor(Math.random() * 15)]}-${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 10000)}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  status: Math.random() > 0.1 ? "Active" : Math.random() > 0.5 ? "Pending" : "Issue",
}))

export default function RegistrationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("date_desc")
  const itemsPerPage = 10

  // Filter and sort registrations
  const filteredRegistrations = registrationsData
    .filter(
      (reg) =>
        (searchQuery === "" ||
          reg.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reg.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reg.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === "all" || reg.status.toLowerCase() === statusFilter.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "date_asc") return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (sortBy === "date_desc") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "name_asc") return a.customer.name.localeCompare(b.customer.name)
      if (sortBy === "name_desc") return b.customer.name.localeCompare(a.customer.name)
      return 0
    })

  const pageCount = Math.ceil(filteredRegistrations.length / itemsPerPage)
  const paginatedRegistrations = filteredRegistrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Product Registrations"
        text="View and manage all product registrations from your customers."
      >
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>All Registrations</CardTitle>
          <CardDescription>{filteredRegistrations.length} registrations found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer, product, or serial number..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="issue">Issue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date_desc">Newest First</SelectItem>
                  <SelectItem value="date_asc">Oldest First</SelectItem>
                  <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedRegistrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No registrations found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${registration.customer.avatar}`}
                              alt={registration.customer.name}
                            />
                            <AvatarFallback>{registration.customer.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-0.5">
                            <p className="text-sm font-medium">{registration.customer.name}</p>
                            <p className="text-xs text-muted-foreground">{registration.customer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{registration.product}</TableCell>
                      <TableCell className="font-mono text-sm">{registration.serialNumber}</TableCell>
                      <TableCell>{formatDate(registration.date)}</TableCell>
                      <TableCell>
                        <div className="flex w-[80px] items-center">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              registration.status === "Active"
                                ? "bg-green-500"
                                : registration.status === "Pending"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="ml-2 text-xs font-medium">{registration.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/registrations/${registration.id}`}>View Details</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {pageCount > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                    let pageNum = i + 1

                    // If we have more than 5 pages and we're not on the first page
                    if (pageCount > 5 && currentPage > 3) {
                      pageNum = currentPage - 3 + i

                      // Don't go beyond the last page
                      if (pageNum > pageCount) {
                        pageNum = pageCount - (4 - i)
                      }
                    }

                    // Only show pages that exist
                    if (pageNum <= pageCount) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink isActive={currentPage === pageNum} onClick={() => setCurrentPage(pageNum)}>
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    }

                    return null
                  })}

                  {pageCount > 5 && currentPage < pageCount - 2 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink onClick={() => setCurrentPage(pageCount)}>{pageCount}</PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                      disabled={currentPage === pageCount}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

