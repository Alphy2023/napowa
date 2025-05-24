"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    status: "upcoming",
    featuredImage: "",
    capacity: "",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "title" && !formData.slug) {
      // Auto-generate slug from title
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Combine date and time
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
      const endDateTime = new Date(
        `${formData.endDate || formData.startDate}T${formData.endTime || formData.startTime}`,
      )

      // Validate dates
      if (endDateTime < startDateTime) {
        throw new Error("End date/time cannot be before start date/time")
      }

      const eventData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        category: formData.category || undefined,
        location: formData.location || undefined,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        status: formData.status,
        featuredImage: formData.featuredImage || undefined,
        capacity: formData.capacity ? Number.parseInt(formData.capacity) : undefined,
        // In a real app, you would get the user ID from the session
        organizerId: "user_id_here",
      }

      // In a real app, this would be an API call
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(eventData),
      // })

      // For demo purposes, simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus("success")
      setMessage("Event created successfully!")

      // Redirect to events page after a short delay
      setTimeout(() => {
        router.push("/dashboard/events")
      }, 1500)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to create event. Please try again.")
      console.error("Create event error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Link href="/dashboard/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create New Event</h1>
      </div>

      {status === "success" && (
        <Alert className="bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert className="bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="image">Featured Image</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Event Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="event-slug"
                    required
                  />
                  <p className="text-xs text-muted-foreground">This will be used in the URL: /events/your-slug</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Conference">Conference</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Support Group">Support Group</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Fundraiser">Fundraiser</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Provide more information about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your event"
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Event location"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                      />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <div className="relative">
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                      />
                      <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <div className="relative">
                      <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">If left empty, will use start date</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <div className="relative">
                      <Input id="endTime" name="endTime" type="time" value={formData.endTime} onChange={handleChange} />
                      <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">If left empty, will use start time</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity (Optional)</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Maximum number of attendees"
                  />
                  <p className="text-xs text-muted-foreground">Leave empty for unlimited capacity</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>Add a featured image for your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <Input
                    id="featuredImage"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">Enter a URL for your event image</p>
                </div>

                {formData.featuredImage && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Preview</h3>
                    <img
                      src={formData.featuredImage || "/placeholder.svg"}
                      alt="Event preview"
                      className="w-full h-auto rounded-lg object-cover aspect-video"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=300&width=500"
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <CardFooter className="flex justify-end space-x-2 px-0">
            <Link href="/dashboard/events">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </CardFooter>
        </Tabs>
      </form>
    </div>
  )
}
