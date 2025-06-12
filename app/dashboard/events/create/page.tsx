"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Calendar, Clock, ImageIcon, Video } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { eventSchema, type EventFormValues, EVENT_CATEGORIES, EVENT_STATUSES } from "@/types/events"

export default function CreateEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [activeTab, setActiveTab] = useState("basic")
  const [mediaPreview, setMediaPreview] = useState<{
    image: string | null
    video: string | null
  }>({
    image: null,
    video: null,
  })

  // Initialize react-hook-form with zod validation
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
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
      featuredVideo: "",
      capacity: "",
    },
  })

  // Watch form values for auto-generating slug and previewing media
  const title = form.watch("title")
  const featuredImage = form.watch("featuredImage")
  const featuredVideo = form.watch("featuredVideo")

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  // Update slug when title changes
  const onTitleChange = (value: string) => {
    form.setValue("title", value)
    if (!form.getValues("slug")) {
      form.setValue("slug", generateSlug(value))
    }
  }

  // Update media previews when URLs change
  const onMediaChange = (type: "image" | "video", url: string) => {
    if (type === "image") {
      form.setValue("featuredImage", url)
      setMediaPreview((prev) => ({ ...prev, image: url || null }))
    } else {
      form.setValue("featuredVideo", url)
      setMediaPreview((prev) => ({ ...prev, video: url || null }))
    }
  }

  const onSubmit = async (data: EventFormValues) => {
    setLoading(true)

    try {
      // Combine date and time
      const startDateTime = new Date(`${data.startDate}T${data.startTime}`)
      const endDateTime = new Date(
        `${data.endDate || data.startDate}T${data.endTime || data.startTime}`
      )

      // Validate dates
      if (endDateTime < startDateTime) {
        throw new Error("End date/time cannot be before start date/time")
      }

      const eventData = {
        title: data.title,
        slug: data.slug,
        description: data.description,
        category: data.category,
        location: data.location,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        status: data.status,
        featuredImage: data.featuredImage || undefined,
        featuredVideo: data.featuredVideo || undefined,
        capacity: data.capacity ? Number(data.capacity) : undefined,
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
        router.push("/events")
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
        <Link href="/events">
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter event title"
                            {...field}
                            onChange={(e) => onTitleChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="event-slug" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be used in the URL: /events/your-slug
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EVENT_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {EVENT_STATUSES.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your event"
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Event location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="date" {...field} />
                              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="time" {...field} />
                              <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="date" {...field} />
                              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            If left empty, will use start date
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type="time" {...field} />
                              <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            If left empty, will use start time
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            placeholder="Maximum number of attendees"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Leave empty for unlimited capacity
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>Add images and videos for your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Featured Image</h3>
                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="https://example.com/image.jpg"
                                {...field}
                                onChange={(e) => onMediaChange("image", e.target.value)}
                              />
                              <Image className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter a URL for your event image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {mediaPreview.image && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Image Preview</h3>
                        <img
                          src={mediaPreview.image || "/placeholder.svg"}
                          alt="Event preview"
                          className="w-full h-auto rounded-lg object-cover aspect-video"
                          onError={() => {
                            setMediaPreview((prev) => ({ ...prev, image: null }))
                            form.setError("featuredImage", {
                              type: "manual",
                              message: "Failed to load image. Please check the URL.",
                            })
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Featured Video</h3>
                    <FormField
                      control={form.control}
                      name="featuredVideo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="https://example.com/video.mp4 or YouTube/Vimeo URL"
                                {...field}
                                onChange={(e) => onMediaChange("video", e.target.value)}
                              />
                              <Video className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Enter a direct video URL or YouTube/Vimeo link
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {mediaPreview.video && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Video Preview</h3>
                        <div className="aspect-video rounded-lg overflow-hidden bg-black">
                          {/* Handle YouTube videos */}
                          {mediaPreview.video.includes("youtube.com") || mediaPreview.video.includes("youtu.be") ? (
                            <iframe
                              src={mediaPreview.video.replace("watch?v=", "embed/")}
                              className="w-full h-full"
                              allowFullScreen
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                          ) : mediaPreview.video.includes("vimeo.com") ? (
                            <iframe
                              src={`https://player.vimeo.com/video/${mediaPreview.video.split("/").pop()}`}
                              className="w-full h-full"
                              allowFullScreen
                              title="Vimeo video player"
                              allow="autoplay; fullscreen; picture-in-picture"
                            ></iframe>
                          ) : (
                            <video
                              src={mediaPreview.video}
                              controls
                              className="w-full h-full"
                              onError={() => {
                                setMediaPreview((prev) => ({ ...prev, video: null }))
                                form.setError("featuredVideo", {
                                  type: "manual",
                                  message: "Failed to load video. Please check the URL.",
                                })
                              }}
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              {activeTab !== "basic" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (activeTab === "details") setActiveTab("basic")
                    if (activeTab === "media") setActiveTab("details")
                  }}
                >
                  Previous
                </Button>
              )}
              {activeTab !== "media" && (
                <Button
                  type="button"
                  onClick={() => {
                    if (activeTab === "basic") setActiveTab("details")
                    if (activeTab === "details") setActiveTab("media")
                  }}
                >
                  Next
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Link href="/events">
                <Button variant="outline">Cancel</Button>
              </Link>
              {activeTab === "media" && (
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
