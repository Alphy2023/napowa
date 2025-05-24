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
import { Search, MoreHorizontal, Filter, Grid, List, Bell, Calendar, User, Trash, Eye, Edit, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample announcements data
const announcements = [
  {
    id: "1",
    title: "Annual General Meeting 2023",
    content:
      "The Annual General Meeting will be held on July 15, 2023 at the NAPOWA headquarters in Nairobi. All members are encouraged to attend.",
    priority: "high",
    createdBy: "Jane Muthoni",
    createdAt: "2023-06-15T10:30:00Z",
    startDate: "2023-06-15T00:00:00Z",
    endDate: "2023-07-16T00:00:00Z",
    isActive: true,
    targetAudience: "all",
  },
  {
    id: "2",
    title: "New Health Insurance Benefits",
    content:
      "We are pleased to announce new health insurance benefits for all NAPOWA members. Please check your email for details.",
    priority: "normal",
    createdBy: "Mary Akinyi",
    createdAt: "2023-06-10T14:45:00Z",
    startDate: "2023-06-10T00:00:00Z",
    endDate: "2023-07-10T00:00:00Z",
    isActive: true,
    targetAudience: "all",
  },
  {
    id: "3",
    title: "Volunteer Opportunity: Community Outreach",
    content:
      "We are looking for volunteers for our upcoming community outreach program in Mombasa. Please register if you are interested.",
    priority: "normal",
    createdBy: "Sarah Wanjiku",
    createdAt: "2023-06-05T09:15:00Z",
    startDate: "2023-06-05T00:00:00Z",
    endDate: "2023-06-25T00:00:00Z",
    isActive: true,
    targetAudience: "volunteers",
  },
  {
    id: "4",
    title: "Office Closure Notice",
    content: "Please note that the NAPOWA office will be closed on June 20, 2023 for a public holiday.",
    priority: "low",
    createdBy: "Grace Otieno",
    createdAt: "2023-06-18T16:20:00Z",
    startDate: "2023-06-18T00:00:00Z",
    endDate: "2023-06-21T00:00:00Z",
    isActive: true,
    targetAudience: "all",
  },
  {
    id: "5",
    title: "Urgent: System Maintenance",
    content:
      "The NAPOWA member portal will be undergoing maintenance on June 25, 2023 from 10:00 PM to 2:00 AM. Please save your work before this time.",
    priority: "urgent",
    createdBy: "Faith Kamau",
    createdAt: "2023-06-20T11:30:00Z",
    startDate: "2023-06-20T00:00:00Z",
    endDate: "2023-06-26T00:00:00Z",
    isActive: true,
    targetAudience: "all",
  },
  {
    id: "6",
    title: "Widows Support Group Meeting",
    content:
      "The monthly widows support group meeting will be held on June 28, 2023 at 2:00 PM at the NAPOWA headquarters.",
    priority: "normal",
    createdBy: "Hope Njeri",
    createdAt: "2023-06-21T13:45:00Z",
    startDate: "2023-06-21T00:00:00Z",
    endDate: "2023-06-29T00:00:00Z",
    isActive: true,
    targetAudience: "widows",
  },
  {
    id: "7",
    title: "New Committee Members",
    content: "We are pleased to announce the appointment of new committee members for the 2023-2024 term.",
    priority: "normal",
    createdBy: "Charity Odhiambo",
    createdAt: "2023-06-22T10:00:00Z",
    startDate: "2023-06-22T00:00:00Z",
    endDate: "2023-07-22T00:00:00Z",
    isActive: true,
    targetAudience: "all",
  },
  {
    id: "8",
    title: "Scholarship Applications Open",
    content:
      "Applications for the 2023 NAPOWA Scholarship Program are now open. Eligible members can apply until July 15, 2023.",
    priority: "high",
    createdBy: "Mercy Nyambura",
    createdAt: "2023-06-23T15:30:00Z",
    startDate: "2023-06-23T00:00:00Z",
    endDate: "2023-07-16T00:00:00Z",
    isActive: true,
    targetAudience: "all",
  },
]

export default function AnnouncementsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [audienceFilter, setAudienceFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter announcements based on search term and filters
  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.createdBy.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = priorityFilter === "all" || announcement.priority === priorityFilter
    const matchesAudience = audienceFilter === "all" || announcement.targetAudience === audienceFilter

    return matchesSearch && matchesPriority && matchesAudience
  })

  const handleDeleteAnnouncement = (id: string) => {
    toast({
      title: "Announcement deleted",
      description: "The announcement has been deleted successfully.",
    })
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    toast({
      title: isActive ? "Announcement deactivated" : "Announcement activated",
      description: `The announcement has been ${isActive ? "deactivated" : "activated"} successfully.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge variant="default">High</Badge>
      case "normal":
        return <Badge variant="secondary">Normal</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
          <p className="text-muted-foreground">Manage announcements for members.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/announcements/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Announcement
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>View and manage announcements for members.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search announcements..."
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
                          <p className="text-sm font-medium">Priority</p>
                          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Priorities</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Target Audience</p>
                          <Select value={audienceFilter} onValueChange={setAudienceFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Audiences</SelectItem>
                              <SelectItem value="volunteers">Volunteers Only</SelectItem>
                              <SelectItem value="committee">Committee Members Only</SelectItem>
                              <SelectItem value="widows">Widows Only</SelectItem>
                              <SelectItem value="staff">Staff Only</SelectItem>
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
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredAnnouncements.map((announcement, index) => (
                      <motion.div
                        key={announcement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col items-start p-6">
                              <div className="flex w-full items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                  <Bell className="h-5 w-5 text-primary" />
                                </div>
                                {getPriorityBadge(announcement.priority)}
                              </div>
                              <h3 className="mt-4 line-clamp-2 text-lg font-semibold">{announcement.title}</h3>
                              <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{announcement.content}</p>
                            </div>
                            <div className="space-y-2 border-t bg-muted/50 p-4">
                              <div className="flex items-center text-sm">
                                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">{announcement.createdBy}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span className="text-xs">
                                  {formatDate(announcement.startDate)} - {formatDate(announcement.endDate)}
                                </span>
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/announcements/${announcement.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteAnnouncement(announcement.id)}
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
                          <TableHead>Title</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Created By</TableHead>
                          <TableHead>Date Range</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Audience</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAnnouncements.map((announcement) => (
                          <TableRow key={announcement.id}>
                            <TableCell className="font-medium">{announcement.title}</TableCell>
                            <TableCell>{getPriorityBadge(announcement.priority)}</TableCell>
                            <TableCell>{announcement.createdBy}</TableCell>
                            <TableCell>
                              {formatDate(announcement.startDate)} - {formatDate(announcement.endDate)}
                            </TableCell>
                            <TableCell>
                              {announcement.isActive ? (
                                <Badge variant="default">Active</Badge>
                              ) : (
                                <Badge variant="outline">Inactive</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {announcement.targetAudience === "all"
                                  ? "All Members"
                                  : announcement.targetAudience.charAt(0).toUpperCase() +
                                    announcement.targetAudience.slice(1)}
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
                                    <Link href={`/dashboard/announcements/${announcement.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/announcements/${announcement.id}/edit`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleToggleActive(announcement.id, announcement.isActive)}
                                  >
                                    {announcement.isActive ? (
                                      <>
                                        <Bell className="mr-2 h-4 w-4" />
                                        Deactivate
                                      </>
                                    ) : (
                                      <>
                                        <Bell className="mr-2 h-4 w-4" />
                                        Activate
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteAnnouncement(announcement.id)}
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
