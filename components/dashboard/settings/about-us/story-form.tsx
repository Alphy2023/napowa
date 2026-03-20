"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Loader2, Plus, Trash2, Camera, Upload, X, CheckCircle, AlertCircle, ArrowUp, ArrowDown } from "lucide-react"
import { uploadFileToCloudinary } from "@/lib/upload-files"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"

interface CloudinaryImageData {
  url: string
  public_id: string
  asset_id: string
  version: number
  format: string
  width: number
  height: number
  bytes: number
  original_filename: string
}

interface Story {
  id: string
  title: string
  description: string
  content: string
  image: CloudinaryImageData | null
  order: number
  isActive: boolean
}

export const StoryForm = () => {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState<Record<string, { progress: number; status: string }>>({})
  const [newStory, setNewStory] = useState({ title: "", description: "", content: "", isActive: true })
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch("/api/about-us/story")
      const data = await response.json()
      setStories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching stories:", error)
      toast({ title: "Error", description: "Failed to fetch stories", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleAddStory = () => {
    if (!newStory.title || !newStory.description || !newStory.content) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" })
      return
    }

    const story: Story = {
      id: uuidv4(),
      ...newStory,
      image: null,
      order: stories.length + 1,
    }

    setStories([...stories, story])
    setNewStory({ title: "", description: "", content: "", isActive: true })
  }

  const handleDeleteStory = (id: string) => {
    setStories(stories.filter((s) => s.id !== id))
  }

  const handleMoveStory = (id: string, direction: "up" | "down") => {
    const index = stories.findIndex((s) => s.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === stories.length - 1)) return

    const newStories = [...stories]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newStories[index], newStories[swapIndex]] = [newStories[swapIndex], newStories[index]]

    newStories.forEach((story, i) => {
      story.order = i + 1
    })

    setStories(newStories)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, storyId: string) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith("image/")) {
      toast({ title: "Invalid File", description: "Please select a valid image file.", variant: "destructive" })
      return
    }

    setUploadingImages((prev) => ({ ...prev, [storyId]: { progress: 0, status: "uploading" } }))

    try {
      const uploadingImage = { id: storyId, file, progress: 0, status: "uploading" }
      await uploadFileToCloudinary(uploadingImage, {
        onProgress: (id, progress) => {
          setUploadingImages((prev) => ({ ...prev, [id]: { progress, status: "uploading" } }))
        },
        onSuccess: (id, result) => {
          const cloudinaryData: CloudinaryImageData = {
            url: result.url,
            public_id: result.public_id,
            asset_id: result.asset_id,
            version: result.version,
            format: result.format,
            width: result.width,
            height: result.height,
            bytes: result.bytes,
            original_filename: result.original_filename,
          }

          setStories((prev) =>
            prev.map((s) => (s.id === id ? { ...s, image: cloudinaryData } : s))
          )

          setUploadingImages((prev) => {
            const newState = { ...prev }
            delete newState[id]
            return newState
          })

          toast({ title: "Upload Successful", description: "Image uploaded successfully!" })
        },
        onFailure: (id, errorMessage) => {
          setUploadingImages((prev) => ({ ...prev, [id]: { progress: 0, status: "error" } }))
          toast({ title: "Upload Failed", description: errorMessage, variant: "destructive" })
        },
      })
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch("/api/about-us/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stories: stories.map((s) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            content: s.content,
            image: s.image,
            order: s.order,
            isActive: s.isActive,
          })),
        }),
      })

      toast({ title: "Success", description: "Stories saved successfully!" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to save stories", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Story</CardTitle>
          <CardDescription>Create a new story section for your About page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={newStory.title}
              onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
              placeholder="Story title"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={newStory.description}
              onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
              placeholder="Brief description"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              value={newStory.content}
              onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
              placeholder="Full story content"
              rows={4}
            />
          </div>
          <Button onClick={handleAddStory} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Story
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {stories.map((story, index) => (
          <Card key={story.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge>{`Story ${index + 1}`}</Badge>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveStory(story.id, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveStory(story.id, "down")}
                    disabled={index === stories.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteStory(story.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Input
                value={story.title}
                onChange={(e) =>
                  setStories(stories.map((s) => (s.id === story.id ? { ...s, title: e.target.value } : s)))
                }
                placeholder="Title"
              />

              <Textarea
                value={story.description}
                onChange={(e) =>
                  setStories(stories.map((s) => (s.id === story.id ? { ...s, description: e.target.value } : s)))
                }
                placeholder="Description"
                rows={2}
              />

              <Textarea
                value={story.content}
                onChange={(e) =>
                  setStories(stories.map((s) => (s.id === story.id ? { ...s, content: e.target.value } : s)))
                }
                placeholder="Content"
                rows={4}
              />

              <div className="space-y-2">
                <Label>Image</Label>
                <div className="relative h-40 w-full rounded-lg border-2 border-dashed bg-muted/50 overflow-hidden">
                  <label htmlFor={`story-image-${story.id}`} className="w-full h-full cursor-pointer block">
                    {story.image?.url ? (
                      <div className="relative w-full h-full">
                        <Image src={story.image.url} alt="Story image" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="sm" variant="secondary" onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(`story-image-${story.id}`)?.click()
                          }}>
                            <Camera className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={(e) => {
                            e.preventDefault()
                            setStories(stories.map((s) => (s.id === story.id ? { ...s, image: null } : s)))
                          }}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                        <p className="text-xs text-muted-foreground">Upload image</p>
                      </div>
                    )}
                    <input
                      id={`story-image-${story.id}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, story.id)}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch
                  checked={story.isActive}
                  onCheckedChange={(checked) =>
                    setStories(stories.map((s) => (s.id === story.id ? { ...s, isActive: checked } : s)))
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
        Save All Stories
      </Button>
    </div>
  )
}
