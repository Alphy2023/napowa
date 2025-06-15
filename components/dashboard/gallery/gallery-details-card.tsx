"use client"

import { useState, useEffect, useCallback, useRef } from "react" // Import useRef
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Download, Edit, Heart, Share2, Trash, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGallery } from "@/hooks/useGallery"
import { GalleryItemResponse } from "@/types/gallery"
import { formatBytes, isVideoFormat } from "@/lib/utils"
import PageFetchErrroUI from "@/components/page-fetch-error-ui"
import GalleryDetailsPageLoading from "./gallery-details-loading"

interface GallerDetailsCardProps{
    canManage?:boolean
}
export default function GalleryDetailsCard({canManage=false}
    :GallerDetailsCardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const params = useParams()
  const { getGalleryById, loading, error,shareGallery } = useGallery(undefined, true);
  const [galleryItem, setGalleryItem] = useState<GalleryItemResponse | null>(null);

  const [isFeatured, setIsFeatured] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("") // Added state for description
  const [album, setAlbum] = useState("")
  const [tags, setTags] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0) // State for current slide in the main display

  // Ref for the thumbnail container to enable scrolling
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const fetchGalleryItem = useCallback(async() => {
    const data = await getGalleryById(params?.id)
    setGalleryItem(data)
  }, [params?.id, getGalleryById])

  useEffect(() => {
    fetchGalleryItem()
  }, [fetchGalleryItem])

  useEffect(() => {
    if (galleryItem) {
      setIsFeatured(galleryItem.isFeatured);
      setTitle(galleryItem.title);
      setDescription(galleryItem.description || ""); // Initialize description
      setAlbum(galleryItem.album);
      setTags(galleryItem.tags || ""); // Initialize tags

      if (currentSlide >= galleryItem.media.length) {
        setCurrentSlide(0);
      }
    }
  }, [galleryItem, currentSlide]);

  // Effect to scroll the selected thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current && galleryItem && galleryItem.media.length > 0) {
      const selectedThumbnail = thumbnailsRef.current.children[currentSlide] as HTMLElement;
      if (selectedThumbnail) {
        // Scroll the selected thumbnail into view, with a smooth behavior
        selectedThumbnail.scrollIntoView({
          behavior: 'smooth',
          inline: 'center', // This is key for horizontal scrolling
          block: 'nearest'
        });
      }
    }
  }, [currentSlide, galleryItem]); // Re-run when currentSlide or galleryItem changes

  const handleToggleFeatured = () => {
    setIsFeatured(!isFeatured)
    toast({
      title: isFeatured ? "Removed from featured" : "Added to featured",
      description: `The image has been ${isFeatured ? "removed from" : "added to"} featured images.`,
    })
  }

  const handleDelete = () => {
    toast({
      title: "Image deleted",
      description: "The image has been deleted successfully.",
    })
    router.push("/dashboard/gallery")
  }

  const handleDownload = () => {
    if (!galleryItem || !galleryItem.media || galleryItem.media.length === 0) {
      toast({
        title: "Download failed",
        description: "No media available to download.",
        variant: "destructive"
      });
      return;
    }
    const mediaToDownload = galleryItem.media[currentSlide];
    if (mediaToDownload && mediaToDownload.url) {
      const link = document.createElement('a');
      link.href = mediaToDownload.url;
      link.download = mediaToDownload.original_filename || `media-${galleryItem.id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Download started",
        description: "The media is being downloaded.",
      });
    } else {
      toast({
        title: "Download failed",
        description: "Media URL not found.",
        variant: "destructive"
      });
    }
  }

  const handleShare = () => {
    shareGallery({title:galleryItem.title,album:galleryItem.album})
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    toast({
      title: "Changes saved",
      description: "The media details have been updated successfully.",
    })
    // In a real app, you'd send these changes to your backend API
    // console.log("Saving changes:", { title, description, album, tags, isFeatured });
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const goToPreviousSlide = useCallback(() => {
    if (!galleryItem || galleryItem.media.length === 0) return;
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? galleryItem.media.length - 1 : prevSlide - 1
    )
  }, [galleryItem]);

  const goToNextSlide = useCallback(() => {
    if (!galleryItem || galleryItem.media.length === 0) return;
    setCurrentSlide((prevSlide) =>
      prevSlide === galleryItem.media.length - 1 ? 0 : prevSlide + 1
    )
  }, [galleryItem]);

  const handleThumbnailClick = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Functions to scroll thumbnails left/right
  const scrollThumbnailsLeft = () => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollBy({ left: -200, behavior: 'smooth' }); // Scroll by a fixed amount
    }
  };

  const scrollThumbnailsRight = () => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll by a fixed amount
    }
  };

  if (loading) {
    return <GalleryDetailsPageLoading/>
  }

 if (error) {
    return (
      <PageFetchErrroUI
      refetch={fetchGalleryItem}
      title="media"
      error={error}
      />
    )
  }

  if (!galleryItem) {
    return <div className="text-center py-8">Media item not found.</div>;
  }

  const currentMedia = galleryItem.media[currentSlide];
  const fileType = currentMedia && isVideoFormat(currentMedia.format) ? "video" : "image";


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-col sm:flex-row
      space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Media Details</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          {canManage && (
            <>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
            </Button>
          
            <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash className="h-4 w-4" />
            </Button>
            </>
          )}
          
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden">
                {/* Slider controls and main media display */}
                {galleryItem.media.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                      onClick={goToPreviousSlide}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                      onClick={goToNextSlide}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
                {/* Conditionally render Image or Video based on media type */}
                {currentMedia ? (
                  fileType === 'image' ? (
                    <Image
                      src={currentMedia.url || "/placeholder.svg"}
                      alt={currentMedia.original_filename || galleryItem.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                      {/* <p>Video Player Placeholder</p> */}
                      <video src={currentMedia.url} controls className="w-full h-full object-contain"></video>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                    <p>No media to display</p>
                  </div>
                )}
              </div>

              {/* Thumbnail navigation below the main slider */}
              {galleryItem.media.length > 1 && (
                <div className="relative mt-4 px-4 pb-4 flex items-center"> {/* Added relative and items-center */}
                  {/* Left Scroll Button for Thumbnails */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                    onClick={scrollThumbnailsLeft}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div
                    ref={thumbnailsRef} // Assign the ref here
                    className="flex gap-2 overflow-x-auto justify-center flex-grow scrollbar-hide" // scrollbar-hide to hide default scrollbar
                    // Adding `snap-x mandatory` and `scroll-smooth` can enhance the scrolling experience
                    // className="flex gap-2 overflow-x-auto snap-x snap-mandatory scroll-smooth justify-center flex-grow scrollbar-hide"
                  >
                    {galleryItem.media.map((media, index) => (
                      <div
                        key={media?.public_id || index}
                        className={`relative w-24 h-16 cursor-pointer overflow-hidden rounded-md flex-shrink-0
                          ${index === currentSlide ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                        onClick={() => handleThumbnailClick(index)}
                      >
                        {!isVideoFormat(media?.format) ? (
                          <Image
                            src={media?.url || "/placeholder.svg"}
                            alt={media?.original_filename || `Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center
                            justify-center w-full h-full
                            bg-gray-200 text-gray-500 text-xs">
                            Video
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Right Scroll Button for Thumbnails */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                    onClick={scrollThumbnailsRight}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Information</CardTitle>
              <CardDescription>Details about this media file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <>
                  <div>
                    <h3 className="text-lg font-semibold">{galleryItem?.title}</h3>
                    <p className="mt-2 text-sm
                      text-muted-foreground">{galleryItem?.description}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Album:</span>
                      <Badge variant="outline">{album}</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Uploaded by:</span>
                      <span className="text-sm">{galleryItem?.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Upload date:</span>
                      <span className="text-sm">{formatDate(galleryItem?.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Featured:</span>
                      <span className="text-sm">{isFeatured ? "Yes" : "No"}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Dimensions:</span>
                      <span className="text-sm">
                        {currentMedia?.height && currentMedia?.width
                          ? `${currentMedia.width} x ${currentMedia.height}`
                          : "N/A"
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Size:</span>
                      <span className="text-sm">{currentMedia?.bytes ? formatBytes(currentMedia.bytes) : "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Format:</span>
                      <span className="text-sm">{currentMedia?.format || "N/A"}</span>
                    </div>
                  </div>


                  {canManage && (
                    <>
                        <Separator />
                        <div className="space-y-2">
                            <div className="flex justify-between">
                            <span className="text-sm font-medium">Views:</span>
                            <span className="text-sm">{galleryItem?.views}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-sm font-medium">Downloads:</span>
                            <span className="text-sm">{galleryItem?.downloads}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="text-sm font-medium">Likes:</span>
                            <span className="text-sm">{galleryItem?.likes}</span>
                            </div>
                        </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <span className="text-sm font-medium">Tags:</span>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {tags.split(",").filter(tag => tag.trim() !== "").map((tag, index) => (
                        <Badge key={index} variant="secondary"
                          className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Related Images</CardTitle>
              <CardDescription>Other images from the same album</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Related images feature coming soon or needs implementation to fetch related content.</p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  )
}