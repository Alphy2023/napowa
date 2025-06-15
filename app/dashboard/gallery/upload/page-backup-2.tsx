"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { toast, useToast } from "@/hooks/use-toast"
import { uploadFileToCloudinary } from "@/lib/upload-files" // Assuming this utility exists

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Upload,
  X,
  Plus,
  ImageIcon,
  FileText,
  File,
  ArrowLeft,
  VideoIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  Trash,
} from 'lucide-react'
import { v4 as uuidv4 } from "uuid"
import { Progress } from "@/components/ui/progress"

// Types for Cloudinary response (reused from landing-page-settings.tsx)
interface CloudinaryMediaData {
  url: string
  public_id: string
  asset_id: string
  version: number
  format: string
  width?: number // Optional for videos
  height?: number // Optional for videos
  bytes: number
  original_filename: string
}

interface UploadingMedia {
  id: string
  file: File
  progress: number
  status: "idle" | "uploading" | "success" | "error"
  error?: string
  cloudinaryData?: CloudinaryMediaData
  localUrl?: string // Added for local preview URL
}

// Zod Schema for a single media item
const MediaSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["image", "video"]),
  file: z.any().optional(), // Use optional as it might be replaced by cloudinaryData
  cloudinaryData: z
    .object({
      url: z.string().url("Invalid URL format"),
      public_id: z.string(),
      asset_id: z.string(),
      version: z.number(),
      format: z.string(),
      bytes: z.number(),
      original_filename: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    })
    .nullable(),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  album: z.string().min(1, "Album is required."),
  tags: z.string().optional(),
  isFeatured: z.boolean().default(false),
})

// Zod Schema for the entire form
const FormSchema = z.object({
  mediaItems: z.array(MediaSchema).min(1, "At least one media item is required."),
})

type FormValues = z.infer<typeof FormSchema>

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

export default function GalleryUploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  // const fileInputRef = useRef<HTMLInputElement>(null) // No longer needed as inputs are per-card
  const [isUploadingGlobal, setIsUploadingGlobal] = useState(false)
  const [uploadingMediaItems, setUploadingMediaItems] = useState<Record<string, UploadingMedia>>({})

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty, isValidating, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mediaItems: [],
    },
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "mediaItems",
  })

  const mediaItems = watch("mediaItems")

  // Effect to manage global uploading state
  useEffect(() => {
    const uploading = Object.values(uploadingMediaItems).some(
      (item) => item.status === "uploading"
    )
    setIsUploadingGlobal(uploading)
  }, [uploadingMediaItems])


  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    type: "image" | "video",
    fieldId?: string // Optional: if we are updating an existing field
  ) => {
    // Prevent default behavior for drag events
    if ("dataTransfer" in e) {
      e.preventDefault()
      e.stopPropagation()
    }

    let files: File[] = []
    if ("files" in e.target && e.target.files) {
      files = Array.from(e.target.files)
    } else if ("dataTransfer" in e && e.dataTransfer.files) {
      files = Array.from(e.dataTransfer.files)
    }

    if (files.length === 0) return

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        })
        continue
      }

      if (type === "image" && !file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: `"${file.name}" is not an image file. Please select an image.`,
          variant: "destructive",
        })
        continue
      }

      if (type === "video" && !file.type.startsWith("video/")) {
        toast({
          title: "Invalid File Type",
          description: `"${file.name}" is not a video file. Please select a video.`,
          variant: "destructive",
        })
        continue
      }

      const newId = fieldId || uuidv4()
      const localUrl = URL.createObjectURL(file); // Create local URL for preview

      const newMediaItem = {
        id: newId,
        type: file.type.startsWith("image/") ? "image" : "video", // Determine type from file itself
        file: file,
        cloudinaryData: null,
        title: file.name.split('.').slice(0, -1).join('.'), // Default title to filename
        description: "",
        album: "",
        tags: "",
        isFeatured: false,
      }

      // Add to form array
      if (!fieldId) { // Only append if it's a new file, not replacing an existing one
        append(newMediaItem)
      } else {
        const fieldIndex = fields.findIndex(f => f.id === fieldId)
        if (fieldIndex !== -1) {
          // Revoke old local URL if replacing an existing file
          const oldUploadingItem = uploadingMediaItems[fieldId];
          if (oldUploadingItem?.localUrl) {
            URL.revokeObjectURL(oldUploadingItem.localUrl);
          }
          setValue(`mediaItems.${fieldIndex}`, newMediaItem, { shouldValidate: true })
        }
      }

      const uploadingItem: UploadingMedia = {
        id: newId,
        file,
        progress: 0,
        status: "idle",
        localUrl, // Store local URL
      }

      setUploadingMediaItems((prev) => ({
        ...prev,
        [newId]: uploadingItem,
      }))

      try {
        // await uploadFileToCloudinary(uploadingItem, {
        //   onProgress: (id, progress) => {
        //     setUploadingMediaItems((prev) => ({
        //       ...prev,
        //       [id]: { ...prev[id], progress, status: "uploading" },
        //     }))
        //   },
        //   onSuccess: (id, result) => {
        //     const cloudinaryData: CloudinaryMediaData = {
        //       url: result.url,
        //       public_id: result.public_id,
        //       asset_id: result.asset_id,
        //       version: result.version,
        //       format: result.format,
        //       bytes: result.bytes,
        //       original_filename: result.original_filename,
        //       width: result.width,
        //       height: result.height,
        //     }

        //     setUploadingMediaItems((prev) => {
        //       const currentItem = prev[id];
        //       if (currentItem?.localUrl) {
        //         URL.revokeObjectURL(currentItem.localUrl); // Revoke local URL after successful upload
        //       }
        //       return {
        //         ...prev,
        //         [id]: {
        //           ...prev[id],
        //           status: "success",
        //           cloudinaryData,
        //           localUrl: undefined, // Clear local URL
        //         },
        //       };
        //     });

        //     const index = fields.findIndex((f) => f.id === id)
        //     if (index !== -1) {
        //       setValue(`mediaItems.${index}.cloudinaryData`, cloudinaryData, { shouldValidate: true })
        //       setValue(`mediaItems.${index}.file`, undefined) // Clear the file object after successful upload
        //     }

        //     toast({
        //       title: "Upload Successful",
        //       description: `${file.name} uploaded successfully!`,
        //     })
        //   },
        //   onFailure: (id, errorMessage) => {
        //     setUploadingMediaItems((prev) => ({
        //       ...prev,
        //       [id]: {
        //         ...prev[id],
        //         status: "error",
        //         error: errorMessage,
        //       },
        //     }))

        //     toast({
        //       title: "Upload Failed",
        //       description: `${file.name}: ${errorMessage}`,
        //       variant: "destructive",
        //     })
        //   },
        //   onStatusChange: (id, status) => {
        //     setUploadingMediaItems((prev) => ({
        //       ...prev,
        //       [id]: { ...prev[id], status },
        //     }))
        //   },
        // })
      } catch (error) {
        console.error("Upload error:", error)
        const errorMessage = (error as Error).message || "An unexpected error occurred during upload."
        setUploadingMediaItems((prev) => ({
          ...prev,
          [newId]: {
            ...prev[newId],
            status: "error",
            error: errorMessage,
          },
        }))
        toast({
          title: "Upload Failed",
          description: `${file.name}: ${errorMessage}`,
          variant: "destructive",
        })
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const retryUpload = async (mediaId: string) => {
    const uploadingItem = uploadingMediaItems[mediaId]
    if (uploadingItem && uploadingItem.file) {
      // Create a synthetic event to reuse the upload logic
      const syntheticEvent = {
        target: { files: [uploadingItem.file] },
        // Add preventDefault and stopPropagation for synthetic drag event if needed, but handleFileChange now handles it
        preventDefault: () => {},
        stopPropagation: () => {},
      } as React.ChangeEvent<HTMLInputElement> // Cast for type compatibility

      await handleFileChange(syntheticEvent, uploadingItem.file.type.startsWith("image/") ? "image" : "video", mediaId)
    }
  }

  const removeMediaItem = (index: number) => {
    const itemToRemove = fields[index]
    const uploadingState = uploadingMediaItems[itemToRemove.id];

    if (uploadingState?.localUrl) {
      URL.revokeObjectURL(uploadingState.localUrl); // Revoke object URL for local previews if it exists
    }
    
    setUploadingMediaItems((prev) => {
      const newState = { ...prev }
      delete newState[itemToRemove.id]
      return newState
    })
    remove(index)
  }


  const onSubmit = async (data: FormValues) => {
    // Check if all images are uploaded successfully
    const hasPendingUploads = Object.values(uploadingMediaItems).some(
      (item) => item.status === "uploading" || item.status === "error"
    )

    if (hasPendingUploads) {
      toast({
        title: "Upload in Progress",
        description: "Please wait for all files to finish uploading or resolve errors.",
        variant: "destructive",
      })
      return
    }

    try {
      // Filter out media items that don't have cloudinaryData (failed uploads, etc.)
      const validMediaItems = data.mediaItems.filter(item => item.cloudinaryData !== null);

      if (validMediaItems.length === 0) {
        toast({
          title: "No valid files to save",
          description: "Please upload at least one image or video successfully.",
          variant: "destructive",
        });
        return;
      }

      // Here you would typically send `validMediaItems` to your backend API
      console.log("Submitting media items:", validMediaItems)

      // Simulate API call
      setIsUploadingGlobal(true)
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast({
        title: "Gallery Updated",
        description: `${validMediaItems.length} media item(s) saved successfully.`,
      })
      reset({ mediaItems: [] }) // Clear the form after successful submission
      setUploadingMediaItems({}) // Clear uploading state
      router.push("/dashboard/gallery")
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "An error occurred while saving media items.",
        variant: "destructive",
      })
    } finally {
      setIsUploadingGlobal(false)
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />
    } else if (fileType.startsWith("video/")) {
      return <VideoIcon className="h-6 w-6 text-purple-500" />
    } else {
      return <File className="h-6 w-6 text-muted-foreground" />
    }
  }

  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`
    }
  }

  const renderMediaPreview = (mediaItem: typeof mediaItems[number], index: number) => {
    const uploadingState = uploadingMediaItems[mediaItem.id]
    const isUploading = uploadingState?.status === "uploading"
    const hasError = uploadingState?.status === "error"
    const isSuccess = uploadingState?.status === "success" || mediaItem.cloudinaryData?.url

    let previewSrc: string | undefined = undefined;
    if (uploadingState?.localUrl) { // Use localUrl if available (for pending uploads)
      previewSrc = uploadingState.localUrl;
    } else if (mediaItem.cloudinaryData?.url) { // Otherwise, use Cloudinary URL
      previewSrc = mediaItem.cloudinaryData.url;
    }

    return (
      <div
        className={cn(
          "relative h-[150px] w-full rounded-md border-2 border-dashed transition-all duration-200 overflow-hidden",
          hasError
            ? "border-destructive bg-destructive/5"
            : isUploading
              ? "border-primary bg-primary/5"
              : isSuccess
                ? "border-green-500 bg-green-50"
                : "border-muted-foreground/25 bg-muted/50",
        )}
        onDragOver={handleDragOver}
        onDrop={(e) => handleFileChange(e, mediaItem.type, mediaItem.id)}
      >
        {isSuccess && previewSrc && (mediaItem.type === "image" ? (
          <Image
            src={previewSrc}
            alt="Media preview"
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <video
            src={previewSrc}
            controls
            className="object-cover rounded-md w-full h-full"
          />
        ))}

        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-black"
              onClick={(e) => {
                e.preventDefault()
                // Trigger the hidden input for this specific media item
                document.getElementById(`file-upload-input-${mediaItem.id}`)?.click()
              }}
            >
              <Upload className="h-4 w-4 mr-1" />
              Change
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="bg-red-500/90 hover:bg-red-600"
              onClick={(e) => {
                e.preventDefault()
                removeMediaItem(index)
              }}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isUploading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm font-medium text-primary mb-2">Uploading...</p>
            <Progress value={uploadingState?.progress || 0} className="w-full max-w-xs h-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(uploadingState?.progress || 0)}%</p>
          </div>
        ) : hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 text-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-sm font-medium text-destructive mb-2">Upload Failed</p>
            <p className="text-xs text-muted-foreground text-center mb-3">{uploadingState?.error}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                retryUpload(mediaItem.id)
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            {mediaItem.cloudinaryData?.url ? (
              <Badge variant="secondary" className="absolute top-2 right-2 bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Uploaded
              </Badge>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-muted-foreground mb-1">Click or drag to upload {mediaItem.type}</p>
                <p className="text-xs text-muted-foreground">Max 10MB</p>
              </>
            )}
          </div>
        )}

        {/* Hidden file input for this specific media item */}
        <input
          id={`file-upload-input-${mediaItem.id}`}
          type="file"
          accept={mediaItem.type === "image" ? "image/*" : "video/*"}
          className="hidden"
          onChange={(e) => handleFileChange(e, mediaItem.type, mediaItem.id)}
        />
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Upload Images & Videos</h2>
          <p className="text-muted-foreground">
            Upload images & videos to the gallery for display on the website.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Media</CardTitle>
              <CardDescription>
                Select the type of media you want to upload and add new items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                onClick={() => append({
                  id: uuidv4(),
                  type: "image", // Default to image for new append
                  file: undefined,
                  cloudinaryData: null,
                  title: "",
                  description: "",
                  album: "",
                  tags: "",
                  isFeatured: false,
                })}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Image
              </Button>
              <Button
                type="button"
                onClick={() => append({
                  id: uuidv4(),
                  type: "video", // Default to video for new append
                  file: undefined,
                  cloudinaryData: null,
                  title: "",
                  description: "",
                  album: "",
                  tags: "",
                  isFeatured: false,
                })}
                variant="outline"
                className="w-full sm:w-auto ml-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Video
              </Button>
            </CardContent>
          </Card>

          {fields.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No media items added yet. Click "Add New Image" or "Add New Video" to start.
            </div>
          )}

          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    {field.type === "image" ? "Image" : "Video"} Upload
                  </CardTitle>
                  <Badge variant="outline" className="bg-white/50">
                    {uploadingMediaItems[field.id]?.status === "success" || field.cloudinaryData ? "Uploaded" : "Pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* File Upload Area */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    {field.type === "image" ? "Image File" : "Video File"}
                  </Label>
                  {renderMediaPreview(field, index)}
                  {errors.mediaItems?.[index]?.cloudinaryData && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      A valid file upload is required.
                    </p>
                  )}
                </div>

                <Separator />

                {/* Media Details */}
                <div className="space-y-2">
                  <Label htmlFor={`title-${field.id}`}>Title</Label>
                  <Input
                    id={`title-${field.id}`}
                    placeholder="Enter title"
                    {...control.register(`mediaItems.${index}.title`)}
                    className={cn(errors.mediaItems?.[index]?.title && "border-destructive")}
                  />
                  {errors.mediaItems?.[index]?.title && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.mediaItems[index]?.title?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${field.id}`}>Description</Label>
                  <Textarea
                    id={`description-${field.id}`}
                    placeholder="Enter description"
                    {...control.register(`mediaItems.${index}.description`)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`album-${field.id}`}>Album</Label>
                  <Select
                    value={field.album}
                    onValueChange={(value) => setValue(`mediaItems.${index}.album`, value, { shouldValidate: true })}
                  >
                    <SelectTrigger id={`album-${field.id}`} className={cn(errors.mediaItems?.[index]?.album && "border-destructive")}>
                      <SelectValue placeholder="Select album" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Events">Events</SelectItem>
                      <SelectItem value="Workshops">Workshops</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Seminars">Seminars</SelectItem>
                      <SelectItem value="Support Groups">Support Groups</SelectItem>
                      <SelectItem value="Children">Children</SelectItem>
                      <SelectItem value="Meetings">Meetings</SelectItem>
                      <SelectItem value="Outreach">Outreach</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.mediaItems?.[index]?.album && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.mediaItems[index]?.album?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`tags-${field.id}`}>Tags</Label>
                  <Input
                    id={`tags-${field.id}`}
                    placeholder="Enter tags separated by commas"
                    {...control.register(`mediaItems.${index}.tags`)}
                  />
                  {field.tags && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {field.tags.split(",").map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`featured-${field.id}`}
                    checked={field.isFeatured}
                    onCheckedChange={(checked) => setValue(`mediaItems.${index}.isFeatured`, checked)}
                  />
                  <Label htmlFor={`featured-${field.id}`}>Featured Media</Label>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t flex justify-end items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMediaItem(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Remove Media
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Submission Card (moved to a separate column) */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Save Gallery</CardTitle>
              <CardDescription>
                Review and save all your uploaded media items to the gallery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                You have {mediaItems.length} media item(s) to be saved.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-napowa-blue hover:bg-napowa-blue/80 text-white"
                disabled={isSubmitting || isUploadingGlobal || !isDirty} // Disable if uploading or no changes
              >
                {isSubmitting || isUploadingGlobal ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Save All ({mediaItems.length})
                  </>
                )}
              </Button>
            </CardFooter>
            {Object.keys(errors).length > 0 && (
              <CardContent className="pt-0">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                  <p className="text-destructive font-medium flex items-center justify-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    Please fix the errors in your media items before saving.
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </form>
    </div>
  )
}