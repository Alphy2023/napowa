"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mic, MicOff, VideoIcon, VideoOff, Settings, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MeetingJoinPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([])
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("")
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("")
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sample meeting data - in a real app, this would be fetched from the server
  const meetingData = {
    id: params.id,
    title: "Monthly Board Meeting",
    host: "Jane Muthoni",
    waitingRoom: true,
    startTime: new Date().toISOString(),
    participants: 8,
  }

  useEffect(() => {
    // Get user media devices
    const getDevices = async () => {
      try {
        // Request permission to access media devices
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true })

        // Get list of available devices
        const devices = await navigator.mediaDevices.enumerateDevices()

        const audioInputs = devices.filter((device) => device.kind === "audioinput")
        const videoInputs = devices.filter((device) => device.kind === "videoinput")

        setAudioDevices(audioInputs)
        setVideoDevices(videoInputs)

        if (audioInputs.length > 0) {
          setSelectedAudioDevice(audioInputs[0].deviceId)
        }

        if (videoInputs.length > 0) {
          setSelectedVideoDevice(videoInputs[0].deviceId)
        }

        // Initialize stream with selected devices
        updateMediaStream()
      } catch (error) {
        console.error("Error accessing media devices:", error)
        toast({
          title: "Device access error",
          description: "Could not access your camera or microphone. Please check permissions.",
          variant: "destructive",
        })
      }
    }

    getDevices()

    // Cleanup function to stop all tracks when component unmounts
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Update media stream when device selection or enabled state changes
  useEffect(() => {
    updateMediaStream()
  }, [selectedAudioDevice, selectedVideoDevice, audioEnabled, videoEnabled])

  const updateMediaStream = async () => {
    // Stop all tracks in the current stream
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop())
    }

    try {
      const constraints: MediaStreamConstraints = {
        audio: audioEnabled ? { deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined } : false,
        video: videoEnabled ? { deviceId: selectedVideoDevice ? { exact: selectedVideoDevice } : undefined } : false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setLocalStream(stream)

      // Set the stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error updating media stream:", error)
    }
  }

  const handleJoinMeeting = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to join the meeting",
        variant: "destructive",
      })
      return
    }

    setIsJoining(true)

    // Simulate waiting room if enabled
    if (meetingData.waitingRoom) {
      setIsWaiting(true)

      // Simulate host admitting after 3 seconds
      setTimeout(() => {
        setIsWaiting(false)
        router.push(
          `/dashboard/meetings/room/${params.id}?audio=${audioEnabled}&video=${videoEnabled}&name=${encodeURIComponent(name)}`,
        )
      }, 3000)
    } else {
      // Direct join if no waiting room
      router.push(
        `/dashboard/meetings/room/${params.id}?audio=${audioEnabled}&video=${videoEnabled}&name=${encodeURIComponent(name)}`,
      )
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center p-4">
      {isWaiting ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Waiting to join</CardTitle>
            <CardDescription>The host will let you in soon</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4 p-6 text-center">
            <div className="relative h-16 w-16 animate-pulse rounded-full bg-primary/20">
              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"></div>
            </div>
            <p className="text-lg font-medium">Please wait</p>
            <p className="text-sm text-muted-foreground">The meeting host will admit you shortly</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.back()}>
              Leave waiting room
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid w-full gap-6 md:grid-cols-2">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Join Meeting</CardTitle>
              <CardDescription>
                {meetingData.title} hosted by {meetingData.host}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Meeting ID</Label>
                <div className="flex items-center rounded-md border bg-muted/50 px-3 py-2">
                  <code className="text-sm">{params.id}</code>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  {audioEnabled ? (
                    <Mic className="h-5 w-5 text-green-500" />
                  ) : (
                    <MicOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Microphone</p>
                    <p className="text-xs text-muted-foreground">{audioEnabled ? "Enabled" : "Disabled"}</p>
                  </div>
                </div>
                <Switch checked={audioEnabled} onCheckedChange={setAudioEnabled} />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  {videoEnabled ? (
                    <VideoIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <VideoOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Camera</p>
                    <p className="text-xs text-muted-foreground">{videoEnabled ? "Enabled" : "Disabled"}</p>
                  </div>
                </div>
                <Switch checked={videoEnabled} onCheckedChange={setVideoEnabled} />
              </div>

              <Tabs defaultValue="devices" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="devices">
                    <Settings className="mr-2 h-4 w-4" />
                    Devices
                  </TabsTrigger>
                  <TabsTrigger value="participants">
                    <Users className="mr-2 h-4 w-4" />
                    Participants
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="devices" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="audio-device">Microphone</Label>
                    <Select value={selectedAudioDevice} onValueChange={setSelectedAudioDevice} disabled={!audioEnabled}>
                      <SelectTrigger id="audio-device">
                        <SelectValue placeholder="Select microphone" />
                      </SelectTrigger>
                      <SelectContent>
                        {audioDevices.map((device) => (
                          <SelectItem key={device.deviceId} value={device.deviceId}>
                            {device.label || `Microphone ${audioDevices.indexOf(device) + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-device">Camera</Label>
                    <Select value={selectedVideoDevice} onValueChange={setSelectedVideoDevice} disabled={!videoEnabled}>
                      <SelectTrigger id="video-device">
                        <SelectValue placeholder="Select camera" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoDevices.map((device) => (
                          <SelectItem key={device.deviceId} value={device.deviceId}>
                            {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="participants">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Current participants</p>
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {meetingData.participants}
                      </span>
                    </div>
                    <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border p-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg" alt="Jane Muthoni" />
                          <AvatarFallback>JM</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Jane Muthoni (Host)</span>
                      </div>
                      {Array.from({ length: meetingData.participants - 1 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg" alt={`Participant ${i + 1}`} />
                            <AvatarFallback>P{i + 1}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Participant {i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button onClick={handleJoinMeeting} disabled={isJoining}>
                {isJoining ? "Joining..." : "Join Meeting"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle>Preview</CardTitle>
              <CardDescription>Check your video and audio before joining</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center p-0">
              {videoEnabled ? (
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-8 text-center">
                  <Avatar className="mb-4 h-24 w-24">
                    <AvatarFallback className="text-3xl">
                      {name ? name.substring(0, 2).toUpperCase() : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">Camera is turned off</p>
                  <p className="text-sm text-muted-foreground">Enable your camera to see a preview</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center space-x-2 border-t p-2">
              <Button
                variant={audioEnabled ? "default" : "outline"}
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={videoEnabled ? "default" : "outline"}
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setVideoEnabled(!videoEnabled)}
              >
                {videoEnabled ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
