"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarDays, Plus, Search, Filter, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Sample events data
const events = [
  {
    id: "1",
    title: "Woman of Purpose Annual Event",
    slug: "woman-of-purpose-annual-event-2023",
    description:
      "Our flagship annual event focused on empowering police wives and widows with life skills and inspiration.",
    category: "Conference",
    location: "Nairobi International Convention Center",
    startDate: "2023-08-15T09:00:00Z",
    endDate: "2023-08-17T17:00:00Z",
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=400&width=600",
    capacity: 300,
    registrations: 175,
    organizer: "NAPOWA Central Committee",
    createdAt: "2023-04-10T08:15:00Z",
    updatedAt: "2023-05-14T14:20:00Z",
  },
  {
    id: "2",
    title: "Skills Development Workshop: Soap Making",
    slug: "skills-development-workshop-soap-making",
    description: "Learn to make various types of soaps using locally available materials.",
    category: "Workshop",
    location: "NAPOWA Nairobi Office",
    startDate: "2023-06-15T10:00:00Z",
    endDate: "2023-06-15T16:00:00Z",
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=400&width=600",
    capacity: 30,
    registrations: 25,
    organizer: "Skills Development Team",
    createdAt: "2023-05-01T09:30:00Z",
    updatedAt: "2023-05-10T11:45:00Z",
  },
  {
    id: "3",
    title: "Health Screening Day",
    slug: "health-screening-day-2023",
    description: "Free health screenings including breast cancer, cervical cancer, and general health checks.",
    category: "Health",
    location: "NAPOWA Mombasa Office",
    startDate: "2023-06-20T08:00:00Z",
    endDate: "2023-06-20T16:00:00Z",
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=400&width=600",
    capacity: 100,
    registrations: 65,
    organizer: "Health Advocacy Team",
    createdAt: "2023-05-05T10:15:00Z",
    updatedAt: "2023-05-12T13:20:00Z",
  },
  {
    id: "4",
    title: "Financial Literacy Seminar",
    slug: "financial-literacy-seminar",
    description: "Learn essential financial skills including budgeting, saving, and investing.",
    category: "Seminar",
    location: "NAPOWA Kisumu Office",
    startDate: "2023-07-10T13:00:00Z",
    endDate: "2023-07-10T17:00:00Z",
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=400&width=600",
    capacity: 50,
    registrations: 30,
    organizer: "Financial Literacy Team",
    createdAt: "2023-05-08T11:30:00Z",
    updatedAt: "2023-05-15T09:45:00Z",
  },
  {
    id: "5",
    title: "Widows Support Group Meeting",
    slug: "widows-support-group-meeting",
    description: "Monthly support group for police widows to connect, share experiences, and receive support.",
    category: "Support Group",
    location: "NAPOWA Eldoret Office",
    startDate: "2023-07-25T14:00:00Z",
    endDate: "2023-07-25T16:00:00Z",
    status: "upcoming",
    featuredImage: "/placeholder.svg?height=400&width=600",
    capacity: 20,
    registrations: 12,
    organizer: "Widows Support Team",
    createdAt: "2023-05-12T13:45:00Z",
    updatedAt: "2023-05-16T10:30:00Z",
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [filteredEvents, setFilteredEvents] = useState(events)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = [...events]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => event.status === statusFilter)
    }

    setFilteredEvents(filtered)
  }, [searchQuery, statusFilter])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Events Management</h1>
        <Link href="/dashboard/events/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center space-x-2 md:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>Manage your events, registrations, and schedules</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registrations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <img
                            src={event.featuredImage || "/placeholder.svg"}
                            alt={event.title}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs text-muted-foreground">{event.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{format(new Date(event.startDate), "MMM d, yyyy")}</span>
                        </div>
                      </TableCell>
                      <TableCell>{event.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            event.status === "upcoming"
                              ? "default"
                              : event.status === "ongoing"
                                ? "secondary"
                                : event.status === "completed"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span>{event.registrations}</span>
                          <span className="text-muted-foreground">/</span>
                          <span>{event.capacity}</span>
                        </div>
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
                            <Link href={`/dashboard/events/${event.id}`}>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                            </Link>
                            <Link href={`/dashboard/events/${event.id}/edit`}>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
                            <Link href={`/events/${event.slug}`} target="_blank">
                              <DropdownMenuItem>View Public Page</DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No events found. Try adjusting your filters or create a new event.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
