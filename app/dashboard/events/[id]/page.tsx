import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarDays, Clock, MapPin, Users, ArrowLeft, Pencil } from "lucide-react"

import { getEventById, getEventRegistrations } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface EventDetailsPageProps {
  params: {
    id: string
  }
}

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  const registrations = await getEventRegistrations(event.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/events">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Event Details</h1>
        </div>
        <Link href={`/dashboard/events/${event.id}/edit`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Event
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Information</CardTitle>
            <CardDescription>Details about the event</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Title</h3>
              <p>{event.title}</p>
            </div>

            <div>
              <h3 className="font-semibold">Status</h3>
              <Badge
                className="mt-1"
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
            </div>

            <div>
              <h3 className="font-semibold">Date & Time</h3>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span>
                  {format(new Date(event.startDate), "MMMM d, yyyy")}
                  {event.startDate !== event.endDate && ` - ${format(new Date(event.endDate), "MMMM d, yyyy")}`}
                </span>
              </div>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>
                  {format(new Date(event.startDate), "h:mm a")} -{format(new Date(event.endDate), "h:mm a")}
                </span>
              </div>
            </div>

            {event.location && (
              <div>
                <h3 className="font-semibold">Location</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            )}

            {event.category && (
              <div>
                <h3 className="font-semibold">Category</h3>
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mt-1">
                  {event.category}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-semibold">Capacity</h3>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                <span>
                  {event._count.registrations} / {event.capacity || "Unlimited"} registered
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Description</h3>
              <div className="mt-1 text-sm text-muted-foreground whitespace-pre-line">{event.description}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Image</CardTitle>
            <CardDescription>Featured image for the event</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={event.featuredImage || "/placeholder.svg?height=300&width=500"}
              alt={event.title}
              className="w-full h-auto rounded-lg object-cover aspect-video"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
          <CardDescription>People who have registered for this event</CardDescription>
        </CardHeader>
        <CardContent>
          {registrations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">
                      {registration.firstName} {registration.lastName}
                    </TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.phone || "—"}</TableCell>
                    <TableCell>{registration.organization || "—"}</TableCell>
                    <TableCell>{format(new Date(registration.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          registration.status === "confirmed"
                            ? "default"
                            : registration.status === "attended"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">No registrations yet for this event.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
