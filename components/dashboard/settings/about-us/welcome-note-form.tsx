"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Loader2, Upload, X, CheckCircle, AlertCircle, Camera } from "lucide-react"
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

interface UploadingImage {
  id: string
  file: File
  progress: number
  status: "idle" | "uploading" | "success" | "error"
  error?: string
  cloudinaryData?: CloudinaryImageData
}

interface WelcomeNote {
  id: string
  title: string
  description: string
  content: string
  image: CloudinaryImageData | null
  isActive: boolean
}

export const WelcomeNoteForm = () => {
  const [welcomeNote, setWelcomeNote] = useState<WelcomeNote | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState<UploadingImage | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    isActive: true,
  })

  useEffect(() => {
    fetchWelcomeNote()
  }, [])

  const fetchWelcomeNote = async () => {
    try {
      const response = await fetch("/api/about-us/welcome-note")
      const data = await response.json()
      if (data && data.id) {
        setWelcomeNote(data)
        setFormData({
          title: data.title,
          description: data.description,
          content: data.content,
          isActive: data.isActive,
        })
      }
    } catch (error) {
      console.error("Error fetching welcome note:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      })
      return
    }

    const uploadId = uuidv4()
    const uploadingImage: UploadingImage = {
      id: uploadId,
      file,
      progress: 0,
      status: "idle",
    }

    setUploadingImage(uploadingImage)

    try {
      await uploadFileToCloudinary(uploadingImage, {
        onProgress: (id, progress) => {
          setUploadingImage((prev) => prev ? { ...prev, progress, status: "uploading" } : null)
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
          setUploadingImage((prev) => prev ? { ...prev, status: "success", cloudinaryData } : null)
          toast({
            title: "Upload Successful",
            description: "Image uploaded successfully!",
          })
        },
        onFailure: (id, errorMessage) => {
          setUploadingImage((prev) => prev ? { ...prev, status: "error", error: errorMessage } : null)
          toast({
            title: "Upload Failed",
            description: errorMessage,
            variant: "destructive",
          })
        },
      })
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        ...formData,
        image: uploadingImage?.cloudinaryData || welcomeNote?.image || null,
      }

      const method = welcomeNote ? "PUT" : "POST"
      const url = "/api/about-us/welcome-note"
      const body = welcomeNote ? { id: welcomeNote.id, ...payload } : payload

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const data = await response.json()
        setWelcomeNote(data)
        setUploadingImage(null)
        toast({
          title: "Success",
          description: "Welcome note saved successfully!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save welcome note",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const removeImage = () => {
    setUploadingImage(null)
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

  const hasImage = uploadingImage?.cloudinaryData?.url || welcomeNote?.image?.url
  const isUploading = uploadingImage?.status === "uploading"
  const hasError = uploadingImage?.status === "error"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Note Section</CardTitle>
        <CardDescription>Manage the welcome note that appears at the top of the About page</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Welcome to NAPOWA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the welcome section"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Main welcome message content"
            rows={6}
          />
        </div>

        <div className="space-y-3">
          <Label>Image</Label>
          <div
            className={cn(
              "relative h-64 w-full rounded-lg border-2 border-dashed transition-all duration-200",
              hasError
                ? "border-destructive bg-destructive/5"
                : isUploading
                  ? "border-primary bg-primary/5"
                  : hasImage
                    ? "border-green-500 bg-green-50"
                    : "border-muted-foreground/25 bg-muted/50 hover:border-primary hover:bg-primary/5",
              "overflow-hidden",
            )}
          >
            <label htmlFor="image-upload" className="relative w-full h-full cursor-pointer block">
              {hasImage && !isUploading ? (
                <>
                  <Image
                    src={uploadingImage?.cloudinaryData?.url || welcomeNote?.image?.url || ""}
                    alt="Welcome image"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("image-upload")?.click()
                    }}>
                      <Camera className="h-4 w-4 mr-1" />
                      Change
                    </Button>
                    <Button size="sm" variant="destructive" onClick={(e) => {
                      e.preventDefault()
                      removeImage()
                    }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Uploaded
                  </Badge>
                </>
              ) : isUploading ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  <p className="text-sm font-medium text-primary">Uploading...</p>
                </div>
              ) : hasError ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <AlertCircle className="h-8 w-8 text-destructive mb-2" />
                  <p className="text-sm text-destructive text-center">{uploadingImage?.error}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <Label htmlFor="active">Active Section</Label>
          <Switch
            id="active"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Save Welcome Note
        </Button>
      </CardContent>
    </Card>
  )
}
