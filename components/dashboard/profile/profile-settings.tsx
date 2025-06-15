"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Loader2,
  Camera,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Calendar,
} from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useProfileSettings } from "@/hooks/useProfileSettings"
import { profileFormSchema, type ProfileFormValues } from "@/schemas/profile.schema"
import { uploadFileToCloudinary } from "@/lib/upload-files"
import type { UploadingProfileImage } from "@/types/profile"
import { TagInput } from "@/components/ui/tag-input"
import { v4 as uuidv4 } from "uuid"

export const ProfileSettings = () => {
  const { toast } = useToast()
  const router = useRouter()
  const { profile, loading, error, isSaving, updateProfile } = useProfileSettings()
  const [uploadingImage, setUploadingImage] = useState<UploadingProfileImage | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>("personal")

  // Initialize form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      profileImage: null,
      address: "",
      city: "",
      county: "",
      postalCode: "",
      skills: [],
      interests: [],
      education: [],
      employment: [],
    },
  })

  // Field arrays for education and employment
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  })

  const {
    fields: employmentFields,
    append: appendEmployment,
    remove: removeEmployment,
  } = useFieldArray({
    control,
    name: "employment",
  })

  // Update form values when profile data is loaded
  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
        profileImage: profile.profileImage,
        address: profile.address || "",
        city: profile.city || "",
        county: profile.county || "",
        postalCode: profile.postalCode || "",
        skills: profile.skills || [],
        interests: profile.interests || [],
        education: profile.education || [],
        employment: profile.employment || [],
      })

      // Set preview URL from profile if it exists
      if (profile.profileImage?.url) {
        setPreviewUrl(profile.profileImage.url)
      }
    }
  }, [profile, reset])

  // Watch the profileImage field for changes
  const profileImage = watch("profileImage")
  const skills = watch("skills")
  const interests = watch("interests")

  // Create a preview URL for the image being uploaded
  const createImagePreview = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewUrl(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  // Handle image upload
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

    // Create and set preview immediately
    createImagePreview(file)

    const uploadId = `profile-${Date.now()}`
    const newUploadingImage: UploadingProfileImage = {
      id: uploadId,
      file,
      progress: 0,
      status: "idle",
    }

    setUploadingImage(newUploadingImage)

    try {
      await uploadFileToCloudinary(newUploadingImage, {
        onProgress: (id, progress) => {
          setUploadingImage((prev) => {
            if (!prev) return null
            return { ...prev, progress, status: "uploading" }
          })
        },
        onSuccess: (id, result) => {
          const cloudinaryData = {
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

          setUploadingImage((prev) => {
            if (!prev) return null
            return {
              ...prev,
              status: "success",
              cloudinaryData,
            }
          })

          // Update the preview URL to the Cloudinary URL
          setPreviewUrl(result.url)

          setValue("profileImage", cloudinaryData, {
            shouldValidate: true,
            shouldDirty: true,
          })

          toast({
            title: "Upload Successful",
            description: "Profile image uploaded successfully!",
          })
        },
        onFailure: (id, errorMessage) => {
          setUploadingImage((prev) => {
            if (!prev) return null
            return {
              ...prev,
              status: "error",
              error: errorMessage,
            }
          })

          toast({
            title: "Upload Failed",
            description: errorMessage,
            variant: "destructive",
          })
        },
        onStatusChange: (id, status) => {
          setUploadingImage((prev) => {
            if (!prev) return null
            return { ...prev, status }
          })
        },
      })
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      // Create preview immediately
      createImagePreview(file)

      // Create a synthetic event to reuse the upload logic
      const syntheticEvent = {
        target: { files: [file] },
      } as React.ChangeEvent<HTMLInputElement>

      await handleImageUpload(syntheticEvent)
    } else {
      toast({
        title: "Invalid File",
        description: "Please drop a valid image file.",
        variant: "destructive",
      })
    }
  }

  // Retry upload
  const retryUpload = async () => {
    if (uploadingImage) {
      // Keep the preview URL
      const syntheticEvent = {
        target: { files: [uploadingImage.file] },
      } as React.ChangeEvent<HTMLInputElement>

      await handleImageUpload(syntheticEvent)
    }
  }

  // Remove image
  const removeImage = () => {
    setValue("profileImage", null, { shouldValidate: true, shouldDirty: true })
    setUploadingImage(null)
    setPreviewUrl(null)
  }

  // Add new education entry
  const addEducation = () => {
    appendEducation({
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
  }

  // Add new employment entry
  const addEmployment = () => {
    appendEmployment({
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      location: "",
    })
  }

  // Form submission handler
  const onSubmit = async (data: ProfileFormValues) => {
    // Check if image is still uploading
    if (uploadingImage?.status === "uploading") {
      toast({
        title: "Upload in Progress",
        description: "Please wait for the image to finish uploading.",
        variant: "destructive",
      })
      return
    }

    const result = await updateProfile(data)
    if (result) {
      // Reset form dirty state
      reset(data)
    }
  }

  // Render image upload area
  const renderImageUploadArea = () => {
    const hasImage = !!profileImage?.url
    const isUploading = uploadingImage?.status === "uploading"
    const hasError = uploadingImage?.status === "error"
    const hasPreview = !!previewUrl

    return (
      <div
        className={`relative h-32 w-32 rounded-full border-2 border-dashed transition-all duration-200 ${
          hasError
            ? "border-destructive bg-destructive/5"
            : isUploading
              ? "border-primary bg-primary/5"
              : hasImage || hasPreview
                ? "border-green-500 bg-green-50"
                : "border-muted-foreground/25 bg-muted/50 hover:border-primary hover:bg-primary/5"
        } overflow-hidden`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="profile-image" className="relative w-full h-full cursor-pointer block">
          {/* Background Image - Always show if we have a preview */}
          {hasPreview && (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${previewUrl})` }} />
          )}

          {hasImage && !isUploading ? (
            <>
              <Avatar className="h-full w-full">
                <AvatarImage src={profileImage.url || "/placeholder.svg"} alt="Profile" className="object-cover" />
                <AvatarFallback>
                  {profile?.firstName?.[0] || ""}
                  {profile?.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-black"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("profile-image")?.click()
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
                      removeImage()
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Badge variant="secondary" className="absolute top-1 right-1 bg-green-500 text-white scale-75">
                <CheckCircle className="h-3 w-3 mr-1" />
                Uploaded
              </Badge>
            </>
          ) : isUploading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full p-2 bg-black/50">
              <Loader2 className="h-6 w-6 animate-spin text-white mb-1" />
              <p className="text-xs font-medium text-white mb-1">Uploading...</p>
              <Progress value={uploadingImage.progress} className="w-full max-w-[80%] h-1" />
              <p className="text-[10px] text-white mt-1">{Math.round(uploadingImage.progress)}%</p>
            </div>
          ) : hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center h-full p-2 bg-black/50">
              <AlertCircle className="h-6 w-6 text-white mb-1" />
              <p className="text-xs font-medium text-white mb-1">Upload Failed</p>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs py-0 px-2 bg-white text-black hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault()
                  retryUpload()
                }}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-2 text-center">
              <Camera className="h-6 w-6 text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Upload Photo</p>
            </div>
          )}

          <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile...</span>
      </div>
    )
  }

  if (error && !profile) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Failed to load profile</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => router.refresh()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b">
            <Button
              type="button"
              variant={activeSection === "personal" ? "default" : "ghost"}
              className="rounded-none rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary"
              data-state={activeSection === "personal" ? "active" : "inactive"}
              onClick={() => setActiveSection("personal")}
            >
              Personal Information
            </Button>
            <Button
              type="button"
              variant={activeSection === "skills" ? "default" : "ghost"}
              className="rounded-none rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary"
              data-state={activeSection === "skills" ? "active" : "inactive"}
              onClick={() => setActiveSection("skills")}
            >
              Skills & Interests
            </Button>
            <Button
              type="button"
              variant={activeSection === "education" ? "default" : "ghost"}
              className="rounded-none rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary"
              data-state={activeSection === "education" ? "active" : "inactive"}
              onClick={() => setActiveSection("education")}
            >
              Education
            </Button>
            <Button
              type="button"
              variant={activeSection === "employment" ? "default" : "ghost"}
              className="rounded-none rounded-t-lg border-b-2 border-transparent data-[state=active]:border-primary"
              data-state={activeSection === "employment" ? "active" : "inactive"}
              onClick={() => setActiveSection("employment")}
            >
              Employment
            </Button>
          </div>

          {/* Personal Information Section */}
          {activeSection === "personal" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal information and profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
                  <div className="flex flex-col items-center space-y-2">
                    {renderImageUploadArea()}
                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>

                  <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className={errors.firstName ? "text-destructive" : ""}>
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && <p className="text-xs text-destructive">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className={errors.lastName ? "text-destructive" : ""}>
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && <p className="text-xs text-destructive">{errors.lastName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                        disabled // Email is managed by auth system
                      />
                      {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className={errors.phone ? "text-destructive" : ""}>
                        Phone
                      </Label>
                      <Input id="phone" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className={errors.bio ? "text-destructive" : ""}>
                    Bio
                  </Label>
                  <Textarea id="bio" {...register("bio")} rows={4} className={errors.bio ? "border-destructive" : ""} />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile. This will be displayed publicly.
                  </p>
                  {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="address" className={errors.address ? "text-destructive" : ""}>
                      Address
                    </Label>
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="Enter your address"
                      className={errors.address ? "border-destructive" : ""}
                    />
                    {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city" className={errors.city ? "text-destructive" : ""}>
                      City
                    </Label>
                    <Input
                      id="city"
                      {...register("city")}
                      placeholder="Enter your city"
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="county" className={errors.county ? "text-destructive" : ""}>
                      County
                    </Label>
                    <Input
                      id="county"
                      {...register("county")}
                      placeholder="Enter your county"
                      className={errors.county ? "border-destructive" : ""}
                    />
                    {errors.county && <p className="text-xs text-destructive">{errors.county.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className={errors.postalCode ? "text-destructive" : ""}>
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      {...register("postalCode")}
                      placeholder="Enter your postal code"
                      className={errors.postalCode ? "border-destructive" : ""}
                    />
                    {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills & Interests Section */}
          {activeSection === "skills" && (
            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
                <CardDescription>Add your professional skills and personal interests.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <TagInput
                      tags={skills}
                      onChange={(newTags) => setValue("skills", newTags, { shouldDirty: true })}
                      placeholder="Add a skill..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Add skills relevant to your profession (e.g., Project Management, Public Speaking).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <TagInput
                      tags={interests}
                      onChange={(newTags) => setValue("interests", newTags, { shouldDirty: true })}
                      placeholder="Add an interest..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Add your personal interests and hobbies (e.g., Photography, Hiking).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          {activeSection === "education" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Add your educational background and qualifications.</CardDescription>
                </div>
                <Button type="button" onClick={addEducation} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent>
                {educationFields.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <GraduationCap className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No education entries yet. Add your educational background.</p>
                  </div>
                ) : (
                  <Accordion type="multiple" className="space-y-4">
                    {educationFields.map((field, index) => (
                      <AccordionItem key={field.id} value={field.id} className="border rounded-md p-1">
                        <div className="flex items-center justify-between">
                          <AccordionTrigger className="py-2 px-4 hover:no-underline">
                            <div className="flex items-center">
                              <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div className="text-left">
                                <p className="font-medium">
                                  {watch(`education.${index}.institution`) || "New Education Entry"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {watch(`education.${index}.degree`) || "Degree"}
                                  {watch(`education.${index}.field`) ? ` in ${watch(`education.${index}.field`)}` : ""}
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeEducation(index)
                            }}
                            className="mr-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <AccordionContent className="px-4 pb-4 pt-2">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor={`education.${index}.institution`}>Institution</Label>
                              <Input
                                id={`education.${index}.institution`}
                                {...register(`education.${index}.institution`)}
                                placeholder="University or School Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`education.${index}.degree`}>Degree</Label>
                              <Input
                                id={`education.${index}.degree`}
                                {...register(`education.${index}.degree`)}
                                placeholder="e.g., Bachelor's, Master's"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`education.${index}.field`}>Field of Study</Label>
                              <Input
                                id={`education.${index}.field`}
                                {...register(`education.${index}.field`)}
                                placeholder="e.g., Computer Science"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label htmlFor={`education.${index}.startDate`}>Start Date</Label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id={`education.${index}.startDate`}
                                    {...register(`education.${index}.startDate`)}
                                    placeholder="YYYY-MM"
                                    className="pl-9"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`education.${index}.endDate`}>End Date</Label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id={`education.${index}.endDate`}
                                    {...register(`education.${index}.endDate`)}
                                    placeholder="YYYY-MM"
                                    className="pl-9"
                                    disabled={watch(`education.${index}.current`)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`education.${index}.current`}
                                checked={watch(`education.${index}.current`)}
                                onCheckedChange={(checked) => {
                                  setValue(`education.${index}.current`, checked === true, { shouldDirty: true })
                                  if (checked) {
                                    setValue(`education.${index}.endDate`, "", { shouldDirty: true })
                                  }
                                }}
                              />
                              <Label htmlFor={`education.${index}.current`} className="text-sm font-normal">
                                I am currently studying here
                              </Label>
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                              <Label htmlFor={`education.${index}.description`}>Description</Label>
                              <Textarea
                                id={`education.${index}.description`}
                                {...register(`education.${index}.description`)}
                                placeholder="Describe your studies, achievements, etc."
                                rows={3}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          )}

          {/* Employment Section */}
          {activeSection === "employment" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Employment History</CardTitle>
                  <CardDescription>Add your work experience and professional history.</CardDescription>
                </div>
                <Button type="button" onClick={addEmployment} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Employment
                </Button>
              </CardHeader>
              <CardContent>
                {employmentFields.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <Briefcase className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No employment entries yet. Add your work experience.</p>
                  </div>
                ) : (
                  <Accordion type="multiple" className="space-y-4">
                    {employmentFields.map((field, index) => (
                      <AccordionItem key={field.id} value={field.id} className="border rounded-md p-1">
                        <div className="flex items-center justify-between">
                          <AccordionTrigger className="py-2 px-4 hover:no-underline">
                            <div className="flex items-center">
                              <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                              <div className="text-left">
                                <p className="font-medium">{watch(`employment.${index}.position`) || "New Position"}</p>
                                <p className="text-sm text-muted-foreground">
                                  {watch(`employment.${index}.company`) || "Company"}
                                  {watch(`employment.${index}.location`)
                                    ? `, ${watch(`employment.${index}.location`)}`
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeEmployment(index)
                            }}
                            className="mr-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <AccordionContent className="px-4 pb-4 pt-2">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor={`employment.${index}.company`}>Company</Label>
                              <Input
                                id={`employment.${index}.company`}
                                {...register(`employment.${index}.company`)}
                                placeholder="Company Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`employment.${index}.position`}>Position</Label>
                              <Input
                                id={`employment.${index}.position`}
                                {...register(`employment.${index}.position`)}
                                placeholder="Job Title"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`employment.${index}.location`}>Location</Label>
                              <Input
                                id={`employment.${index}.location`}
                                {...register(`employment.${index}.location`)}
                                placeholder="City, Country"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label htmlFor={`employment.${index}.startDate`}>Start Date</Label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id={`employment.${index}.startDate`}
                                    {...register(`employment.${index}.startDate`)}
                                    placeholder="YYYY-MM"
                                    className="pl-9"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`employment.${index}.endDate`}>End Date</Label>
                                <div className="relative">
                                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    id={`employment.${index}.endDate`}
                                    {...register(`employment.${index}.endDate`)}
                                    placeholder="YYYY-MM"
                                    className="pl-9"
                                    disabled={watch(`employment.${index}.current`)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`employment.${index}.current`}
                                checked={watch(`employment.${index}.current`)}
                                onCheckedChange={(checked) => {
                                  setValue(`employment.${index}.current`, checked === true, { shouldDirty: true })
                                  if (checked) {
                                    setValue(`employment.${index}.endDate`, "", { shouldDirty: true })
                                  }
                                }}
                              />
                              <Label htmlFor={`employment.${index}.current`} className="text-sm font-normal">
                                I currently work here
                              </Label>
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                              <Label htmlFor={`employment.${index}.description`}>Description</Label>
                              <Textarea
                                id={`employment.${index}.description`}
                                {...register(`employment.${index}.description`)}
                                placeholder="Describe your responsibilities and achievements"
                                rows={3}
                              />
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          )}

          {/* Form Actions - Always visible */}
          <div className="flex justify-end space-x-2 sticky bottom-0 bg-background p-4 border-t shadow-md">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving || !isDirty}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
