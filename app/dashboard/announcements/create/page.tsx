"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function CreateAnnouncementPage() {
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [priority, setPriority] = useState("normal")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [sendNotification, setSendNotification] = useState(true)
  const [targetAudience, setTargetAudience] = useState("all")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a title for the announcement.",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "Missing content",
        description: "Please enter content for the announcement.",
        variant: "destructive",
      })
      return
    }

    if (!startDate || !endDate) {
      toast({
        title: "Missing dates",
        description: "Please select both start and end dates.",
        variant: "destructive",
      })
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end < start) {
      toast({
        title: "Invalid date range",
        description: "End date must be after start date.",
        variant: "destructive",
      })
      return
    }

    // Submit form (in a real app, this would be an API call)
    toast({
      title: "Announcement created",
      description: "Your announcement has been created successfully.",
    })

    // Redirect to announcements list
    router.push("/dashboard/announcements")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Announcement</h2>
        <p className="text-muted-foreground">Create a new announcement for members.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Announcement Details</CardTitle>
            <CardDescription>
              Enter the details of your announcement. This will be displayed to members based on your settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter announcement content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger id="target-audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="volunteers">Volunteers Only</SelectItem>
                    <SelectItem value="committee">Committee Members Only</SelectItem>
                    <SelectItem value="widows">Widows Only</SelectItem>
                    <SelectItem value="staff">Staff Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="is-active">Active Status</Label>
                  <p className="text-sm text-muted-foreground">Activate or deactivate this announcement</p>
                </div>
                <Switch id="is-active" checked={isActive} onCheckedChange={setIsActive} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="send-notification">Send Notification</Label>
                  <p className="text-sm text-muted-foreground">
                    Send a notification to members when this announcement is published
                  </p>
                </div>
                <Switch id="send-notification" checked={sendNotification} onCheckedChange={setSendNotification} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Create Announcement</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
