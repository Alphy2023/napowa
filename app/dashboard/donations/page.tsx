"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Filter,
  Grid,
  List,
  DollarSign,
  Calendar,
  User,
  Download,
  Trash,
  Eye,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample donation data
const donations = [
  {
    id: "1",
    amount: 5000,
    currency: "KES",
    donor: {
      name: "Jane Muthoni",
      email: "jane.muthoni@example.com",
      phone: "+254 712 345 678",
    },
    campaign: "General Fund",
    paymentMethod: "M-Pesa",
    status: "completed",
    date: "2023-06-15T10:30:00Z",
    notes: "Monthly donation",
  },
  {
    id: "2",
    amount: 10000,
    currency: "KES",
    donor: {
      name: "Mary Akinyi",
      email: "mary.akinyi@example.com",
      phone: "+254 723 456 789",
    },
    campaign: "Widows Support Fund",
    paymentMethod: "Bank Transfer",
    status: "completed",
    date: "2023-06-10T14:45:00Z",
    notes: "Annual donation",
  },
  {
    id: "3",
    amount: 2500,
    currency: "KES",
    donor: {
      name: "Sarah Wanjiku",
      email: "sarah.wanjiku@example.com",
      phone: "+254 734 567 890",
    },
    campaign: "Education Scholarship",
    paymentMethod: "M-Pesa",
    status: "completed",
    date: "2023-06-05T09:15:00Z",
    notes: "One-time donation",
  },
  {
    id: "4",
    amount: 7500,
    currency: "KES",
    donor: {
      name: "Grace Otieno",
      email: "grace.otieno@example.com",
      phone: "+254 745 678 901",
    },
    campaign: "Health Initiative",
    paymentMethod: "Credit Card",
    status: "pending",
    date: "2023-06-18T16:20:00Z",
    notes: "Awaiting confirmation",
  },
  {
    id: "5",
    amount: 15000,
    currency: "KES",
    donor: {
      name: "Faith Kamau",
      email: "faith.kamau@example.com",
      phone: "+254 756 789 012",
    },
    campaign: "General Fund",
    paymentMethod: "Bank Transfer",
    status: "completed",
    date: "2023-06-01T11:30:00Z",
    notes: "Corporate donation",
  },
  {
    id: "6",
    amount: 3000,
    currency: "KES",
    donor: {
      name: "Hope Njeri",
      email: "hope.njeri@example.com",
      phone: "+254 767 890 123",
    },
    campaign: "Widows Support Fund",
    paymentMethod: "M-Pesa",
    status: "failed",
    date: "2023-06-17T13:45:00Z",
    notes: "Payment failed, retry requested",
  },
  {
    id: "7",
    amount: 5000,
    currency: "KES",
    donor: {
      name: "Charity Odhiambo",
      email: "charity.odhiambo@example.com",
      phone: "+254 778 901 234",
    },
    campaign: "Education Scholarship",
    paymentMethod: "M-Pesa",
    status: "completed",
    date: "2023-06-12T10:00:00Z",
    notes: "Monthly donation",
  },
  {
    id: "8",
    amount: 20000,
    currency: "KES",
    donor: {
      name: "Mercy Nyambura",
      email: "mercy.nyambura@example.com",
      phone: "+254 789 012 345",
    },
    campaign: "General Fund",
    paymentMethod: "Bank Transfer",
    status: "completed",
    date: "2023-06-08T15:30:00Z",
    notes: "Annual donation",
  },
]

export default function DonationsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [campaignFilter, setCampaignFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter donations based on search term and filters
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCampaign = campaignFilter === "all" || donation.campaign === campaignFilter
    const matchesStatus = statusFilter === "all" || donation.status === statusFilter

    return matchesSearch && matchesCampaign && matchesStatus
  })

  const handleDeleteDonation = (id: string) => {
    toast({
      title: "Donation deleted",
      description: "The donation record has been deleted successfully.",
    })
  }

  const handleExportDonations = () => {
    toast({
      title: "Export started",
      description: "The donation list is being exported to CSV.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Donations</h2>
          <p className="text-muted-foreground">Manage donation records and campaigns.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/donations/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Donation
            </Link>
          </Button>
          <Button variant="outline" onClick={handleExportDonations}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Records</CardTitle>
          <CardDescription>View and manage all donations received.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search donations..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60">
                    <div className="p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Campaign</p>
                          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select campaign" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Campaigns</SelectItem>
                              <SelectItem value="General Fund">General Fund</SelectItem>
                              <SelectItem value="Widows Support Fund">Widows Support Fund</SelectItem>
                              <SelectItem value="Education Scholarship">Education Scholarship</SelectItem>
                              <SelectItem value="Health Initiative">Health Initiative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Status</p>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center rounded-md border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none rounded-l-md ${viewMode === "grid" ? "bg-muted" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none rounded-r-md ${viewMode === "list" ? "bg-muted" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Donations</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredDonations.map((donation, index) => (
                      <motion.div
                        key={donation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col items-center p-6">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <DollarSign className="h-6 w-6 text-primary" />
                              </div>
                              <h3 className="mt-4 text-lg font-semibold">
                                {donation.currency} {donation.amount.toLocaleString()}
                              </h3>
                              {getStatusBadge(donation.status)}
                              <p className="mt-1 text-sm text-muted-foreground">{donation.campaign}</p>
                            </div>
                            <div className="space-y-2 border-t bg-muted/50 p-4">
                              <div className="flex items-center text-sm">
                                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{donation.donor.name}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{formatDate(donation.date)}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{donation.paymentMethod}</span>
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/donations/${donation.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteDonation(donation.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Amount</TableHead>
                          <TableHead>Donor</TableHead>
                          <TableHead>Campaign</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDonations.map((donation) => (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">
                              {donation.currency} {donation.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p>{donation.donor.name}</p>
                                <p className="text-xs text-muted-foreground">{donation.donor.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{donation.campaign}</TableCell>
                            <TableCell>{donation.paymentMethod}</TableCell>
                            <TableCell>{formatDate(donation.date)}</TableCell>
                            <TableCell>{getStatusBadge(donation.status)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/donations/${donation.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteDonation(donation.id)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              {/* Other tab contents would follow a similar structure */}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
