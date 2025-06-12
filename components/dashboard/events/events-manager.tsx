"use client"

import React, { useState, useMemo } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import {
  Search,
  Grid3X3,
  List,
  Plus,
  Edit,
  Trash2,
  CalendarDays,
  MapPin,
  Users,
  MoreHorizontal,
  AlertCircle,
  RefreshCw,
  Eye,
  ExternalLink,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEvents } from "@/hooks/useEvents"
import type { ViewMode, EventFilters, PaginationParams, Event } from "@/types/events"
import { EVENT_CATEGORIES, EVENT_STATUSES } from "@/types/events"

// Loading skeletons
const EventCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-48 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </CardContent>
  </Card>
)

const EventListSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

export default function EventsManager() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filters, setFilters] = useState<EventFilters>({
    search: "",
    category: "all",
    status: "all",
    sortBy: "startDate",
    sortOrder: "desc",
  })
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12,
  })

  const { data, loading, error, deleteEvent, refetch } = useEvents(filters, pagination)

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    if (!data?.events) return []
    return data.events
  }, [data?.events])

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleCategoryFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleStatusFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleSortChange = (sortBy: EventFilters["sortBy"]) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }))
  }

  const handleDelete = async (event: Event) => {
    if (confirm(`Are you sure you want to delete the event "${event.title}"?`)) {
      const success = await deleteEvent(event.id)
      if (success) {
        toast({
          title: "Success",
          description: "Event deleted successfully",
        })
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "ongoing":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load events: {error}
            <Button variant="outline" size="sm" className="ml-2" onClick={refetch}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events Management</h1>
          <p className="text-muted-foreground">Manage your events, registrations, and schedules</p>
        </div>

        <Link href="/events/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filters.category} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {EVENT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {EVENT_STATUSES.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.sortBy} onValueChange={(value: EventFilters["sortBy"]) => handleSortChange(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startDate">Start Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="registrations">Registrations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Display */}
      {loading ? (
        viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <EventListSkeleton />
        )
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EventCard event={event} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : viewMode === "list" ? (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EventListItem event={event} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
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
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <img
                              src={event.featuredImage || "/placeholder.svg?height=40&width=40"}
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
                        <TableCell>
                          <Badge variant="outline">{event.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(event.status)}>
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
                              <Link href={`/events/${event.id}`}>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                              </Link>
                              <Link href={`/events/${event.id}/edit`}>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              </Link>
                              <Link href={`/events/${event.slug}`} target="_blank">
                                <DropdownMenuItem>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Public Page
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem onClick={() => handleDelete(event)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {filteredEvents.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                <p className="text-muted-foreground">
                  {filters.search || filters.category !== "all" || filters.status !== "all"
                    ? "Try adjusting your search criteria"
                    : "Create your first event to get started"}
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Pagination */}
      {data && data.total > pagination.limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, data.total)} of {data.total} events
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.ceil(data.total / pagination.limit) }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === Math.ceil(data.total / pagination.limit) ||
                    Math.abs(page - pagination.page) <= 2,
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={pagination.page === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPagination((prev) => ({ ...prev, page }))}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= Math.ceil(data.total / pagination.limit)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Event Card Component
function EventCard({ event, onDelete }: { event: Event; onDelete: (event: Event) => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "ongoing":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={event.featuredImage || "/placeholder.svg?height=200&width=400"}
            alt={event.title}
            className="h-48 w-full object-cover rounded-t-lg"
          />
          <div className="absolute top-2 right-2">
            <Badge variant={getStatusColor(event.status)}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="p-6 pb-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {event.category}
              </Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/events/${event.id}`}>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                </Link>
                <Link href={`/events/${event.id}/edit`}>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                </Link>
                <Link href={`/events/${event.slug}`} target="_blank">
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Public Page
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => onDelete(event)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>{format(new Date(event.startDate), "MMM d, yyyy 'at' h:mm a")}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            <span>
              {event.registrations}/{event.capacity} registered
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex w-full justify-between text-xs text-muted-foreground">
          <span>By {event.organizer}</span>
          <span>Created {format(new Date(event.createdAt), "MMM d, yyyy")}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

// Event List Item Component
function EventListItem({ event, onDelete }: { event: Event; onDelete: (event: Event) => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "ongoing":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={event.featuredImage || "/placeholder.svg?height=64&width=64"}
              alt={event.title}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="space-y-1">
              <h3 className="font-semibold line-clamp-1">{event.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CalendarDays className="mr-1 h-3 w-3" />
                  <span>{format(new Date(event.startDate), "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-3 w-3" />
                  <span>
                    {event.registrations}/{event.capacity}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
                <Badge variant={getStatusColor(event.status)} className="text-xs">
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/events/${event.id}`}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </Link>
              <Link href={`/events/${event.id}/edit`}>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`/events/${event.slug}`} target="_blank">
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Public Page
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => onDelete(event)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}
