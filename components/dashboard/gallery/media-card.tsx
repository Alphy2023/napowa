"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { Media } from "@/types/media"
import { Play, ImageIcon, Edit, Trash } from "lucide-react"
import { MediaUploadForm } from "./media-upload-form"
import { useMedia } from "@/hooks/useMedia"

interface MediaCardProps {
  media: Media
}

export function MediaCard({ media }: MediaCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { updateMedia, deleteMedia } = useMedia()

  const handleUpdate = async (formData: any) => {
    await updateMedia(media.id, formData)
    setIsEditOpen(false)
  }

  const handleDelete = async () => {
    await deleteMedia(media.id)
    setIsDeleteDialogOpen(false)
  }

  const renderThumbnail = () => {
    if (media.type === "video") {
      return (
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
          <img
            src={media.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
            alt={media.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="aspect-video bg-muted rounded-md overflow-hidden cursor-pointer"
          onClick={() => setIsPreviewOpen(true)}
        >
          <img
            src={media.url || "/placeholder.svg"}
            alt={media.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      )
    }
  }

  const renderMediaPreview = () => {
    if (media.type === "video") {
      // Handle YouTube videos
      if (media.url.includes("youtube.com") || media.url.includes("youtu.be")) {
        const videoId = media.url.includes("youtu.be")
          ? media.url.split("/").pop()
          : new URLSearchParams(new URL(media.url).search).get("v")

        return (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={media.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      }

      // Handle Vimeo videos
      if (media.url.includes("vimeo.com")) {
        const videoId = media.url.split("/").pop()

        return (
          <iframe
            width="100%"
            height="400"
            src={`https://player.vimeo.com/video/${videoId}`}
            title={media.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      }

      // Handle direct video files
      return (
        <video controls className="w-full max-h-[70vh]" src={media.url}>
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return (
        <img src={media.url || "/placeholder.svg"} alt={media.title} className="w-full max-h-[70vh] object-contain" />
      )
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-3">
          {renderThumbnail()}
          <div className="mt-2">
            <h3 className="font-medium truncate">{media.title}</h3>
            <p className="text-xs text-muted-foreground">{media.category}</p>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between">
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setIsPreviewOpen(true)}>
            {media.type === "video" ? <Play className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
            View
          </Button>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => setIsEditOpen(true)}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[800px] p-1 sm:p-6">
          {renderMediaPreview()}
          <div className="p-4">
            <h2 className="text-xl font-semibold">{media.title}</h2>
            {media.description && <p className="mt-2 text-muted-foreground">{media.description}</p>}
            <p className="mt-2 text-sm">Category: {media.category}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <h2 className="text-xl font-semibold mb-4">Edit Media</h2>
          <MediaUploadForm
            onSubmit={handleUpdate}
            initialValues={{
              title: media.title,
              description: media.description || "",
              type: media.type,
              url: media.url,
              thumbnailUrl: media.thumbnailUrl || "",
              category: media.category,
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <h2 className="text-xl font-semibold mb-4">Delete Media</h2>
          <p>Are you sure you want to delete "{media.title}"? This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
