"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
  Briefcase,
  Calendar,
  User,
  Trash,
  Eye,
  Edit,
  Plus,
  Download,
  Mail,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample partners data
const partners = [
  {
    id: "1",
    name: "Kenya Police Service",
    logo: "/placeholder.svg?height=80&width=80",
    type: "Government",
    contactPerson: "John Kamau",
    email: "john.kamau@police.go.ke",
    phone: "+254 712 345 678",
    location: "Nairobi",
    website: "https://police.go.ke",
    partnershipStart: "2018-01-15",
    status: "active",
    description: "Official partnership with the Kenya Police Service to support welfare programs for police families.",
    contributions: [
      { type: "Financial", amount: "KES 2,000,000", date: "2023-01-15" },
      { type: "Resources", amount: "Office Space", date: "2023-02-10" },
    ],
  },
  {
    id: "2",
    name: "Safaricom Foundation",
    logo: "/placeholder.svg?height=80&width=80",
    type: "Corporate",
    contactPerson: "Mary Wambui",
    email: "mary.wambui@safaricom.co.ke",
    phone: "+254 723 456 789",
    location: "Nairobi",
    website: "https://safaricomfoundation.org",
    partnershipStart: "2019-03-22",
    status: "active",
    description:
      "Partnership with Safaricom Foundation to support education initiatives for children of police officers.",
    contributions: [
      { type: "Financial", amount: "KES 5,000,000", date: "2023-03-15" },
      { type: "Services", amount: "Communication Support", date: "2023-04-10" },
    ],
  },
  {
    id: "3",
    name: "Equity Bank Foundation",
    logo: "/placeholder.svg?height=80&width=80",
    type: "Corporate",
    contactPerson: "James Mwangi",
    email: "james.mwangi@equitybank.co.ke",
    phone: "+254 734 567 890",
    location: "Nairobi",
    website: "https://equitygroupfoundation.com",
    partnershipStart: "2020-05-10",
    status: "active",
    description:
      "Partnership with Equity Bank Foundation to provide financial literacy training and entrepreneurship support.",
    contributions: [
      { type: "Financial", amount: "KES 3,000,000", date: "2023-02-20" },
      { type: "Training", amount: "Financial Literacy Workshops", date: "2023-05-15" },
    ],
  },
  {
    id: "4",
    name: "Ministry of Health",
    logo: "/placeholder.svg?height=80&width=80",
    type: "Government",
    contactPerson: "Sarah Odhiambo",
    email: "sarah.odhiambo@health.go.ke",
    phone: "+254 745 678 901",
    location: "Nairobi",
    website: "https://health.go.ke",
    partnershipStart: "2021-02-15",
    status: "inactive",
    description: "Partnership with the Ministry of Health to provide health services to police families.",
    contributions: [
      { type: "Services", amount: "Health Screenings", date: "2022-11-10" },
      { type: "Resources", amount: "Medical Supplies", date: "2022-12-05" },
    ],
  },
  {
    id: "5",
    name: "USAID Kenya",
    logo: "/placeholder.svg?height=80&width=80",
    type: "NGO",
    contactPerson: "Michael Johnson",
    email: "michael.johnson@usaid.gov",
    phone: "+254 756 789 012",
    location: "Nairobi",
    website: "https://www.usaid.gov/kenya",
    partnershipStart: "2020-08-20",
    status: "active",
    description: "Partnership with USAID Kenya to support community development initiatives.",
    contributions: [
      { type: "Financial", amount: "KES 8,000,000", date: "2023-01-25" },
      { type: "Training", amount: "Capacity Building", date: "2023-03-30" },
    ],
  },
  {
    id: "6",
    name: "Kenya Red Cross",
    logo: "/placeholder.svg?height=80&width=80",
    type: "NGO",
    contactPerson: "Grace Mwende",
    email: "grace.mwende@redcross.or.ke",
    phone: "+254 767 890 123",
    location: "Nairobi",
    website: "https://www.redcross.or.ke",
    partnershipStart: "2019-11-05",
    status: "active",
    description: "Partnership with Kenya Red Cross for emergency response training and support.",
    contributions: [
      { type: "Training", amount: "First Aid Training", date: "2023-04-20" },
      { type: "Resources", amount: "Emergency Kits", date: "2023-05-25" },
    ],
  },
  {
    id: "7",
    name: "Cooperative Bank Foundation",
    logo: "/placeholder.svg?height=80&width=80",
    type: "Corporate",
    contactPerson: "Peter Kariuki",
    email: "peter.kariuki@co-opbank.co.ke",
    phone: "+254 778 901 234",
    location: "Nairobi",
    website: "https://foundation.co-opbank.co.ke",
    partnershipStart: "2021-06-15",
    status: "active",
    description: "Partnership with Cooperative Bank Foundation to support scholarship programs.",
    contributions: [
      { type: "Financial", amount: "KES 4,000,000", date: "2023-02-10" },
      { type: "Services", amount: "Financial Advisory", date: "2023-04-15" },
    ],
  },
  {
    id: "8",
    name: "UN Women Kenya",
    logo: "/placeholder.svg?height=80&width=80",
    type: "NGO",
    contactPerson: "Elizabeth Nyawira",
    email: "elizabeth.nyawira@unwomen.org",
    phone: "+254 789 012 345",
    location: "Nairobi",
    website: "https://www.unwomen.org/en/where-we-are/africa/kenya",
    partnershipStart: "2020-03-08",
    status: "inactive",
    description: "Partnership with UN Women Kenya to support gender equality initiatives.",
    contributions: [
      { type: "Financial", amount: "KES 6,000,000", date: "2022-09-15" },
      { type: "Training", amount: "Gender Equality Workshops", date: "2022-10-20" },
    ],
  },
]

export default function PartnersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter partners based on search term and filters
  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || partner.type === typeFilter
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleDeletePartner = (id: string) => {
    toast({
      title: "Partner deleted",
      description: "The partner has been deleted successfully.",
    })
  }

  const handleToggleStatus = (id: string, status: string) => {
    toast({
      title: status === "active" ? "Partner deactivated" : "Partner activated",
      description: `The partner has been ${status === "active" ? "deactivated" : "activated"} successfully.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Partners</h2>
          <p className="text-muted-foreground">Manage partnerships and collaborations.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/partners/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Partner
            </Link>
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Partners</CardTitle>
          <CardDescription>View and manage all partnerships and collaborations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search partners..."
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
                          <p className="text-sm font-medium">Partner Type</p>
                          <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="Government">Government</SelectItem>
                              <SelectItem value="Corporate">Corporate</SelectItem>
                              <SelectItem value="NGO">NGO</SelectItem>
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
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
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
                <TabsTrigger value="all">All Partners</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPartners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col items-center p-6">
                              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                                <Image
                                  src={partner.logo || "/placeholder.svg"}
                                  alt={partner.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h3 className="mt-4 text-center text-lg font-semibold">{partner.name}</h3>
                              <Badge variant={partner.status === "active" ? "default" : "secondary"} className="mt-2">
                                {partner.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                              <p className="mt-2 text-center text-xs text-muted-foreground">{partner.type}</p>
                            </div>
                            <div className="space-y-2 border-t bg-muted/50 p-4">
                              <div className="flex items-center text-sm">
                                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{partner.contactPerson}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{partner.email}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">Since {formatDate(partner.partnershipStart)}</span>
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/partners/${partner.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeletePartner(partner.id)}
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
                          <TableHead>Partner</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Contact Person</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Partnership Since</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPartners.map((partner) => (
                          <TableRow key={partner.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                  <Image
                                    src={partner.logo || "/placeholder.svg"}
                                    alt={partner.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{partner.name}</p>
                                  <p className="text-xs text-muted-foreground">{partner.website}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{partner.type}</TableCell>
                            <TableCell>
                              <div>
                                <p>{partner.contactPerson}</p>
                                <p className="text-xs text-muted-foreground">{partner.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{partner.location}</TableCell>
                            <TableCell>{formatDate(partner.partnershipStart)}</TableCell>
                            <TableCell>
                              <Badge variant={partner.status === "active" ? "default" : "secondary"}>
                                {partner.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
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
                                    <Link href={`/dashboard/partners/${partner.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/partners/${partner.id}/edit`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleStatus(partner.id, partner.status)}>
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    {partner.status === "active" ? "Deactivate" : "Activate"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeletePartner(partner.id)}
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
