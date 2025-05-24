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
  Award,
  Trash,
  Eye,
  Edit,
  Plus,
  Download,
  Users,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample programs data
const programs = [
  {
    id: "1",
    title: "Education Scholarship Program",
    image: "/placeholder.svg?height=400&width=600",
    category: "Education",
    coordinator: "Jane Muthoni",
    startDate: "2023-01-15",
    endDate: "2023-12-31",
    status: "active",
    participants: 120,
    budget: 2500000,
    description:
      "Scholarship program for children of police officers to support their education from primary to university level.",
    objectives: [
      "Provide financial support for education",
      "Improve academic performance",
      "Increase access to quality education",
    ],
    outcomes: [
      "120 students supported",
      "85% improvement in academic performance",
      "15 students admitted to university",
    ],
  },
  {
    id: "2",
    title: "Health and Wellness Initiative",
    image: "/placeholder.svg?height=400&width=600",
    category: "Health",
    coordinator: "Mary Akinyi",
    startDate: "2023-02-10",
    endDate: "2023-11-30",
    status: "active",
    participants: 350,
    budget: 1800000,
    description:
      "Comprehensive health and wellness program for police officers and their families, including regular health screenings and wellness workshops.",
    objectives: ["Improve access to healthcare", "Promote preventive healthcare", "Enhance mental health awareness"],
    outcomes: [
      "350 health screenings conducted",
      "25 wellness workshops held",
      "30% increase in preventive healthcare awareness",
    ],
  },
  {
    id: "3",
    title: "Skills Development Workshop",
    image: "/placeholder.svg?height=400&width=600",
    category: "Skills",
    coordinator: "Sarah Wanjiku",
    startDate: "2023-03-05",
    endDate: "2023-09-30",
    status: "active",
    participants: 85,
    budget: 1200000,
    description:
      "Vocational skills training program for police spouses to enhance their economic empowerment and self-reliance.",
    objectives: ["Develop vocational skills", "Promote entrepreneurship", "Enhance economic empowerment"],
    outcomes: ["85 participants trained", "40 small businesses started", "65% increase in household income"],
  },
  {
    id: "4",
    title: "Widows Support Program",
    image: "/placeholder.svg?height=400&width=600",
    category: "Support",
    coordinator: "Grace Otieno",
    startDate: "2023-01-20",
    endDate: "2023-12-15",
    status: "active",
    participants: 45,
    budget: 1500000,
    description:
      "Comprehensive support program for widows of police officers, including counseling, financial assistance, and skills training.",
    objectives: ["Provide emotional support", "Offer financial assistance", "Develop income-generating skills"],
    outcomes: ["45 widows supported", "Monthly support group meetings held", "30 widows trained in business skills"],
  },
  {
    id: "5",
    title: "Youth Mentorship Program",
    image: "/placeholder.svg?height=400&width=600",
    category: "Youth",
    coordinator: "Faith Kamau",
    startDate: "2023-04-10",
    endDate: "2023-10-31",
    status: "active",
    participants: 60,
    budget: 900000,
    description:
      "Mentorship program for youth from police families, focusing on career guidance, leadership development, and life skills.",
    objectives: ["Provide career guidance", "Develop leadership skills", "Enhance life skills"],
    outcomes: ["60 youth mentored", "12 career workshops conducted", "85% positive feedback from participants"],
  },
  {
    id: "6",
    title: "Financial Literacy Program",
    image: "/placeholder.svg?height=400&width=600",
    category: "Finance",
    coordinator: "Hope Njeri",
    startDate: "2023-05-15",
    endDate: "2023-11-15",
    status: "inactive",
    participants: 0,
    budget: 800000,
    description:
      "Financial literacy program for police officers and their spouses, focusing on budgeting, saving, and investment.",
    objectives: ["Improve financial management skills", "Promote saving culture", "Enhance investment knowledge"],
    outcomes: ["Program yet to start", "Materials developed", "Trainers identified"],
  },
  {
    id: "7",
    title: "Community Outreach Program",
    image: "/placeholder.svg?height=400&width=600",
    category: "Community",
    coordinator: "Charity Odhiambo",
    startDate: "2023-03-20",
    endDate: "2023-12-20",
    status: "active",
    participants: 200,
    budget: 1300000,
    description:
      "Community outreach program to improve relations between police officers and the communities they serve.",
    objectives: ["Improve police-community relations", "Address community concerns", "Promote community policing"],
    outcomes: ["10 community forums held", "200 community members engaged", "Positive feedback from community leaders"],
  },
  {
    id: "8",
    title: "Housing Support Initiative",
    image: "/placeholder.svg?height=400&width=600",
    category: "Housing",
    coordinator: "Mercy Nyambura",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    status: "upcoming",
    participants: 0,
    budget: 5000000,
    description: "Housing support initiative to improve living conditions for police officers and their families.",
    objectives: ["Improve housing conditions", "Provide housing subsidies", "Support home ownership"],
    outcomes: ["Program yet to start", "Needs assessment completed", "Funding secured"],
  },
]

export default function ProgramsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter programs based on search term and filters
  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.coordinator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || program.category === categoryFilter
    const matchesStatus = statusFilter === "all" || program.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeleteProgram = (id: string) => {
    toast({
      title: "Program deleted",
      description: "The program has been deleted successfully.",
    })
  }

  const handleToggleStatus = (id: string, status: string) => {
    toast({
      title: status === "active" ? "Program deactivated" : "Program activated",
      description: `The program has been ${status === "active" ? "deactivated" : "activated"} successfully.`,
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
      case "active":
        return <Badge variant="default">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Programs</h2>
          <p className="text-muted-foreground">Manage NAPOWA programs and initiatives.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/programs/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Program
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
          <CardTitle>All Programs</CardTitle>
          <CardDescription>View and manage all NAPOWA programs and initiatives.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search programs..."
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
                          <p className="text-sm font-medium">Category</p>
                          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="Education">Education</SelectItem>
                              <SelectItem value="Health">Health</SelectItem>
                              <SelectItem value="Skills">Skills</SelectItem>
                              <SelectItem value="Support">Support</SelectItem>
                              <SelectItem value="Youth">Youth</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Community">Community</SelectItem>
                              <SelectItem value="Housing">Housing</SelectItem>
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
                              <SelectItem value="upcoming">Upcoming</SelectItem>
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
                <TabsTrigger value="all">All Programs</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPrograms.map((program, index) => (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative h-48 w-full">
                              <Image
                                src={program.image || "/placeholder.svg"}
                                alt={program.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute right-2 top-2">{getStatusBadge(program.status)}</div>
                            </div>
                            <div className="p-4">
                              <h3 className="line-clamp-1 text-lg font-semibold">{program.title}</h3>
                              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                <Badge variant="outline">{program.category}</Badge>
                                <span className="ml-2">
                                  {formatDate(program.startDate)} - {formatDate(program.endDate)}
                                </span>
                              </div>
                              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{program.description}</p>
                              <div className="mt-3 flex items-center text-sm">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{program.participants} participants</span>
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/programs/${program.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteProgram(program.id)}
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
                          <TableHead>Program</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Coordinator</TableHead>
                          <TableHead>Date Range</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPrograms.map((program) => (
                          <TableRow key={program.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded">
                                  <Image
                                    src={program.image || "/placeholder.svg"}
                                    alt={program.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{program.title}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">{program.description}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{program.category}</TableCell>
                            <TableCell>{program.coordinator}</TableCell>
                            <TableCell>
                              {formatDate(program.startDate)} - {formatDate(program.endDate)}
                            </TableCell>
                            <TableCell>{program.participants}</TableCell>
                            <TableCell>{getStatusBadge(program.status)}</TableCell>
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
                                    <Link href={`/dashboard/programs/${program.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/programs/${program.id}/edit`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleStatus(program.id, program.status)}>
                                    <Award className="mr-2 h-4 w-4" />
                                    {program.status === "active" ? "Deactivate" : "Activate"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteProgram(program.id)}
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
