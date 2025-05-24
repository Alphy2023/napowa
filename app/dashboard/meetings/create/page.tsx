"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Copy, Check } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

export default function CreateMeetingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [generatePassword, setGeneratePassword] = useState(true)
  const [password, setPassword] = useState("")
  const [isPasswordCopied, setIsPasswordCopied] = useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [meetingType, setMeetingType] = useState("video")
  const [allowRecording, setAllowRecording] = useState(true)
  const [waitingRoom, setWaitingRoom] = useState(false)
  const [muteOnEntry, setMuteOnEntry] = useState(true)

  // Generate a random meeting ID and password
  const meetingId = Math.random().toString(36).substring(2, 10)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !date || !startTime || !endTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create meeting logic would go here
    toast({
      title: "Meeting scheduled",
      description: "Your meeting has been scheduled successfully.",
    })

    // Redirect to meetings page
    router.push("/dashboard/meetings")
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    setIsPasswordCopied(true)
    setTimeout(() => setIsPasswordCopied(false), 2000)
  }

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).substring(2, 8)
    setPassword(randomPassword)
  }

  // Generate password on initial load if option is selected
  useState(() => {
    if (generatePassword) {
      generateRandomPassword()
    }
  })

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Schedule a Meeting</h2>
        <p className="text-muted-foreground">Create a new video conference or meeting.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Meeting Details</CardTitle>
            <CardDescription>Enter the details for your meeting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                placeholder="Enter meeting title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Enter meeting description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Meeting Type</Label>
                <Select value={meetingType} onValueChange={setMeetingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Conference</SelectItem>
                    <SelectItem value="audio">Audio Only</SelectItem>
                    <SelectItem value="webinar">Webinar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="meeting-id">Meeting ID</Label>
                <div className="flex items-center space-x-2">
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">{meetingId}</code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(meetingId)
                      toast({
                        title: "Copied",
                        description: "Meeting ID copied to clipboard",
                      })
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password">Meeting Password</Label>
                  <div className="text-sm text-muted-foreground">Participants will need this to join</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="generate-password"
                    checked={generatePassword}
                    onCheckedChange={(checked) => {
                      setGeneratePassword(checked)
                      if (checked) {
                        generateRandomPassword()
                      } else {
                        setPassword("")
                      }
                    }}
                  />
                  <Label htmlFor="generate-password">Generate password</Label>
                </div>
              </div>

              {generatePassword ? (
                <div className="flex items-center space-x-2">
                  <Input value={password} readOnly className="font-mono" />
                  <Button type="button" variant="outline" size="icon" onClick={copyPassword}>
                    {isPasswordCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button type="button" variant="outline" onClick={generateRandomPassword}>
                    Regenerate
                  </Button>
                </div>
              ) : (
                <Input
                  id="password"
                  type="text"
                  placeholder="Enter meeting password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
            </div>

            <div>
              <Button type="button" variant="link" className="px-0" onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}>
                {isAdvancedOpen ? "Hide advanced options" : "Show advanced options"}
              </Button>
            </div>

            {isAdvancedOpen && (
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="recording">Allow Recording</Label>
                    <div className="text-sm text-muted-foreground">Record the meeting for later viewing</div>
                  </div>
                  <Switch id="recording" checked={allowRecording} onCheckedChange={setAllowRecording} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="waiting-room">Enable Waiting Room</Label>
                    <div className="text-sm text-muted-foreground">Participants must be admitted by the host</div>
                  </div>
                  <Switch id="waiting-room" checked={waitingRoom} onCheckedChange={setWaitingRoom} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="mute-on-entry">Mute Participants on Entry</Label>
                    <div className="text-sm text-muted-foreground">
                      Participants will join with their microphone muted
                    </div>
                  </div>
                  <Switch id="mute-on-entry" checked={muteOnEntry} onCheckedChange={setMuteOnEntry} />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">Schedule Meeting</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
