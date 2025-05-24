"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  MoreVertical,
  Settings,
  Hand,
  LayoutGrid,
  Maximize,
  Minimize,
  ChevronRight,
  Send,
  PanelRight,
  PanelRightClose,
  RepeatIcon as Record,
  ScreenShare,
  StopCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample participant data
const sampleParticipants = [
  {
    id: "host",
    name: "Jane Muthoni (Host)",
    avatar: "/placeholder.svg?height=40&width=40",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isHandRaised: false,
    isHost: true,
  },
  {
    id: "current-user",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isHandRaised: false,
    isHost: false,
  },
  {
    id: "3",
    name: "Mary Akinyi",
    avatar: "/placeholder.svg?height=40&width=40",
    isSpeaking: true,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isHandRaised: false,
    isHost: false,
  },
  {
    id: "4",
    name: "Sarah Wanjiku",
    avatar: "/placeholder.svg?height=40&width=40",
    isSpeaking: false,
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
    isHandRaised: true,
    isHost: false,
  },
  {
    id: "5",
    name: "Grace Otieno",
    avatar: "/placeholder.svg?height=40&width=40",
    isSpeaking: false,
    isMuted: true,
    isVideoOn: true,
    isScreenSharing: false,
    isHandRaised: false,
    isHost: false,
  },
  {
    id: "6",
    name: "Faith Kamau",
    avatar: "/placeholder.svg?height=40&width=40",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
    isHandRaised: false,
    isHost: false,
  },
]

// Sample chat messages
const sampleChatMessages = [
  {
    id: "1",
    senderId: "host",
    senderName: "Jane Muthoni",
    content: "Welcome everyone to our monthly board meeting!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    isPrivate: false,
  },
  {
    id: "2",
    senderId: "3",
    senderName: "Mary Akinyi",
    content: "Thanks for organizing this meeting.",
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    isPrivate: false,
  },
  {
    id: "3",
    senderId: "4",
    senderName: "Sarah Wanjiku",
    content: "I have a question about the fundraising event next month.",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    isPrivate: false,
  },
  {
    id: "4",
    senderId: "host",
    senderName: "Jane Muthoni",
    content: "We'll discuss that in the second agenda item, Sarah.",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    isPrivate: false,
  },
]

export default function MeetingRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get initial state from URL params
  const initialAudioEnabled = searchParams.get("audio") === "true"
  const initialVideoEnabled = searchParams.get("video") === "true"
  const userName = searchParams.get("name") || "Guest"

  // State for meeting controls
  const [audioEnabled, setAudioEnabled] = useState(initialAudioEnabled)
  const [videoEnabled, setVideoEnabled] = useState(initialVideoEnabled)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sidebarTab, setSidebarTab] = useState("chat")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [participants, setParticipants] = useState(sampleParticipants)
  const [chatMessages, setChatMessages] = useState(sampleChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize media stream
  useEffect(() => {
    const initializeStream = async () => {
      try {
        const constraints: MediaStreamConstraints = {
          audio: audioEnabled,
          video: videoEnabled,
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setLocalStream(stream)

        // Set the stream to the video element
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        // Update current user in participants
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === "current-user"
              ? { ...p, isMuted: !audioEnabled, isVideoOn: videoEnabled, name: `${userName} (You)` }
              : p,
          ),
        )
      } catch (error) {
        console.error("Error accessing media devices:", error)
        toast({
          title: "Device access error",
          description: "Could not access your camera or microphone. Please check permissions.",
          variant: "destructive",
        })
      }
    }

    initializeStream()

    // Cleanup function to stop all tracks when component unmounts
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Update stream when audio/video state changes
  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = audioEnabled
      })

      localStream.getVideoTracks().forEach((track) => {
        track.enabled = videoEnabled
      })

      // Update current user in participants
      setParticipants((prev) =>
        prev.map((p) => (p.id === "current-user" ? { ...p, isMuted: !audioEnabled, isVideoOn: videoEnabled } : p)),
      )
    }
  }, [audioEnabled, videoEnabled, localStream])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Toggle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true })

        // In a real implementation, you would send this stream to other participants
        setIsScreenSharing(true)

        // Update participants list
        setParticipants((prev) => prev.map((p) => (p.id === "current-user" ? { ...p, isScreenSharing: true } : p)))

        // Listen for when user stops screen sharing
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false)
          setParticipants((prev) => prev.map((p) => (p.id === "current-user" ? { ...p, isScreenSharing: false } : p)))
        }

        toast({
          title: "Screen sharing started",
          description: "Other participants can now see your screen",
        })
      } catch (error) {
        console.error("Error sharing screen:", error)
        toast({
          title: "Screen sharing failed",
          description: "Could not share your screen. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      // In a real implementation, you would stop the screen share stream
      setIsScreenSharing(false)
      setParticipants((prev) => prev.map((p) => (p.id === "current-user" ? { ...p, isScreenSharing: false } : p)))

      toast({
        title: "Screen sharing stopped",
        description: "You have stopped sharing your screen",
      })
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)

    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording ? "The meeting recording has been stopped" : "This meeting is now being recorded",
    })
  }

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised)

    // Update participants list
    setParticipants((prev) => prev.map((p) => (p.id === "current-user" ? { ...p, isHandRaised: !isHandRaised } : p)))

    // Notify others (in a real implementation)
    if (!isHandRaised) {
      // Add a system message to chat
      const systemMessage = {
        id: `system-${Date.now()}`,
        senderId: "system",
        senderName: "System",
        content: `${userName} raised their hand`,
        timestamp: new Date().toISOString(),
        isPrivate: false,
      }

      setChatMessages((prev) => [...prev, systemMessage])
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      senderName: `${userName} (You)`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isPrivate: false,
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const handleEndCall = () => {
    // Stop all tracks
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop())
    }

    // Navigate back to meetings page
    router.push("/dashboard/meetings")
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div ref={containerRef} className="flex h-screen w-full flex-col bg-background">
      {/* Meeting header */}
      <div className="flex items-center justify-between border-b p-2">
        <div>
          <h2 className="text-lg font-semibold">Monthly Board Meeting</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Meeting ID: {params.id}</span>
            <Badge variant="outline" className="ml-2">
              {isRecording && <Record className="mr-1 h-3 w-3 text-red-500" />}
              {isRecording ? "Recording" : "Live"}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isFullscreen ? (
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              <Minimize className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              <Maximize className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRight className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video grid */}
        <div className="relative flex-1 overflow-hidden bg-black p-2">
          <div
            className={`grid h-full gap-2 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`relative overflow-hidden rounded-lg border border-border/50 bg-muted ${
                  participant.isSpeaking ? "ring-2 ring-primary ring-offset-2" : ""
                } ${
                  participant.isScreenSharing || (participant.id === "current-user" && isScreenSharing)
                    ? viewMode === "list"
                      ? "col-span-1 row-span-2"
                      : "col-span-full row-span-2"
                    : ""
                }`}
              >
                {participant.isVideoOn ? (
                  participant.id === "current-user" ? (
                    <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-muted">
                      {/* Placeholder for remote video */}
                      <img
                        src={participant.avatar || "/placeholder.svg"}
                        alt={participant.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-4">
                    <Avatar className="mb-2 h-16 w-16">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>
                        {participant.name.split(" ")[0].charAt(0)}
                        {participant.name.split(" ")[1]?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-center font-medium">{participant.name}</p>
                  </div>
                )}

                {/* Participant status indicators */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                  {participant.isMuted && (
                    <div className="rounded-full bg-background/80 p-1">
                      <MicOff className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  {participant.isScreenSharing && (
                    <div className="rounded-full bg-background/80 p-1">
                      <ScreenShare className="h-4 w-4 text-blue-500" />
                    </div>
                  )}
                  {participant.isHandRaised && (
                    <div className="rounded-full bg-background/80 p-1">
                      <Hand className="h-4 w-4 text-yellow-500" />
                    </div>
                  )}
                </div>

                {/* Host badge */}
                {participant.isHost && (
                  <div className="absolute right-2 top-2">
                    <Badge variant="secondary" className="bg-background/80">
                      Host
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Meeting controls */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center space-x-2 rounded-full bg-background/90 p-2 shadow-lg">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={audioEnabled ? "ghost" : "destructive"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{audioEnabled ? "Mute microphone" : "Unmute microphone"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={videoEnabled ? "ghost" : "destructive"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{videoEnabled ? "Turn off camera" : "Turn on camera"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isScreenSharing ? "default" : "ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={toggleScreenShare}
                  >
                    <ScreenShare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isScreenSharing ? "Stop sharing screen" : "Share screen"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isHandRaised ? "default" : "ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={toggleHandRaise}
                  >
                    <Hand className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isHandRaised ? "Lower hand" : "Raise hand"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="h-8" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      setIsSidebarOpen(true)
                      setSidebarTab("chat")
                    }}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open chat</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      setIsSidebarOpen(true)
                      setSidebarTab("participants")
                    }}
                  >
                    <Users className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View participants</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isRecording ? "default" : "ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={toggleRecording}
                  >
                    {isRecording ? <StopCircle className="h-5 w-5 text-red-500" /> : <Record className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isRecording ? "Stop recording" : "Start recording"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="center">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LayoutGrid className="h-4 w-4" />
                      <span className="text-sm font-medium">Grid view</span>
                    </div>
                    <Switch
                      checked={viewMode === "grid"}
                      onCheckedChange={(checked) => setViewMode(checked ? "grid" : "list")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className="text-sm font-medium">Settings</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Separator orientation="vertical" className="h-8" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" size="icon" className="rounded-full" onClick={handleEndCall}>
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Leave meeting</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
          <div className="flex h-full w-80 flex-col border-l">
            <Tabs value={sidebarTab} onValueChange={setSidebarTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="participants">
                  <Users className="mr-2 h-4 w-4" />
                  Participants ({participants.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex h-[calc(100vh-10rem)] flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{message.senderName}</span>
                            {message.isPrivate && (
                              <Badge variant="outline" className="text-xs">
                                Private
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                        </div>
                        <p className="mt-1">{message.content}</p>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="participants" className="h-[calc(100vh-10rem)]">
                <ScrollArea className="h-full">
                  <div className="space-y-2 p-4">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between rounded-md p-2 hover:bg-accent"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                              <AvatarFallback>
                                {participant.name.split(" ")[0].charAt(0)}
                                {participant.name.split(" ")[1]?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {participant.isSpeaking && (
                              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {participant.name}
                              {participant.isHost && (
                                <Badge variant="outline" className="ml-2">
                                  Host
                                </Badge>
                              )}
                            </p>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              {participant.isMuted && <MicOff className="h-3 w-3" />}
                              {!participant.isVideoOn && <VideoOff className="h-3 w-3" />}
                              {participant.isScreenSharing && <ScreenShare className="h-3 w-3 text-blue-500" />}
                              {participant.isHandRaised && <Hand className="h-3 w-3 text-yellow-500" />}
                            </div>
                          </div>
                        </div>

                        {participant.id !== "current-user" && (
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
