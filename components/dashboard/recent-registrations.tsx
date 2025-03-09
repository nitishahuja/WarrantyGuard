import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"

const registrations = [
  {
    id: "REG-1234",
    customer: {
      name: "Olivia Chen",
      email: "olivia@example.com",
      avatar: "O",
    },
    product: 'Smart TV 55"',
    serialNumber: "STV55-789456",
    date: "2023-03-05",
    status: "Active",
  },
  {
    id: "REG-1235",
    customer: {
      name: "James Wilson",
      email: "james@example.com",
      avatar: "J",
    },
    product: "Refrigerator Pro",
    serialNumber: "RPF-123789",
    date: "2023-03-04",
    status: "Active",
  },
  {
    id: "REG-1236",
    customer: {
      name: "Emma Thompson",
      email: "emma@example.com",
      avatar: "E",
    },
    product: "Washing Machine X7",
    serialNumber: "WMX7-456789",
    date: "2023-03-03",
    status: "Active",
  },
  {
    id: "REG-1237",
    customer: {
      name: "David Garcia",
      email: "david@example.com",
      avatar: "D",
    },
    product: "Coffee Maker Deluxe",
    serialNumber: "CMD-789123",
    date: "2023-03-02",
    status: "Active",
  },
  {
    id: "REG-1238",
    customer: {
      name: "Sophia Martinez",
      email: "sophia@example.com",
      avatar: "S",
    },
    product: "Blender Professional",
    serialNumber: "BLP-456123",
    date: "2023-03-01",
    status: "Active",
  },
]

export function RecentRegistrations() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => (
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
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs font-medium">{registration.status}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

