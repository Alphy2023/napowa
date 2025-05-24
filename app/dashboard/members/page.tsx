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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Filter,
  Grid,
  List,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  Trash,
  Pencil,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample member data
const members = [
  {
    id: "1",
    name: "Jane Muthoni",
    email: "jane.muthoni@example.com",
    phone: "+254 712 345 678",
    location: "Nairobi",
    status: "active",
    role: "Member",
    joinDate: "2022-03-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Mary Akinyi",
    email: "mary.akinyi@example.com",
    phone: "+254 723 456 789",
    location: "Kisumu",
    status: "active",
    role: "Member",
    joinDate: "2021-07-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Sarah Wanjiku",
    email: "sarah.wanjiku@example.com",
    phone: "+254 734 567 890",
    location: "Mombasa",
    status: "active",
    role: "Member",
    joinDate: "2022-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Grace Otieno",
    email: "grace.otieno@example.com",
    phone: "+254 745 678 901",
    location: "Nakuru",
    status: "inactive",
    role: "Member",
    joinDate: "2021-05-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Faith Kamau",
    email: "faith.kamau@example.com",
    phone: "+254 756 789 012",
    location: "Eldoret",
    status: "active",
    role: "Volunteer",
    joinDate: "2022-02-28",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Hope Njeri",
    email: "hope.njeri@example.com",
    phone: "+254 767 890 123",
    location: "Nairobi",
    status: "active",
    role: "Widow",
    joinDate: "2021-11-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "Charity Odhiambo",
    email: "charity.odhiambo@example.com",
    phone: "+254 778 901 234",
    location: "Kisumu",
    status: "inactive",
    role: "Member",
    joinDate: "2021-09-14",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Mercy Nyambura",
    email: "mercy.nyambura@example.com",
    phone: "+254 789 012 345",
    location: "Mombasa",
    status: "active",
    role: "Member",
    joinDate: "2022-04-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function MembersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter members based on search term and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesLocation = locationFilter === "all" || member.location === locationFilter

    return matchesSearch && matchesStatus && matchesRole && matchesLocation
  })

  const handleDeleteMember = (id: string) => {
    toast({
      title: "Member deleted",
      description: "The member has been deleted successfully.",
    })
  }

  const handleExportMembers = () => {
    toast({
      title: "Export started",
      description: "The member list is being exported to CSV.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Members</h2>
          <p className="text-muted-foreground">Manage NAPOWA members, volunteers, and widows.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/members/add">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Link>
          </Button>
          <Button variant="outline" onClick={handleExportMembers}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>View and manage all NAPOWA members.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
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
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Role</p>
                          <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Roles</SelectItem>
                              <SelectItem value="Member">Member</SelectItem>
                              <SelectItem value="Volunteer">Volunteer</SelectItem>
                              <SelectItem value="Widow">Widow</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Location</p>
                          <Select value={locationFilter} onValueChange={setLocationFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Locations</SelectItem>
                              <SelectItem value="Nairobi">Nairobi</SelectItem>
                              <SelectItem value="Mombasa">Mombasa</SelectItem>
                              <SelectItem value="Kisumu">Kisumu</SelectItem>
                              <SelectItem value="Nakuru">Nakuru</SelectItem>
                              <SelectItem value="Eldoret">Eldoret</SelectItem>
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
                <TabsTrigger value="all">All Members</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col items-center p-6">
                              <Avatar className="h-20 w-20">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                              <Badge variant={member.status === "active" ? "default" : "secondary"} className="mt-2">
                                {member.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                            </div>
                            <div className="space-y-2 border-t bg-muted/50 p-4">
                              <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{member.email}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{member.phone}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{member.location}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/members/${member.id}`}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteMember(member.id)}
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
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.phone}</TableCell>
                            <TableCell>{member.location}</TableCell>
                            <TableCell>
                              <Badge variant={member.status === "active" ? "default" : "secondary"}>
                                {member.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
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
                                    <Link href={`/dashboard/members/${member.id}`}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteMember(member.id)}
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
              <TabsContent value="active" className="mt-4">
                {/* Active members content - similar structure as above but filtered */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredMembers
                      .filter((member) => member.status === "active")
                      .map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          {/* Same card as above */}
                          <Card className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col items-center p-6">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                                <Badge variant="default" className="mt-2">
                                  Active
                                </Badge>
                                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                              </div>
                              <div className="space-y-2 border-t bg-muted/50 p-4">
                                <div className="flex items-center text-sm">
                                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">{member.email}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">{member.phone}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">{member.location}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">
                                    Joined {new Date(member.joinDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex border-t p-2">
                                <Button variant="ghost" size="sm" className="flex-1" asChild>
                                  <Link href={`/dashboard/members/${member.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex-1 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteMember(member.id)}
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
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers
                          .filter((member) => member.status === "active")
                          .map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span>{member.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{member.email}</TableCell>
                              <TableCell>{member.phone}</TableCell>
                              <TableCell>{member.location}</TableCell>
                              <TableCell>
                                <Badge variant="default">Active</Badge>
                              </TableCell>
                              <TableCell>{member.role}</TableCell>
                              <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
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
                                      <Link href={`/dashboard/members/${member.id}`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteMember(member.id)}
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
              <TabsContent value="inactive" className="mt-4">
                {/* Inactive members content - similar structure as above but filtered */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredMembers
                      .filter((member) => member.status === "inactive")
                      .map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          {/* Same card as above */}
                          <Card className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="flex flex-col items-center p-6">
                                <Avatar className="h-20 w-20">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                                <Badge variant="secondary" className="mt-2">
                                  Inactive
                                </Badge>
                                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                              </div>
                              <div className="space-y-2 border-t bg-muted/50 p-4">
                                <div className="flex items-center text-sm">
                                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">{member.email}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">{member.phone}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">{member.location}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">
                                    Joined {new Date(member.joinDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <div className="flex border-t p-2">
                                <Button variant="ghost" size="sm" className="flex-1" asChild>
                                  <Link href={`/dashboard/members/${member.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex-1 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteMember(member.id)}
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
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredMembers
                          .filter((member) => member.status === "inactive")
                          .map((member) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span>{member.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{member.email}</TableCell>
                              <TableCell>{member.phone}</TableCell>
                              <TableCell>{member.location}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">Inactive</Badge>
                              </TableCell>
                              <TableCell>{member.role}</TableCell>
                              <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
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
                                      <Link href={`/dashboard/members/${member.id}`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteMember(member.id)}
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
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
