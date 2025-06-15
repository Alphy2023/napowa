"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, Plus, ImageIcon, FileText, File, ArrowLeft, Loader2, CheckCircle, AlertCircle, Trash, Save } from 'lucide-react' // Added Save icon
import { v4 as uuidv4 } from "uuid"
import { Progress } from "@radix-ui/react-progress"
import { cn } from "@/lib/utils" // Assuming cn is available for class combining

import { useForm, Controller } from "react-hook-form" // Import useForm and Controller
import { zodResolver } from "@hookform/resolvers/zod" // Import zodResolver
import { z } from "zod" // Import z from zod

// Import actual utility functions and types from lib folder
import { uploadFileToCloudinary } from "@/lib/upload-files"
import { deleteImageFromCloudinary } from "@/lib/delete-file" // Assuming this utility exists
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" // Assuming form components exist
import { galleryFormSchema, GalleryFormValues } from "@/schemas/gallery.schema"
import { CloudinaryUploadResult, UploadingImage } from "@/types/upload-result"

// Types for Cloudinary response as seen in landing-page-settings.tsx



export default function GalleryUploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadQueue, setUploadQueue] = useState<UploadingImage[]>([])
  const [isSubmittingForm, setIsSubmittingForm] = useState(false); // Tracks if the form is being submitted to backend (including upload phase)

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues: {
      title: "",
      description: "",
      album: "",
      tags: "",
      isFeatured: false,
      country: "",
      county: "",
      yearTaken: new Date().getFullYear(), // Default to current year
    },
    mode: "onChange", // Validate on change to enable/disable buttons dynamically
  });

  const { handleSubmit, control, formState, watch } = form;
  const { isValid, errors } = formState;

  // Determine if all selected files are successfully uploaded
  const allFilesUploaded = uploadQueue.length > 0 && uploadQueue.every(f => f.status === 'success');

  const addFilesToQueue = (newFiles: File[]) => {
    const newUploads: UploadingImage[] = newFiles.map(file => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file), // Create preview URL immediately
      status: 'idle', // Initial status is idle
      progress: 0,
    }))
    setUploadQueue((prev) => [...prev, ...newUploads])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFilesToQueue(Array.from(e.target.files))
      e.target.value = ''; // Clear input to allow re-uploading same file
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToQueue(Array.from(e.dataTransfer.files))
    }
  }

  const removeFile = async (id: string) => {
    setUploadQueue((currentQueue) => {
      const fileToRemove = currentQueue.find(f => f.id === id);
      if (fileToRemove) {
        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(fileToRemove?.preview);

        // If the file was uploaded, attempt deletion from Cloudinary
        if (fileToRemove.status === 'success' && fileToRemove.cloudinaryData?.public_id) {
          deleteImageFromCloudinary(fileToRemove.cloudinaryData.public_id)
            .then(() => {
              toast({
                title: "File deleted",
                description: `Successfully removed ${fileToRemove.file.name}.`,
              });
            })
            .catch(error => {
              console.error("Error deleting image from Cloudinary:", error);
              toast({
                title: "Deletion failed",
                description: `Failed to remove ${fileToRemove.file.name}. Please try again.`,
                variant: "destructive",
              });
            });
        }
      }
      return currentQueue.filter((file) => file.id !== id);
    });
  }

  // Combined function for uploading and then submitting the form


  const onSubmit = async (data: GalleryFormValues) => {
  setIsSubmittingForm(true); // Start overlay spinner for the entire process

  // 1. Handle file uploads if any are pending
  const filesToUpload = uploadQueue.filter(f => f.status === 'idle' || f.status === 'error');

  let allCurrentUploadsSuccessful = true;
  const successfullyUploadedCloudinaryData: CloudinaryUploadResult[] = [];

  if (filesToUpload.length > 0) {
    for (const fileToUpload of filesToUpload) {
      setUploadQueue(prevQueue =>
        prevQueue.map(f => f.id === fileToUpload.id ? { ...f, status: 'uploading' } : f)
      );

      try {
        await uploadFileToCloudinary(fileToUpload, {
          onProgress: (id, progress) => {
            setUploadQueue(prevQueue =>
              prevQueue.map(f => f.id === id ? { ...f, progress, status: "uploading" } : f)
            );
          },
          onSuccess: (id, result) => {
            const cloudinaryData: CloudinaryUploadResult = {
              url: result.url,
              public_id: result.public_id,
              asset_id: result.asset_id,
              version: result.version,
              format: result.format,
              width: result.width,
              height: result.height,
              bytes: result.bytes,
              original_filename: result.original_filename,
            };
            setUploadQueue(prevQueue =>
              prevQueue.map(f =>
                f.id === id
                  ? { ...f, status: 'success', cloudinaryData, progress: 100 }
                  : f
              )
            );
            successfullyUploadedCloudinaryData.push(cloudinaryData); // Accumulate here
            toast({
              title: "Upload Successful",
              description: `Uploaded ${fileToUpload.file.name}.`,
            });
          },
          onFailure: (id, errorMessage) => {
            setUploadQueue(prevQueue =>
              prevQueue.map(f =>
                f.id === id
                  ? { ...f, status: 'error', error: errorMessage, progress: 0 }
                  : f
              )
            );
            allCurrentUploadsSuccessful = false;
            toast({
              title: "Upload Failed",
              description: `Failed to upload ${fileToUpload.file.name}: ${errorMessage}`,
              variant: "destructive",
            });
          },
          onStatusChange: (id, status) => {
            setUploadQueue(prevQueue =>
              prevQueue.map(f => f.id === id ? { ...f, status } : f)
            );
          },
        });
      } catch (error: any) {
        console.error("Upload error during submission:", error);
        setUploadQueue(prevQueue =>
          prevQueue.map(f =>
            f.id === fileToUpload.id
              ? { ...f, status: 'error', progress: 0, error: error.message || "Unknown error" }
              : f
          )
        );
        allCurrentUploadsSuccessful = false;
        toast({
          title: "Upload failed",
          description: `Failed to upload ${fileToUpload.file.name}.`,
          variant: "destructive",
        });
      }
    }

    if (!allCurrentUploadsSuccessful) {
      setIsSubmittingForm(false); // Stop spinner if uploads failed
      toast({
        title: "Submission Blocked",
        description: "Cannot submit because some file uploads failed. Please resolve upload issues.",
        variant: "destructive",
      });
      return; // Stop execution if uploads failed
    }

    toast({
      title: "All Files Uploaded",
      description: `Successfully uploaded ${filesToUpload.length} ${filesToUpload.length === 1 ? "file" : "files"}. Proceeding to submit gallery details.`,
    });
  }

  // 2. Then, proceed with form submission to backend
  // Use the accumulated successfullyUploadedCloudinaryData directly
  const finalUploadedMediaData = [
    ...uploadQueue.filter(f => f.status === 'success' && f.cloudinaryData).map(f => f.cloudinaryData!), // Existing successful uploads
    ...successfullyUploadedCloudinaryData // Newly successful uploads from this submission attempt
  ];

  if (finalUploadedMediaData.length === 0) {
    toast({
      title: "No Media Uploaded",
      description: "Please upload at least one image/video before submitting the gallery.",
      variant: "destructive",
    });
    setIsSubmittingForm(false);
    return;
  }

  try {
    // Simulate API call to backend
    // console.log("Submitting form data:", {
    //   ...data,
    //   media: finalUploadedMediaData, // Use the combined data
    // });

    // Replace with actual API call, e.g.:
    // await galleryApi.createGallery({ ...data, media: finalUploadedMediaData });

    // toast({
    //   title: "Gallery Submitted",
    //   description: "Gallery details and uploaded media successfully saved!",
    // });

    const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data, // Form fields from react-hook-form
          media: finalUploadedMediaData, // All successfully uploaded media data
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit gallery. ' + JSON.stringify(errorData.errors));
      }

      const result = await response.json();
      console.log("Gallery submission successful:", result);

      toast({
        title: "Gallery Submitted",
        description: "Gallery details and uploaded media successfully saved!",
      });
    // Optionally reset form and queue or redirect
    form.reset();
    setUploadQueue([]);
    router.push("/dashboard/gallery"); // Redirect to gallery overview

  } catch (error) {
    console.error("Error submitting gallery:", error);
    toast({
      title: "Submission Failed",
      description: "There was an error saving the gallery. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmittingForm(false); // Always stop spinner at the end
  }
};


  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />
    } else if (file.type.startsWith("video/")) {
      return <FileText className="h-6 w-6 text-purple-500" />
    } else if (file.type.includes("pdf")) {
      return <FileText className="h-6 w-6 text-red-500" />
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

  const renderFileStatus = (file: UploadingImage) => {
    switch (file.status) {
      case 'idle':
        return <Badge variant="secondary">Pending</Badge>;
      case 'uploading':
        return (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <Badge variant="outline">Uploading...</Badge>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <Badge variant="success">Uploaded</Badge>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <Badge variant="destructive">Failed</Badge>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start
      lg:space-y-0 space-y-3 lg:items-center space-x-4 flex-col lg:flex-row">
        <Button variant="outline" 
        size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div >
          <h2 className="text-3xl font-bold tracking-tight">Upload Images & Videos</h2>
          <p className="text-muted-foreground">
            Upload images & videos to the gallery for display on the website.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Files</CardTitle>
                <CardDescription>
                  Drag and drop files or click to browse. Supported formats: Images (JPG, PNG, GIF, SVG), Videos (MP4, MOV, WEBM).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="flex flex-col items-center justify-center rounded-md border-2 border-dashed p-12 text-center cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  <div className="mb-4 rounded-full bg-muted p-4">
                    <Upload className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Drag and drop files here</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    or click to browse your device
                  </p>
                  <Button variant="outline" type="button" onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}>
                    Select Files
                  </Button>
                </div>

                {uploadQueue.length > 0 && (
                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-semibold">Selected Files ({uploadQueue.length})</h3>
                    <div className="space-y-2">
                      {uploadQueue.map((file) => (
                        <div key={file.id} className="flex flex-col sm:flex-row items-center justify-between rounded-md border p-3">
                          <div className="flex items-center space-x-3 w-full sm:w-auto">
                            {file.file.type.startsWith("image/") ? (
                              <div className="relative h-12 w-12 overflow-hidden rounded flex-shrink-0">
                                <Image
                                  src={file.preview || "/placeholder.svg"}
                                  alt={file.file.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : file.file.type.startsWith("video/") ? (
                              <div className="relative h-12 w-12 overflow-hidden rounded flex-shrink-0 bg-black flex items-center justify-center">
                                <video src={file.preview} className="object-cover h-full w-full" />
                              </div>
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded bg-muted flex-shrink-0">
                                {getFileIcon(file.file)}
                              </div>
                            )}
                            <div className="flex-grow">
                              <p className="font-medium text-sm sm:text-base break-words">{file.file.name}</p>
                              <p className="text-xs text-muted-foreground">{getFileSize(file.file.size)}</p>
                            </div>
                          </div>

                          <div className="w-full sm:w-auto flex items-center justify-end sm:justify-between space-x-2 mt-2 sm:mt-0">
                            {file.status === 'uploading' && (
                              <Progress value={file.progress} className="w-24 h-2" />
                            )}
                            {renderFileStatus(file)}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFile(file.id)
                              }}
                              className="flex-shrink-0"
                            >
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Media Details</CardTitle>
                <CardDescription>
                  Add details for the uploaded media.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="Enter image title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Enter image description"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="album"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="album">Album</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger id="album">
                            <SelectValue placeholder="Select album" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="tags">Tags</FormLabel>
                      <FormControl>
                        <Input
                          id="tags"
                          placeholder="Enter tags separated by commas"
                          {...field}
                        />
                      </FormControl>
                      {field.value && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {field.value.split(",").map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="country">Country</FormLabel>
                      <FormControl>
                        <Input
                          id="country"
                          placeholder="e.g., Kenya"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="county"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="county">County/State/Region</FormLabel>
                      <FormControl>
                        <Input
                          id="county"
                          placeholder="e.g., Nairobi County"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="yearTaken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="yearTaken">Year Taken</FormLabel>
                      <FormControl>
                        <Input
                          id="yearTaken"
                          type="number"
                          placeholder="e.g., 2023"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))} // Ensure it's passed as a number
                        />
                      </FormControl>
                      <FormDescription>
                        The year the media was taken (e.g., 2023).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel htmlFor="featured">Featured Image</FormLabel>
                        <FormDescription>
                          Set this media as a featured item for prominent display.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="featured"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-napowa-blue hover:bg-napowa-blue/80 text-white"
                  type="submit" // This button submits the form
                  disabled={isSubmittingForm} // Disable until form is valid and all files are uploaded
                >
                  {isSubmittingForm ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Submit Gallery
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}