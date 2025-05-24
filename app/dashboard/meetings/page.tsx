"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Video, Users, Download, Trash, Pencil, Plus, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample meeting data
const meetings = [
  {
    id: "1",
    title: "Monthly Board Meeting",
    description: "Regular monthly meeting for the board members",
    meetingLink: "https://meet.example.com/abc123",
    meetingId: "abc123",
    password: "123456",
    startTime: "2023-07-15T14:00:00Z",
    endTime: "2023-07-15T15:30:00Z",
    status: "scheduled",
    participants: 8,
    recordingUrl: null,
  },
  {
    id: "2",
    title: "Volunteer Coordination",
    description: "Coordination meeting for upcoming volunteer activities",
    meetingLink: "https://meet.example.com/def456",
    meetingId: "def456",
    password: "654321",
    startTime: "2023-07-16T10:00:00Z",
    endTime: "2023-07-16T11:00:00Z",
    status: "scheduled",
    participants: 12,
    recordingUrl: null,
  },
  {
    id: "3",
    title: "Fundraising Strategy",
    description: "Planning session for Q3 fundraising activities",
    meetingLink: "https://meet.example.com/ghi789",
    meetingId: "ghi789",
    password: "789012",
    startTime: "2023-07-14T09:00:00Z",
    endTime: "2023-07-14T10:30:00Z",
    status: "completed",
    participants: 6,
    recordingUrl: "https://recordings.example.com/ghi789",
  },
  {
    id: "4",
    title: "New Member Orientation",
    description: "Orientation session for new NAPOWA members",
    meetingLink: "https://meet.example.com/jkl012",
    meetingId: "jkl012",
    password: "012345",
    startTime: "2023-07-18T15:00:00Z",
    endTime: "2023-07-18T16:00:00Z",
    status: "scheduled",
    participants: 15,
    recordingUrl: null,
  },
  {
    id: "5",
    title: "Event Planning Committee",
    description: "Planning for the upcoming annual gala",
    meetingLink: "https://meet.example.com/mno345",
    meetingId: "mno345",
    password: "345678",
    startTime: "2023-07-13T11:00:00Z",
    endTime: "2023-07-13T12:30:00Z",
    status: "completed",
    participants: 10,
    recordingUrl: "https://recordings.example.com/mno345",
  },
]

export default function MeetingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Filter meetings based on search term and filters
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.meetingId.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter

    // Simple date filtering logic
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && new Date(meeting.startTime).toDateString() === new Date().toDateString()) ||
      (dateFilter === "upcoming" && new Date(meeting.startTime) > new Date()) ||
      (dateFilter === "past" && new Date(meeting.startTime) < new Date())

    return matchesSearch && matchesStatus && matchesDate
  })

  const handleDeleteMeeting = (id: string) => {
    toast({
      title: "Meeting deleted",
      description: "The meeting has been deleted successfully.",
    })
  }

  const handleJoinMeeting = (meeting: any) => {
    // In a real implementation, this would launch the meeting
    window.open(meeting.meetingLink, "_blank")
    toast({
      title: "Joining meeting",
      description: `Joining ${meeting.title}...`,
    })
  }

  const handleDownloadRecording = (url: string) => {
    window.open(url, "_blank")
    toast({
      title: "Downloading recording",
      description: "The recording download has started.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "ongoing":
        return <Badge variant="default">In Progress</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Video Meetings</h2>
          <p className="text-muted-foreground">Schedule, manage, and join video conferences.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/meetings/create">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Meeting Management</CardTitle>
          <CardDescription>View and manage all scheduled and past meetings.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="ongoing">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Meetings</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meeting</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Meeting ID</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMeetings.map((meeting) => (
                        <TableRow key={meeting.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{meeting.title}</span>
                              <span className="text-xs text-muted-foreground">{meeting.description}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{formatDate(meeting.startTime)}</span>
                              <span className="text-xs text-muted-foreground">to {formatDate(meeting.endTime)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(meeting.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{meeting.participants}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <code className="rounded bg-muted px-1 py-0.5 text-sm">{meeting.meetingId}</code>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              {meeting.status !== "completed" && (
                                <Button variant="outline" size="sm" onClick={() => handleJoinMeeting(meeting)}>
                                  <Video className="mr-2 h-4 w-4" />
                                  Join
                                </Button>
                              )}
                              {meeting.recordingUrl && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDownloadRecording(meeting.recordingUrl!)}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Recording
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/meetings/${meeting.id}`}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteMeeting(meeting.id)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/meetings/${meeting.id}/participants`}>
                                      <Users className="mr-2 h-4 w-4" />
                                      Participants
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleJoinMeeting(meeting)}>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Open in new tab
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="upcoming" className="mt-4">
                {/* Similar table structure but filtered for upcoming meetings */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meeting</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Meeting ID</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMeetings
                        .filter((meeting) => meeting.status === "scheduled" || meeting.status === "ongoing")
                        .map((meeting) => (
                          <TableRow key={meeting.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{meeting.title}</span>
                                <span className="text-xs text-muted-foreground">{meeting.description}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{formatDate(meeting.startTime)}</span>
                                <span className="text-xs text-muted-foreground">to {formatDate(meeting.endTime)}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(meeting.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{meeting.participants}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <code className="rounded bg-muted px-1 py-0.5 text-sm">{meeting.meetingId}</code>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleJoinMeeting(meeting)}>
                                  <Video className="mr-2 h-4 w-4" />
                                  Join
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/dashboard/meetings/${meeting.id}`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteMeeting(meeting.id)}
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/dashboard/meetings/${meeting.id}/participants`}>
                                        <Users className="mr-2 h-4 w-4" />
                                        Participants
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleJoinMeeting(meeting)}>
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      Open in new tab
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                {/* Similar table structure but filtered for completed meetings */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meeting</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Meeting ID</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMeetings
                        .filter((meeting) => meeting.status === "completed")
                        .map((meeting) => (
                          <TableRow key={meeting.id}>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium">{meeting.title}</span>
                                <span className="text-xs text-muted-foreground">{meeting.description}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{formatDate(meeting.startTime)}</span>
                                <span className="text-xs text-muted-foreground">to {formatDate(meeting.endTime)}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(meeting.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <span>{meeting.participants}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <code className="rounded bg-muted px-1 py-0.5 text-sm">{meeting.meetingId}</code>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                {meeting.recordingUrl && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDownloadRecording(meeting.recordingUrl!)}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    Recording
                                  </Button>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/dashboard/meetings/${meeting.id}/participants`}>
                                        <Users className="mr-2 h-4 w-4" />
                                        Participants
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onClick={() => handleDeleteMeeting(meeting.id)}
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
