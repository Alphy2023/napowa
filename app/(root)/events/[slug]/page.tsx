import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, MapPin, Users } from "lucide-react"
import { format } from "date-fns"

import { getEventBySlug } from "@/lib/db"
import { EventRegistrationForm } from "@/components/event-registration-form"

interface EventPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: event.title,
    description: event.description.substring(0, 160),
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    notFound()
  }

  const isUpcoming = new Date(event.startDate) > new Date()
  const registrationsAvailable = isUpcoming && (!event.capacity || event._count.registrations < event.capacity)

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{event.title}</h1>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span>
                  {format(new Date(event.startDate), "MMMM d, yyyy")}
                  {event.startDate !== event.endDate && ` - ${format(new Date(event.endDate), "MMMM d, yyyy")}`}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>
                  {format(new Date(event.startDate), "h:mm a")} -{format(new Date(event.endDate), "h:mm a")}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.capacity && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-1 h-4 w-4" />
                  <span>
                    {event._count.registrations} / {event.capacity} registered
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <img
              src={event.featuredImage || "/placeholder.svg?height=400&width=800"}
              alt={event.title}
              className="w-full h-auto rounded-lg object-cover aspect-video"
            />
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <h2>About This Event</h2>
            <div dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, "<br />") }} />
          </div>

          {event.category && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {event.category}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="sticky top-24">
            {registrationsAvailable ? (
              <EventRegistrationForm eventId={event.id} eventName={event.title} />
            ) : (
              <div className="bg-muted p-6 rounded-lg text-center">
                {isUpcoming ? (
                  <>
                    <h3 className="text-xl font-semibold mb-2">Registration Closed</h3>
                    <p>This event has reached maximum capacity.</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">Event Ended</h3>
                    <p>This event has already taken place.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
