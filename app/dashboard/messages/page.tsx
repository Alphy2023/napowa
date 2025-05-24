"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Smile, ImageIcon, File, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import MessageAttachmentUpload from "@/components/message-attachment-upload"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Sample user data
const users = [
  {
    id: "1",
    name: "Jane Muthoni",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 2,
  },
  {
    id: "2",
    name: "Mary Akinyi",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2 hours ago",
    unread: 0,
  },
  {
    id: "3",
    name: "Sarah Wanjiku",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 0,
  },
  {
    id: "4",
    name: "Grace Otieno",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "Yesterday",
    unread: 0,
  },
  {
    id: "5",
    name: "Faith Kamau",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Just now",
    unread: 5,
  },
]

// Sample group data
const groups = [
  {
    id: "1",
    name: "Board Members",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 8,
    unread: 3,
  },
  {
    id: "2",
    name: "Volunteer Coordinators",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 12,
    unread: 0,
  },
  {
    id: "3",
    name: "Event Planning",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 15,
    unread: 7,
  },
]

// Sample messages for a conversation
const sampleMessages = [
  {
    id: "1",
    senderId: "1",
    content: "Hello! How are you doing today?",
    timestamp: "2023-07-15T10:30:00Z",
    isRead: true,
    attachments: [],
    reactions: [],
  },
  {
    id: "2",
    senderId: "current-user",
    content: "I'm doing well, thank you! How about you?",
    timestamp: "2023-07-15T10:32:00Z",
    isRead: true,
    attachments: [],
    reactions: [{ emoji: "👍", userId: "1" }],
  },
  {
    id: "3",
    senderId: "1",
    content: "Great! I wanted to discuss the upcoming event. Do you have some time today?",
    timestamp: "2023-07-15T10:35:00Z",
    isRead: true,
    attachments: [],
    reactions: [],
  },
  {
    id: "4",
    senderId: "current-user",
    content: "Yes, I'm free after 2 PM. Would that work for you?",
    timestamp: "2023-07-15T10:38:00Z",
    isRead: true,
    attachments: [],
    reactions: [],
  },
  {
    id: "5",
    senderId: "1",
    content: "Perfect! Let's meet at 2:30 PM then. I'll send you a calendar invite.",
    timestamp: "2023-07-15T10:40:00Z",
    isRead: false,
    attachments: [
      {
        id: "1",
        name: "Event_Schedule.pdf",
        size: 1240000,
        type: "application/pdf",
        url: "#",
      },
    ],
    reactions: [{ emoji: "👍", userId: "current-user" }],
  },
]

// Emoji picker data
const emojiGroups = [
  {
    name: "Smileys",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
  },
  {
    name: "Gestures",
    emojis: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "☝️", "👋", "🤚", "🖐️", "✋"],
  },
  {
    name: "Objects",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
  },
]

export default function MessagesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("direct")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(sampleMessages)
  const [attachments, setAttachments] = useState<File[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter users based on search term
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Filter groups based on search term
  const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) return

    const newMessage = {
      id: `${messages.length + 1}`,
      senderId: "current-user",
      content: message,
      timestamp: new Date().toISOString(),
      isRead: false,
      attachments: attachments.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
      })),
      reactions: [],
    }

    setMessages([...messages, newMessage])
    setMessage("")
    setAttachments([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleAddAttachment = (files: File[]) => {
    setAttachments([...attachments, ...files])
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          // Check if user already reacted with this emoji
          const existingReaction = msg.reactions.find((r) => r.emoji === emoji && r.userId === "current-user")

          if (existingReaction) {
            // Remove reaction if it already exists
            return {
              ...msg,
              reactions: msg.reactions.filter((r) => !(r.emoji === emoji && r.userId === "current-user")),
            }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, userId: "current-user" }],
            }
          }
        }
        return msg
      }),
    )
  }

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleStartCall = (type: "audio" | "video") => {
    toast({
      title: `${type === "audio" ? "Audio" : "Video"} call initiated`,
      description: `Starting ${type} call with ${users.find((user) => user.id === selectedChat)?.name}`,
    })
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4 text-blue-500" />
    } else if (type.startsWith("video/")) {
      return <Video className="h-4 w-4 text-purple-500" />
    } else if (type.includes("pdf")) {
      return <File className="h-4 w-4 text-red-500" />
    } else {
      return <File className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-3">
        <Card className="col-span-1 flex flex-col overflow-hidden">
          {/* Tabs component now wraps the TabsList, search input, and TabsContent */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="direct">Direct</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
            </div>

            <div className="px-4 pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <TabsContent value="direct" className="m-0">
                <div className="space-y-1 p-2">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      className={`flex w-full items-center space-x-3 rounded-md p-2 text-left hover:bg-accent ${
                        selectedChat === user.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedChat(user.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            user.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="truncate font-medium">{user.name}</p>
                          {user.unread > 0 && (
                            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full
                             bg-primary text-xs text-primary-foreground">
                              {user.unread}
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{user.lastSeen}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="m-0">
                <div className="space-y-1 p-2">
                  {filteredGroups.map((group) => (
                    <button
                      key={group.id}
                      className={`flex w-full items-center space-x-3 rounded-md p-2 text-left hover:bg-accent ${
                        selectedChat === `group-${group.id}` ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedChat(`group-${group.id}`)}
                    >
                      <Avatar>
                        <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                        <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="truncate font-medium">{group.name}</p>
                          {group.unread > 0 && (
                            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                              {group.unread}
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{group.members} members</p>
                      </div>
                    </button>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </Card>

        <Card className="col-span-1 flex flex-col overflow-hidden md:col-span-2">
          {selectedChat ? (
            <>
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        selectedChat.startsWith("group-")
                          ? groups.find((g) => `group-${g.id}` === selectedChat)?.avatar
                          : users.find((u) => u.id === selectedChat)?.avatar
                      }
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      {selectedChat.startsWith("group-")
                        ? groups
                            .find((g) => `group-${g.id}` === selectedChat)
                            ?.name.substring(0, 2)
                            .toUpperCase()
                        : users
                            .find((u) => u.id === selectedChat)
                            ?.name.substring(0, 2)
                            .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {selectedChat.startsWith("group-")
                        ? groups.find((g) => `group-${g.id}` === selectedChat)?.name
                        : users.find((u) => u.id === selectedChat)?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedChat.startsWith("group-")
                        ? `${groups.find((g) => `group-${g.id}` === selectedChat)?.members} members`
                        : users.find((u) => u.id === selectedChat)?.status === "online"
                          ? "Online"
                          : users.find((u) => u.id === selectedChat)?.lastSeen}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleStartCall("audio")}>
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleStartCall("video")}>
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.senderId !== "current-user" && (
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarImage
                            src={users.find((u) => u.id === msg.senderId)?.avatar || "/placeholder.svg"}
                            alt={users.find((u) => u.id === msg.senderId)?.name}
                          />
                          <AvatarFallback>
                            {users
                              .find((u) => u.id === msg.senderId)
                              ?.name.substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            msg.senderId === "current-user"
                              ? "bg-napowa-red/60 text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p>{msg.content}</p>

                          {/* Attachments */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {msg.attachments.map((attachment: any, index: number) => (
                                <div
                                  key={`${attachment.id}-${index}`}
                                  className="flex items-center gap-2 rounded bg-background/20 p-2"
                                >
                                  {attachment.type.startsWith("image/") ? (
                                    <div className="h-20 w-20 overflow-hidden rounded">
                                      <img
                                        src={attachment.url || "/placeholder.svg"}
                                        alt={attachment.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      {getFileIcon(attachment.type)}
                                      <span className="text-sm">{attachment.name}</span>
                                      <span className="text-xs">({(attachment.size / 1024).toFixed(1)} KB)</span>
                                      <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          <p
                            className={`text-right text-xs ${
                              msg.senderId === "current-user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground/70"
                            }`}
                          >
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>

                        {/* Reactions */}
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {msg.reactions.map((reaction: any, index: number) => (
                              <div
                                key={`${reaction.emoji}-${index}`}
                                className={`flex items-center rounded-full px-2 py-0.5 text-xs ${
                                  reaction.userId === "current-user" ? "bg-primary/20" : "bg-muted"
                                }`}
                              >
                                <span>{reaction.emoji}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reaction button */}
                        <div className="mt-1 flex justify-start">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground">
                                <Smile className="mr-1 h-3 w-3" />
                                React
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-64 p-2"
                              align={msg.senderId === "current-user" ? "end" : "start"}
                            >
                              <div className="space-y-2">
                                {emojiGroups.map((group) => (
                                  <div key={group.name}>
                                    <p className="mb-1 text-xs font-medium text-muted-foreground">{group.name}</p>
                                    <div className="flex flex-wrap gap-1">
                                      {group.emojis.map((emoji) => (
                                        <button
                                          key={emoji}
                                          className="cursor-pointer rounded p-1 text-lg hover:bg-accent"
                                          onClick={() => handleAddReaction(msg.id, emoji)}
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                {attachments.length > 0 && (
                  <div className="mb-2">
                    <MessageAttachmentUpload
                      onAttach={handleAddAttachment}
                      attachments={attachments}
                      onRemove={handleRemoveAttachment}
                    />
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  {attachments.length === 0 && (
                    <Button variant="ghost" size="icon" onClick={() => document.getElementById("file-upload")?.click()}>
                      <Paperclip className="h-5 w-5" />
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => {
                          if (e.target.files) {
                            handleAddAttachment(Array.from(e.target.files))
                          }
                        }}
                      />
                    </Button>
                  )}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2">
                      <div className="space-y-2">
                        {emojiGroups.map((group) => (
                          <div key={group.name}>
                            <p className="mb-1 text-xs font-medium text-muted-foreground">{group.name}</p>
                            <div className="flex flex-wrap gap-1">
                              {group.emojis.map((emoji) => (
                                <button
                                  key={emoji}
                                  className="cursor-pointer rounded p-1 text-lg hover:bg-accent"
                                  onClick={() => setMessage(message + emoji)}
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="text-center">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">Choose a contact or group to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
