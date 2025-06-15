"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
 from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Save,
  Plus,
  Trash,
  ArrowUp,
  ArrowDown,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  RefreshCw,
} from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { uploadFileToCloudinary } from "@/lib/upload-files"
import { useLandingSlides } from "@/hooks/useLandingSlides"

// Types for Cloudinary response
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

// Zod Schema for a single slide
const SlideSchema = z.object({
  id: z.string(),
  image: z
    .object({
      url: z.string(),
      public_id: z.string(),
      asset_id: z.string(),
      version: z.number(),
      format: z.string(),
      width: z.number(),
      height: z.number(),
      bytes: z.number(),
      original_filename: z.string(),
    })
    .nullable(),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  buttonText: z.string().min(1, "Primary button text is required."),
  buttonLink: z.string().min(1, "Primary button link is required."),
  secondaryButtonText: z.string().min(1, "Secondary button text is required."),
  secondaryButtonLink: z.string().min(1, "Secondary button link is required."),
})

// Zod Schema for the entire form
const FormSchema = z.object({
  slides: z.array(SlideSchema).min(1, "At least one slide is required."),
})

type FormValues = z.infer<typeof FormSchema>

const DEFAULT_BUTTON_OPTIONS = [
  "Donate Now",
  "Our Programs",
  "Our Impact",
  "Partner With Us",
  "Become a Member",
  "Learn More",
]

const BUTTON_LINKS: Record<string, string> = {
  "Donate Now": "/donate",
  "Our Programs": "/programs",
  "Our Impact": "/impact",
  "Partner With Us": "/partner",
  "Become a Member": "/auth/signup",
  "Learn More": "/about",
}

export const LandingPageSettings = () => {
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [customButtons, setCustomButtons] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState<Record<string, UploadingImage>>({})

  // Use the simplified landing slides hook
  const { data, loading:slidesLoading, error:slidesError,
     createSlides, deleteSlide, refetch } = useLandingSlides()

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slides: [
        {
          id: uuidv4(),
          image: null,
          title: "",
          description: "",
          buttonText: "",
          buttonLink: "",
          secondaryButtonText: "",
          secondaryButtonLink: "",
        },
      ],
    },
    mode: "onChange",
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "slides",
  })
  // console.log(data.slides[0])
  const populateFields = useCallback(()=>{
    if (data?.slides && data.slides.length > 0 && !slidesLoading) {
          // Transform the slides to match the form structure
          const formattedSlides = data.slides.map((slide) => ({
            id: slide.id,
            image: slide.image,
            title: slide.title,
            description: slide.description,
            buttonText: slide.buttonText,
            buttonLink: slide.buttonLink,
            secondaryButtonText: slide.secondaryButtonText || "",
            secondaryButtonLink: slide.secondaryButtonLink || "",
          }))

          // Only reset if the slides have actually changed
          // This prevents infinite loops
          const currentSlideIds = fields
            .map((field) => field.id)
            .sort()
            .join(",")
          const newSlideIds = formattedSlides
            .map((slide) => slide.id)
            .sort()
            .join(",")

          if (currentSlideIds !== newSlideIds) {
            reset({ slides: formattedSlides })
          }
        }
  },[data?.slides,slidesLoading])
  // Load existing slides when data is available
  useEffect(() => {
   populateFields()
  }, [populateFields])
  // data, reset, slidesLoading, fields

  const slides = watch("slides")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, slideIndex: number) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file.",
        variant: "destructive",
      })
      return
    }

    const uploadId = `${slideIndex}-${Date.now()}`
    const uploadingImage: UploadingImage = {
      id: uploadId,
      file,
      progress: 0,
      status: "idle",
    }

    setUploadingImages((prev) => ({
      ...prev,
      [slideIndex]: uploadingImage,
    }))

    try {
      await uploadFileToCloudinary(uploadingImage, {
        onProgress: (id, progress) => {
          setUploadingImages((prev) => ({
            ...prev,
            [slideIndex]: { ...prev[slideIndex], progress, status: "uploading" },
          }))
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

          setUploadingImages((prev) => ({
            ...prev,
            [slideIndex]: {
              ...prev[slideIndex],
              status: "success",
              cloudinaryData,
            },
          }))

          setValue(`slides.${slideIndex}.image`, cloudinaryData, {
            shouldValidate: true,
          })

          toast({
            title: "Upload Successful",
            description: "Image uploaded successfully!",
          })
        },
        onFailure: (id, errorMessage) => {
          setUploadingImages((prev) => ({
            ...prev,
            [slideIndex]: {
              ...prev[slideIndex],
              status: "error",
              error: errorMessage,
            },
          }))

          toast({
            title: "Upload Failed",
            description: errorMessage,
            variant: "destructive",
          })
        },
        onStatusChange: (id, status) => {
          setUploadingImages((prev) => ({
            ...prev,
            [slideIndex]: { ...prev[slideIndex], status },
          }))
        },
      })
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent, slideIndex: number) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      // Create a synthetic event to reuse the upload logic
      const syntheticEvent = {
        target: { files: [file] },
      } as React.ChangeEvent<HTMLInputElement>

      await handleImageUpload(syntheticEvent, slideIndex)
    } else {
      toast({
        title: "Invalid File",
        description: "Please drop a valid image file.",
        variant: "destructive",
      })
    }
  }

  const retryUpload = async (slideIndex: number) => {
    const uploadingImage = uploadingImages[slideIndex]
    if (uploadingImage) {
      const syntheticEvent = {
        target: { files: [uploadingImage.file] },
      } as React.ChangeEvent<HTMLInputElement>

      await handleImageUpload(syntheticEvent, slideIndex)
    }
  }

  const removeImage = (slideIndex: number) => {
    setValue(`slides.${slideIndex}.image`, null, { shouldValidate: true })
    setUploadingImages((prev) => {
      const newState = { ...prev }
      delete newState[slideIndex]
      return newState
    })
  }

  const getFilteredOptions = (currentIndex: number, isPrimary: boolean) => {
    const used = new Set<string>()
    slides.forEach((slide, i) => {
      if (i === currentIndex) return
      if (slide.buttonText) used.add(slide.buttonText)
      if (slide.secondaryButtonText) used.add(slide.secondaryButtonText)
    })

    const selectedOpposite = isPrimary ? slides[currentIndex]?.secondaryButtonText : slides[currentIndex]?.buttonText

    const allOptions = [...DEFAULT_BUTTON_OPTIONS, ...customButtons]

    return allOptions.filter((btn) => !used.has(btn) && btn !== selectedOpposite)
  }

  const addSlide = () => {
    append({
      id: uuidv4(),
      image: null,
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      secondaryButtonText: "",
      secondaryButtonLink: "",
    })
  }

  const deleteSlideHandler = async (index: number) => {
    if (fields.length === 1) {
      toast({
        title: "Cannot Delete",
        description: "You must have at least one slide.",
        variant: "destructive",
      })
      return
    }

    const slideId = fields[index].id

    // If this is an existing slide (from the database), delete it
    if (data?.slides?.find((slide) => slide.id === slideId)) {
      const success = await deleteSlide(slideId)
      if (success) {
        toast({
          title: "Slide Deleted",
          description: "The slide has been deleted successfully.",
        })
      }
    }

    // Remove from form state
    remove(index)

    // Clean up uploading images state
    setUploadingImages((prev) => {
      const newState = { ...prev }
      delete newState[index]
      return newState
    })
  }

  const onSubmit = async (data: FormValues) => {
    setFormLoading(true)
    setFormError(null)

    try {
      // Check if all images are uploaded successfully
      const hasUploadingImages = Object.values(uploadingImages).some(
        (img) => img.status === "uploading" || img.status === "error",
      )

      if (hasUploadingImages) {
        toast({
          title: "Upload in Progress",
          description: "Please wait for all images to finish uploading.",
          variant: "destructive",
        })
        setFormLoading(false)
        return
      }

      // Format the slides for the API
      const slidesData = data.slides.map((slide) => ({
        ...slide,
        image: slide.image || null,
      }))

      // Use the createSlides function from the hook
      const result = await createSlides(slidesData)

      if (result) {
        toast({
          title: "Success",
          description: "Landing page slides saved successfully!",
        })
        refetch() // Refresh the slides data
      } else {
        setFormError("Failed to save slides")
        toast({
          title: "Save Failed",
          description: "Failed to save slides",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred")
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  const renderImageUploadArea = (slideIndex: number) => {
    const slide = slides[slideIndex]
    const uploadingImage = uploadingImages[slideIndex]
    const hasImage = slide?.image?.url
    const isUploading = uploadingImage?.status === "uploading"
    const hasError = uploadingImage?.status === "error"

    return (
      <div
        className={cn(
          "relative h-[200px] md:h-[300px] w-full rounded-lg border-2 border-dashed transition-all duration-200",
          hasError
            ? "border-destructive bg-destructive/5"
            : isUploading
              ? "border-primary bg-primary/5"
              : hasImage
                ? "border-green-500 bg-green-50"
                : "border-muted-foreground/25 bg-muted/50 hover:border-primary hover:bg-primary/5",
          "overflow-hidden",
        )}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, slideIndex)}
      >
        <label htmlFor={`file-upload-${slideIndex}`}
         className="relative w-full h-full cursor-pointer block">
          {hasImage && !isUploading ? (
            <>
              <Image
                src={slide?.image?.url || "/placeholder.svg"}
                alt="Uploaded slide image"
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-black"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(`file-upload-${slideIndex}`)?.click()
                    }}
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Change
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-500/90 hover:bg-red-600"
                    onClick={(e) => {
                      e.preventDefault()
                      removeImage(slideIndex)
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Badge variant="secondary" className="absolute top-2 right-2 bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Uploaded
              </Badge>
            </>
          ) : isUploading ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm font-medium text-primary mb-2">Uploading...</p>
              <Progress value={uploadingImage.progress}
               className="w-full max-w-xs h-2" />
              <p className="text-xs text-muted-foreground mt-1">{Math.round(uploadingImage.progress)}%</p>
            </div>
          ) : hasError ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <AlertCircle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm font-medium text-destructive mb-2">Upload Failed</p>
              <p className="text-xs text-muted-foreground text-center mb-3">{uploadingImage.error}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  retryUpload(slideIndex)
                }}
              >
                Retry Upload
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-muted-foreground mb-1">Click to upload or drag & drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}

          <input
            id={`file-upload-${slideIndex}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, slideIndex)}
          />
        </label>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br 
    from-slate-50p to-slate-100p p-4 rounded-md">
      <div className="max-w-4xl mx-auto">
        {slidesLoading && !data ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-medium text-muted-foreground">Loading slides...</p>
          </div>
        ) : slidesError ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center my-8">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-destructive mb-2">Failed to load slides</h3>
            <p className="text-muted-foreground mb-4">{slidesError}</p>
            <Button onClick={refetch} variant="outline" className="mx-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center 
              justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Landing Page Settings</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Create and manage your hero slides to showcase your organization's impact and engage visitors.
              </p>
            </div>

            {/* Slides */}
            <div className="space-y-6">
              {fields.map((field, index) => (
                <Card key={field.id} className="overflow-hidden 
                shadow-lg border bg-white/80p dark:bg-transparentp
                 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-primary/5
                   to-primary/10 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <span className="flex items-center 
                          justify-center w-6 h-6 bg-primary 
                          text-primary-foreground rounded-full
                           text-sm font-bold">
                            {index + 1}
                          </span>
                          Slide {index + 1}
                        </CardTitle>
                        <CardDescription>Configure the content and appearance of slide {index + 1}</CardDescription>
                      </div>
                      <Badge variant="outline" 
                      className="bg-white/50">
                        {slides[index]?.image ? "Ready" : "Draft"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Hero Image</Label>
                      {renderImageUploadArea(index)}
                      {errors.slides?.[index]?.image && (
                        <p className="text-destructive text-sm 
                        flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          Image is required for this slide
                        </p>
                      )}
                    </div>

                    <Separator />

                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor={`title-${index}`} 
                      className="text-sm font-semibold">
                        Title
                      </Label>
                      <Input
                        id={`title-${index}`}
                        placeholder="Enter a compelling title..."
                        {...control.register(`slides.${index}.title`)}
                        className={cn(
                          "text-sm",
                          errors.slides?.[index]?.title
                           && "border-destructive focus-visible:ring-destructive",
                        )}
                      />
                      {errors.slides?.[index]?.title && (
                        <p className="text-destructive text-sm flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.slides[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor={`description-${index}`}
                       className="text-sm font-semibold">
                        Description
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        placeholder="Write a description that 
                        captures your mission..."
                        rows={3}
                        {...control.register(`slides.${index}.description`)}
                        className={cn("text-sm",
                          errors.slides?.[index]?.description 
                          && "border-destructive focus-visible:ring-destructive",
                        )}
                      />
                      {errors.slides?.[index]?.description && (
                        <p className="text-destructive text-sm
                         flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.slides[index]?.description?.message}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Primary Button */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Primary Button</Label>
                        <Select
                          value={slides[index]?.buttonText || ""}
                          onValueChange={(value) => {
                            setValue(`slides.${index}.buttonText`, value, { shouldValidate: true })
                            setValue(`slides.${index}.buttonLink`, BUTTON_LINKS[value] || "", { shouldValidate: true })
                          }}
                        >
                          <SelectTrigger className={cn(errors.slides?.[index]?.buttonText && "border-destructive")}>
                            <SelectValue placeholder="Select primary action" />
                          </SelectTrigger>
                          <SelectContent>
                            {getFilteredOptions(index, true).map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.slides?.[index]?.buttonText && (
                          <p className="text-destructive text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.slides[index]?.buttonText?.message}
                          </p>
                        )}
                      </div>

                      {/* Secondary Button */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Secondary Button</Label>
                        <Select
                          value={slides[index]?.secondaryButtonText || ""}
                          onValueChange={(value) => {
                            setValue(`slides.${index}.secondaryButtonText`, value, { shouldValidate: true })
                            setValue(`slides.${index}.secondaryButtonLink`, BUTTON_LINKS[value] || "", {
                              shouldValidate: true,
                            })
                          }}
                        >
                          <SelectTrigger
                            className={cn(errors.slides?.[index]?.secondaryButtonText && "border-destructive")}
                          >
                            <SelectValue placeholder="Select secondary action" />
                          </SelectTrigger>
                          <SelectContent>
                            {getFilteredOptions(index, false).map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.slides?.[index]?.secondaryButtonText && (
                          <p className="text-destructive text-sm flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.slides[index]?.secondaryButtonText?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-muted/30 border-t
                   flex justify-between items-center">
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => move(index, index - 1)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => move(index, index + 1)}
                        disabled={index === fields.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSlideHandler(index)}
                      disabled={fields.length === 1}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6">
              <Button type="button" onClick={addSlide} variant="outline" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add New Slide
              </Button>

              <Button type="submit" disabled={formLoading} className="w-full sm:w-auto min-w-[140px]">
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>

            {formError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                <p className="text-destructive font-medium flex items-center justify-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {formError}
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
