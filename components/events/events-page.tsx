"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEvents } from "@/hooks/use-events"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export function EventsPage() {
  const [status, setStatus] = useState<string | undefined>("upcoming")
  const { events, isLoading } = useEvents(status)

  if (isLoading) {
    return <div className="container py-12 text-center">Loading events...</div>
  }

  const upcomingEvents = events.filter((e) => e.status === "upcoming")
  const ongoingEvents = events.filter((e) => e.status === "ongoing")
  const pastEvents = events.filter((e) => e.status === "completed")

  return (
    <main className="w-full">
      {/* Header */}
      <section className="w-full bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Events</h1>
          <p className="text-lg text-muted-foreground">
            Join us for upcoming programs, workshops, and community events
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="w-full py-12">
        <div className="container">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No upcoming events</p>
                  </div>
                ) : (
                  upcomingEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                      {event.featuredImage && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={(event.featuredImage as any).url || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {event.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(event.startDate).toLocaleDateString()}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.capacity && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{event.registeredCount} / {event.capacity} registered</span>
                            </div>
                          )}
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/events/${event.slug}`}>Learn More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="ongoing" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ongoingEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No ongoing events</p>
                  </div>
                ) : (
                  ongoingEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                      {event.featuredImage && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={(event.featuredImage as any).url || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1">
                        <Button asChild className="w-full">
                          <Link href={`/events/${event.slug}`}>View Details</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="past" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastEvents.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No past events</p>
                  </div>
                ) : (
                  pastEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden opacity-75 hover:shadow-lg transition-shadow flex flex-col">
                      {event.featuredImage && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={(event.featuredImage as any).url || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-1">
                        <Button asChild variant="outline" className="w-full">
                          <Link href={`/events/${event.slug}`}>View Event</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
