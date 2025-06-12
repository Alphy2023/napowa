"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ImageIcon, Video, Loader2 } from "lucide-react"
import { MEDIA_CATEGORIES, type Media } from "@/types/media"

// Zod schema for media validation
const mediaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  description: z.string().optional(),
  type: z.enum(["image", "video"], {
    required_error: "Please select a media type",
  }),
  url: z.string().url("Please enter a valid URL"),
  thumbnailUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  category: z.string().min(1, "Please select a category"),
})

type MediaFormValues = z.infer<typeof mediaSchema>

interface MediaUploadFormProps {
  media?: Media | null
  onSuccess: () => void
  onCancel: () => void
}

export function MediaUploadForm({ media, onSuccess, onCancel }: MediaUploadFormProps) {
  const [loading, setLoading] = useState(false)
  const [mediaPreview, setMediaPreview] = useState<{
    image: string | null
    video: string | null
  }>({
    image: media?.type === "image" ? media.url : null,
    video: media?.type === "video" ? media.url : null,
  })

  // Initialize react-hook-form with zod validation
  const form = useForm<MediaFormValues>({
    resolver: zodResolver(mediaSchema),
    defaultValues: {
      title: media?.title || "",
      description: media?.description || "",
      type: media?.type || "image",
      url: media?.url || "",
      thumbnailUrl: media?.thumbnailUrl || "",
      category: media?.category || "",
    },
  })

  // Watch form values for previewing media
  const mediaType = form.watch("type")
  const mediaUrl = form.watch("url")

  // Update media previews when URLs change
  const onMediaUrlChange = (url: string) => {
    form.setValue("url", url)
    if (mediaType === "image") {
      setMediaPreview((prev) => ({ ...prev, image: url || null }))
    } else {
      setMediaPreview((prev) => ({ ...prev, video: url || null }))
    }
  }

  // Handle media type change
  const onMediaTypeChange = (type: "image" | "video") => {
    form.setValue("type", type)
    form.setValue("url", "")
    form.setValue("thumbnailUrl", "")
    setMediaPreview({ image: null, video: null })
  }

  const onSubmit = async (data: MediaFormValues) => {
    setLoading(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch(media ? `/api/media/${media.id}` : '/api/media', {
      //   method: media ? 'PUT' : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })

      // For demo purposes, simulate a successful response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: `Media ${media ? "updated" : "uploaded"} successfully!`,
      })

      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${media ? "update" : "upload"} media. Please try again.`,
        variant: "destructive",
      })
      console.error("Media upload error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter media title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your media" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media Type</FormLabel>
              <Select
                onValueChange={(value) => onMediaTypeChange(value as "image" | "video")}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select media type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="image">
                    <div className="flex items-center">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Image
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center">
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MEDIA_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{mediaType === "image" ? "Image URL" : "Video URL"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    mediaType === "image"
                      ? "https://example.com/image.jpg"
                      : "https://example.com/video.mp4 or YouTube/Vimeo URL"
                  }
                  {...field}
                  onChange={(e) => onMediaUrlChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                {mediaType === "image"
                  ? "Enter a direct link to your image"
                  : "Enter a direct video URL or YouTube/Vimeo link"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {mediaType === "video" && (
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/thumbnail.jpg" {...field} />
                </FormControl>
                <FormDescription>Enter a thumbnail image URL for your video</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Media Preview */}
        {mediaUrl && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Preview</h3>
            {mediaType === "image" ? (
              <img
                src={mediaUrl || "/placeholder.svg"}
                alt="Media preview"
                className="w-full h-auto rounded-lg object-cover aspect-video"
                onError={() => {
                  setMediaPreview((prev) => ({ ...prev, image: null }))
                  form.setError("url", {
                    type: "manual",
                    message: "Failed to load image. Please check the URL.",
                  })
                }}
              />
            ) : (
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                {mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be") ? (
                  <iframe
                    src={mediaUrl.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allowFullScreen
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                ) : mediaUrl.includes("vimeo.com") ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${mediaUrl.split("/").pop()}`}
                    className="w-full h-full"
                    allowFullScreen
                    title="Vimeo video player"
                    allow="autoplay; fullscreen; picture-in-picture"
                  ></iframe>
                ) : (
                  <video
                    src={mediaUrl}
                    controls
                    className="w-full h-full"
                    onError={() => {
                      setMediaPreview((prev) => ({ ...prev, video: null }))
                      form.setError("url", {
                        type: "manual",
                        message: "Failed to load video. Please check the URL.",
                      })
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {media ? "Update" : "Upload"} Media
          </Button>
        </div>
      </form>
    </Form>
  )
}
