"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { mediaSchema, type MediaFormValues } from "@/lib/validations/media"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MEDIA_CATEGORIES } from "@/types/media"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MediaUploadFormProps {
  onSubmit: (data: MediaFormValues) => void
  initialValues?: Partial<MediaFormValues>
}

export function MediaUploadForm({ onSubmit, initialValues }: MediaUploadFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.url || null)
  const [previewType, setPreviewType] = useState<"image" | "video">(initialValues?.type || "image")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
  } = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      type: initialValues?.type || "image",
      url: initialValues?.url || "",
      thumbnailUrl: initialValues?.thumbnailUrl || "",
      category: initialValues?.category || MEDIA_CATEGORIES[0],
    },
  })

  const watchType = watch("type")
  const watchUrl = watch("url")

  // Update preview when URL changes
  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setValue("url", url)
    await trigger("url")

    if (!errors.url && url) {
      setPreviewUrl(url)
    }
  }

  // Update type when radio changes
  const handleTypeChange = (value: "image" | "video") => {
    setValue("type", value)
    setPreviewType(value)
    trigger("url")
  }

  // Extract video ID from YouTube or Vimeo URLs
  const getVideoThumbnail = (url: string) => {
    try {
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.includes("youtu.be")
          ? url.split("/").pop()
          : new URLSearchParams(new URL(url).search).get("v")

        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }
      }

      // For Vimeo, we would need an API call to get the thumbnail
      // This is simplified for the example

      return null
    } catch (error) {
      return null
    }
  }

  // Auto-generate thumbnail URL for videos
  const handleAutoGenerateThumbnail = () => {
    const url = watchUrl
    if (url && watchType === "video") {
      const thumbnail = getVideoThumbnail(url)
      if (thumbnail) {
        setValue("thumbnailUrl", thumbnail)
      }
    }
  }

  const processSubmit = (data: MediaFormValues) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} placeholder="Enter media title" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea id="description" {...register("description")} placeholder="Enter media description" rows={3} />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Media Type</Label>
        <RadioGroup
          defaultValue={watchType}
          onValueChange={(value) => handleTypeChange(value as "image" | "video")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="image" id="media-type-image" />
            <Label htmlFor="media-type-image">Image</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="media-type-video" />
            <Label htmlFor="media-type-video">Video</Label>
          </div>
        </RadioGroup>
        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">{watchType === "image" ? "Image URL" : "Video URL"}</Label>
        <Input
          id="url"
          placeholder={watchType === "image" ? "https://example.com/image.jpg" : "https://youtube.com/watch?v=..."}
          onChange={handleUrlChange}
          {...register("url")}
        />
        {watchType === "video" && (
          <p className="text-xs text-muted-foreground">Supports YouTube, Vimeo, or direct video file URLs</p>
        )}
        {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}
      </div>

      {watchType === "video" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="thumbnailUrl">Thumbnail URL (Optional)</Label>
            <Button
              type="button"
              variant="link"
              size="sm"
              className="text-xs h-auto p-0"
              onClick={handleAutoGenerateThumbnail}
            >
              Auto-generate
            </Button>
          </div>
          <Input id="thumbnailUrl" placeholder="https://example.com/thumbnail.jpg" {...register("thumbnailUrl")} />
          <p className="text-xs text-muted-foreground">For YouTube videos, you can use the auto-generate button</p>
          {errors.thumbnailUrl && <p className="text-sm text-red-500">{errors.thumbnailUrl.message}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          defaultValue={initialValues?.category || MEDIA_CATEGORIES[0]}
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {MEDIA_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
      </div>

      {/* Preview */}
      {previewUrl && !errors.url && (
        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="border rounded-md p-2 bg-muted/30">
            {previewType === "image" ? (
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="max-h-[200px] mx-auto object-contain"
                onError={() => setPreviewUrl(null)}
              />
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center">
                {watchType === "video" && watchUrl.includes("youtube.com") ? (
                  <div className="w-full aspect-video">
                    <img
                      src={getVideoThumbnail(watchUrl) || "/placeholder.svg?height=200&width=300"}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/50 p-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="white" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-sm text-muted-foreground">Video preview not available</p>
                    <p className="text-xs mt-1">The video will be playable after submission</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please fix the errors above before submitting.</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialValues ? "Update Media" : "Add Media"}
        </Button>
      </div>
    </form>
  )
}
