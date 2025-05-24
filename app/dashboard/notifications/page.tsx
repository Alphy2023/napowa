"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, DollarSign, MessageSquare, Megaphone, CheckCircle, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Sample notification data
const notifications = [
  {
    id: "1",
    type: "message",
    title: "New message from Jane Muthoni",
    content: "Hello! I wanted to discuss the upcoming event...",
    isRead: false,
    timestamp: "2023-07-15T10:30:00Z",
    link: "/dashboard/messages",
    user: {
      name: "Jane Muthoni",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    type: "event",
    title: "Event Reminder: Monthly Board Meeting",
    content: "The monthly board meeting is scheduled for tomorrow at 2:00 PM.",
    isRead: false,
    timestamp: "2023-07-15T09:15:00Z",
    link: "/dashboard/events/1",
  },
  {
    id: "3",
    type: "donation",
    title: "New Donation Received",
    content: "A donation of KES 5,000 has been received from Mary Akinyi.",
    isRead: true,
    timestamp: "2023-07-14T14:45:00Z",
    link: "/dashboard/donations",
  },
  {
    id: "4",
    type: "announcement",
    title: "New Announcement: Office Closure",
    content: "The office will be closed on July 20th for staff training.",
    isRead: true,
    timestamp: "2023-07-14T11:20:00Z",
    link: "/dashboard/announcements/4",
  },
  {
    id: "5",
    type: "system",
    title: "System Update Completed",
    content: "The system has been updated to the latest version.",
    isRead: true,
    timestamp: "2023-07-13T16:30:00Z",
    link: null,
  },
  {
    id: "6",
    type: "message",
    title: "New message from Sarah Wanjiku",
    content: "Can we meet to discuss the volunteer program?",
    isRead: false,
    timestamp: "2023-07-13T13:10:00Z",
    link: "/dashboard/messages",
    user: {
      name: "Sarah Wanjiku",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "7",
    type: "event",
    title: "New Event Registration",
    content: "3 new members have registered for the Fundraising Workshop.",
    isRead: true,
    timestamp: "2023-07-12T15:45:00Z",
    link: "/dashboard/events/2",
  },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Filter notifications based on tab and type filter
  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.isRead) ||
      (activeTab === "read" && notification.isRead)

    const matchesType = typeFilter === "all" || notification.type === typeFilter

    return matchesTab && matchesType
  })

  const markAsRead = (id: string) => {
    // In a real implementation, this would update the notification in the database
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    // In a real implementation, this would update all notifications in the database
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "donation":
        return <DollarSign className="h-5 w-5 text-yellow-500" />
      case "announcement":
        return <Megaphone className="h-5 w-5 text-purple-500" />
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">View and manage your notifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="event">Events</SelectItem>
              <SelectItem value="donation">Donations</SelectItem>
              <SelectItem value="announcement">Announcements</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
          <CardDescription>Stay updated with the latest activities and alerts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent/50 ${
                          !notification.isRead ? "bg-accent/20" : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <Badge variant="default" className="px-2 py-0">
                                  New
                                </Badge>
                              )}
                              <span className="flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.content}</p>
                          <div className="flex items-center justify-between pt-2">
                            {notification.link ? (
                              <Button variant="link" className="h-auto p-0 text-sm" asChild>
                                <a href={notification.link}>View Details</a>
                              </Button>
                            ) : (
                              <span></span>
                            )}
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto text-xs"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No notifications found</h3>
                      <p className="text-sm text-muted-foreground">
                        {activeTab === "unread"
                          ? "You have no unread notifications."
                          : activeTab === "read"
                            ? "You have no read notifications."
                            : "You have no notifications."}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread" className="mt-4">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-4 rounded-lg border bg-accent/20 p-4 transition-colors hover:bg-accent/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="default" className="px-2 py-0">
                                New
                              </Badge>
                              <span className="flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.content}</p>
                          <div className="flex items-center justify-between pt-2">
                            {notification.link ? (
                              <Button variant="link" className="h-auto p-0 text-sm" asChild>
                                <a href={notification.link}>View Details</a>
                              </Button>
                            ) : (
                              <span></span>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No unread notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        You're all caught up! Check back later for new notifications.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="read" className="mt-4">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-accent/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.content}</p>
                          {notification.link && (
                            <div className="pt-2">
                              <Button variant="link" className="h-auto p-0 text-sm" asChild>
                                <a href={notification.link}>View Details</a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Bell className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="text-lg font-medium">No read notifications</h3>
                      <p className="text-sm text-muted-foreground">You haven't read any notifications yet.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
