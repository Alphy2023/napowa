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
  Heart,
  Calendar,
  Trash,
  Eye,
  Edit,
  Plus,
  Download,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample volunteers data
const volunteers = [
  {
    id: "1",
    firstName: "Jane",
    lastName: "Muthoni",
    email: "jane.muthoni@example.com",
    phone: "+254 712 345 678",
    location: "Nairobi",
    status: "active",
    skills: ["Event Planning", "Fundraising", "Community Outreach"],
    availability: "Weekends",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Jane is a dedicated volunteer with a background in community organizing and event planning.",
    hours: 120,
    programs: ["Education Scholarship Program", "Health and Wellness Initiative"],
  },
  {
    id: "2",
    firstName: "Mary",
    lastName: "Akinyi",
    email: "mary.akinyi@example.com",
    phone: "+254 723 456 789",
    location: "Mombasa",
    status: "active",
    skills: ["Teaching", "Counseling", "First Aid"],
    availability: "Evenings",
    joinDate: "2023-02-20",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Mary is a teacher by profession and volunteers her time to teach children of police officers.",
    hours: 85,
    programs: ["Youth Mentorship Program", "Education Scholarship Program"],
  },
  {
    id: "3",
    firstName: "Sarah",
    lastName: "Wanjiku",
    email: "sarah.wanjiku@example.com",
    phone: "+254 734 567 890",
    location: "Kisumu",
    status: "inactive",
    skills: ["Nursing", "Health Education", "Counseling"],
    availability: "Weekdays",
    joinDate: "2023-03-10",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Sarah is a nurse who volunteers her time to provide health education and basic health services.",
    hours: 65,
    programs: ["Health and Wellness Initiative"],
  },
  {
    id: "4",
    firstName: "Grace",
    lastName: "Otieno",
    email: "grace.otieno@example.com",
    phone: "+254 745 678 901",
    location: "Nakuru",
    status: "active",
    skills: ["Accounting", "Financial Planning", "Budgeting"],
    availability: "Flexible",
    joinDate: "2023-04-05",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Grace is an accountant who volunteers her time to provide financial literacy training.",
    hours: 50,
    programs: ["Financial Literacy Program"],
  },
  {
    id: "5",
    firstName: "Faith",
    lastName: "Kamau",
    email: "faith.kamau@example.com",
    phone: "+254 756 789 012",
    location: "Eldoret",
    status: "active",
    skills: ["Counseling", "Grief Support", "Social Work"],
    availability: "Weekends",
    joinDate: "2023-02-15",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Faith is a social worker who provides counseling and support to widows of police officers.",
    hours: 110,
    programs: ["Widows Support Program"],
  },
  {
    id: "6",
    firstName: "Hope",
    lastName: "Njeri",
    email: "hope.njeri@example.com",
    phone: "+254 767 890 123",
    location: "Thika",
    status: "active",
    skills: ["Event Planning", "Public Relations", "Marketing"],
    availability: "Evenings and Weekends",
    joinDate: "2023-05-20",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Hope is a marketing professional who helps with event planning and public relations.",
    hours: 45,
    programs: ["Community Outreach Program"],
  },
  {
    id: "7",
    firstName: "Charity",
    lastName: "Odhiambo",
    email: "charity.odhiambo@example.com",
    phone: "+254 778 901 234",
    location: "Nairobi",
    status: "active",
    skills: ["Teaching", "Mentoring", "Career Guidance"],
    availability: "Weekends",
    joinDate: "2023-03-25",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Charity is a teacher who provides mentoring and career guidance to youth from police families.",
    hours: 75,
    programs: ["Youth Mentorship Program"],
  },
  {
    id: "8",
    firstName: "Mercy",
    lastName: "Nyambura",
    email: "mercy.nyambura@example.com",
    phone: "+254 789 012 345",
    location: "Kisumu",
    status: "inactive",
    skills: ["Fundraising", "Grant Writing", "Project Management"],
    availability: "Flexible",
    joinDate: "2023-01-30",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Mercy is a project manager who helps with fundraising and grant writing.",
    hours: 90,
    programs: ["Education Scholarship Program", "Housing Support Initiative"],
  },
]

export default function VolunteersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [skillFilter, setSkillFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter volunteers based on search term and filters
  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSkill = skillFilter === "all" || volunteer.skills.includes(skillFilter)
    const matchesStatus = statusFilter === "all" || volunteer.status === statusFilter

    return matchesSearch && matchesSkill && matchesStatus
  })

  const handleDeleteVolunteer = (id: string) => {
    toast({
      title: "Volunteer deleted",
      description: "The volunteer has been deleted successfully.",
    })
  }

  const handleToggleStatus = (id: string, status: string) => {
    toast({
      title: status === "active" ? "Volunteer deactivated" : "Volunteer activated",
      description: `The volunteer has been ${status === "active" ? "deactivated" : "activated"} successfully.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get all unique skills from volunteers
  const allSkills = Array.from(new Set(volunteers.flatMap((volunteer) => volunteer.skills)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Volunteers</h2>
          <p className="text-muted-foreground">Manage volunteers and their assignments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/volunteers/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Volunteer
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
          <CardTitle>All Volunteers</CardTitle>
          <CardDescription>View and manage all volunteers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search volunteers..."
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
                          <p className="text-sm font-medium">Skill</p>
                          <Select value={skillFilter} onValueChange={setSkillFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select skill" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Skills</SelectItem>
                              {allSkills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
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
                <TabsTrigger value="all">All Volunteers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredVolunteers.map((volunteer, index) => (
                      <motion.div
                        key={volunteer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col items-center p-6">
                              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                                <Image
                                  src={volunteer.avatar || "/placeholder.svg"}
                                  alt={`${volunteer.firstName} ${volunteer.lastName}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h3 className="mt-4 text-center text-lg font-semibold">
                                {volunteer.firstName} {volunteer.lastName}
                              </h3>
                              <Badge variant={volunteer.status === "active" ? "default" : "secondary"} className="mt-2">
                                {volunteer.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                              <div className="mt-3 flex flex-wrap justify-center gap-1">
                                {volunteer.skills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2 border-t bg-muted/50 p-4">
                              <div className="flex items-center text-sm">
                                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{volunteer.email}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{volunteer.phone}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{volunteer.location}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{volunteer.availability}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">Joined {formatDate(volunteer.joinDate)}</span>
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/volunteers/${volunteer.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteVolunteer(volunteer.id)}
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
                          <TableHead>Volunteer</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Skills</TableHead>
                          <TableHead>Availability</TableHead>
                          <TableHead>Hours</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredVolunteers.map((volunteer) => (
                          <TableRow key={volunteer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                  <Image
                                    src={volunteer.avatar || "/placeholder.svg"}
                                    alt={`${volunteer.firstName} ${volunteer.lastName}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {volunteer.firstName} {volunteer.lastName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">{volunteer.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{volunteer.location}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {volunteer.skills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{volunteer.availability}</TableCell>
                            <TableCell>{volunteer.hours} hrs</TableCell>
                            <TableCell>
                              <Badge variant={volunteer.status === "active" ? "default" : "secondary"}>
                                {volunteer.status === "active" ? "Active" : "Inactive"}
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
                                    <Link href={`/dashboard/volunteers/${volunteer.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/volunteers/${volunteer.id}/edit`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleStatus(volunteer.id, volunteer.status)}>
                                    <Heart className="mr-2 h-4 w-4" />
                                    {volunteer.status === "active" ? "Deactivate" : "Activate"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteVolunteer(volunteer.id)}
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
