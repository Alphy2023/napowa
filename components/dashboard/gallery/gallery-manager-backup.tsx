"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import {
  Search,
  Grid3X3,
  List,
  Plus,
  Edit,
  Trash2,
  ImageIcon,
  Video,
  MoreHorizontal,
  AlertCircle,
  RefreshCw,
  Eye,
  Play,
  Filter,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useGallery } from "@/hooks/useGallery"
import type { ViewMode, MediaFilters, PaginationParams, Media } from "@/types/media"
import { MEDIA_CATEGORIES } from "@/types/media"
import { MediaUploadForm } from "./media-upload-form"
import Link from "next/link"

// Loading skeletons
const MediaCardSkeleton = () => (
  <Card>
    <CardHeader className="p-0">
      <Skeleton className="h-48 w-full rounded-t-lg" />
    </CardHeader>
    <CardContent className="p-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardContent>
  </Card>
)

const MediaListSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

export default function GalleryManager() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filters, setFilters] = useState<MediaFilters>({
    search: "",
    category: "all",
    type: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  })
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12,
  })
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)
  const [previewMedia, setPreviewMedia] = useState<Media | null>(null)

  const { data, loading, error, createMedia, updateMedia,
     deleteMedia, refetch } = useGallery(filters, pagination)

  // Filter media by category for the tabs
  const mediaByCategory = useMemo(() => {
    if (!data?.media) return {}

    const grouped: Record<string, Media[]> = { all: [...data.media] }

    data.media.forEach((media) => {
      if (!grouped[media.category]) {
        grouped[media.category] = []
      }
      grouped[media.category].push(media)
    })

    return grouped
  }, [data?.media])

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleCategoryFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleTypeFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value as "image" | "video" | "all" }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleSortChange = (sortBy: MediaFilters["sortBy"]) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }))
  }

  const handleDelete = async (media: Media) => {
    if (confirm(`Are you sure you want to delete "${media.title}"?`)) {
      const success = await deleteMedia(media.id)
      if (success) {
        toast({
          title: "Success",
          description: "Media deleted successfully",
        })
      }
    }
  }

  const handleEdit = (media: Media) => {
    setSelectedMedia(media)
    setIsUploadDialogOpen(true)
  }

  const handlePreview = (media: Media) => {
    setPreviewMedia(media)
  }

  const handleUploadSuccess = () => {
    setIsUploadDialogOpen(false)
    setSelectedMedia(null)
    refetch()
  }

  // if (error) {
  //   return (
  //     <div className="space-y-6">
  //       <Alert variant="destructive">
  //         <AlertCircle className="h-4 w-4" />
  //         <AlertDescription>
  //           Failed to load media: {error}
  //           <Button variant="outline" size="sm" className="ml-2" onClick={refetch}>
  //             <RefreshCw className="h-4 w-4 mr-1" />
  //             Retry
  //           </Button>
  //         </AlertDescription>
  //       </Alert>
  //     </div>
  //   )
  // }

  const displayedMedia = selectedCategory === "all" ? data?.media || [] : mediaByCategory[selectedCategory] || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">Manage your images and videos</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/gallery/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload Media
          </Link>
        </Button>

        {/* <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Media
            </Button>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{selectedMedia ? "Edit Media" : "Upload New Media"}</DialogTitle>
              <DialogDescription>
                {selectedMedia ? "Update the details of your media" : "Upload a new image or video to your gallery"}
              </DialogDescription>
            </DialogHeader>
            <MediaUploadForm
              media={selectedMedia}
              onSuccess={handleUploadSuccess}
              onCancel={() => setIsUploadDialogOpen(false)}
            />
          </DialogContent>
        </Dialog> */}
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filters.category} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {MEDIA_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.type} onValueChange={handleTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="mb-4 flex w-full overflow-x-auto">
          <TabsTrigger value="all" className="flex-shrink-0">
            All Media
          </TabsTrigger>
          {data?.categories?.map((category) => (
            <TabsTrigger key={category.id} value={category.slug} className="flex-shrink-0">
              {category.name} ({category.mediaCount})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          {/* Media Display */}
          {loading ? (
            viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <MediaCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <MediaListSkeleton />
            )
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <AnimatePresence>
                    {displayedMedia.map((media) => (
                      <motion.div
                        key={media.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MediaCard
                          media={media}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onPreview={handlePreview}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {displayedMedia.map((media) => (
                      <motion.div
                        key={media.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MediaListItem
                          media={media}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onPreview={handlePreview}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {displayedMedia.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Filter className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No media found</h3>
                    <p className="text-muted-foreground">
                      {filters.search || filters.category !== "all" || filters.type !== "all"
                        ? "Try adjusting your search criteria"
                        : "Upload your first media to get started"}
                    </p>
                    <Button className="mt-4" 
                    // onClick={() => setIsUploadDialogOpen(true)}
                    asChild
                    >
                      <Link href="/dashboard/gallery/upload">
                      
                        <Plus className="mr-2 h-4 w-4" />
                        Upload Media
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {data && data.total > pagination.limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, data.total)} of {data.total} items
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.ceil(data.total / pagination.limit) }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === Math.ceil(data.total / pagination.limit) ||
                    Math.abs(page - pagination.page) <= 2,
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={pagination.page === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPagination((prev) => ({ ...prev, page }))}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= Math.ceil(data.total / pagination.limit)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Media Preview Dialog */}
      {/* {previewMedia && (
        <Dialog open={!!previewMedia} onOpenChange={(open) => !open && setPreviewMedia(null)}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{previewMedia.title}</DialogTitle>
              <DialogDescription>{previewMedia.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {previewMedia.type === "image" ? (
                <img
                  src={previewMedia.url || "/placeholder.svg"}
                  alt={previewMedia.title}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  {previewMedia.url.includes("youtube.com") || previewMedia.url.includes("youtu.be") ? (
                    <iframe
                      src={previewMedia.url.replace("watch?v=", "embed/")}
                      className="w-full h-full"
                      allowFullScreen
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  ) : previewMedia.url.includes("vimeo.com") ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${previewMedia.url.split("/").pop()}`}
                      className="w-full h-full"
                      allowFullScreen
                      title="Vimeo video player"
                      allow="autoplay; fullscreen; picture-in-picture"
                    ></iframe>
                  ) : (
                    <video src={previewMedia.url} controls className="w-full h-full">
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <Badge variant="outline" className="mr-2">
                  {previewMedia.category}
                </Badge>
                <Badge variant={previewMedia.type === "image" ? "default" : "secondary"}>
                  {previewMedia.type === "image" ? (
                    <ImageIcon className="mr-1 h-3 w-3" />
                  ) : (
                    <Video className="mr-1 h-3 w-3" />
                  )}
                  {previewMedia.type.charAt(0).toUpperCase() + previewMedia.type.slice(1)}
                </Badge>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(previewMedia)}>
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    handleDelete(previewMedia)
                    setPreviewMedia(null)
                  }}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )} */}

    </div>
  )
}

// Media Card Component
function MediaCard({
  media,
  onDelete,
  onEdit,
  onPreview,
}: {
  media: Media
  onDelete: (media: Media) => void
  onEdit: (media: Media) => void
  onPreview: (media: Media) => void
}) {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative group">
          {media.type === "image" ? (
            <img
              src={media.url || "/placeholder.svg"}
              alt={media.title}
              className="h-48 w-full object-cover"
              onClick={() => onPreview(media)}
            />
          ) : (
            <div className="h-48 w-full bg-black relative cursor-pointer" onClick={() => onPreview(media)}>
              <img
                src={media.thumbnailUrl || "/placeholder.svg?height=200&width=400"}
                alt={media.title}
                className="h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-12 w-12 text-white opacity-80" />
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant={media.type === "image" ? "default" : "secondary"}>
              {media.type === "image" ? <ImageIcon className="mr-1 h-3 w-3" /> : <Video className="mr-1 h-3 w-3" />}
              {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="mr-2"
              onClick={(e) => {
                e.stopPropagation()
                onPreview(media)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="mr-2"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(media)
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(media)
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium line-clamp-1">{media.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{media.category}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onPreview(media)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(media)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(media)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

// Media List Item Component
function MediaListItem({
  media,
  onDelete,
  onEdit,
  onPreview,
}: {
  media: Media
  onDelete: (media: Media) => void
  onEdit: (media: Media) => void
  onPreview: (media: Media) => void
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              {media.type === "image" ? (
                <img
                  src={media.url || "/placeholder.svg"}
                  alt={media.title}
                  className="h-full w-full rounded-md object-cover"
                  onClick={() => onPreview(media)}
                />
              ) : (
                <div
                  className="h-full w-full bg-black rounded-md relative cursor-pointer"
                  onClick={() => onPreview(media)}
                >
                  <img
                    src={media.thumbnailUrl || "/placeholder.svg?height=64&width=64"}
                    alt={media.title}
                    className="h-full w-full rounded-md object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white opacity-80" />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{media.title}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {media.category}
                </Badge>
                <Badge variant={media.type === "image" ? "default" : "secondary"} className="text-xs">
                  {media.type === "image" ? <ImageIcon className="mr-1 h-3 w-3" /> : <Video className="mr-1 h-3 w-3" />}
                  {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                </Badge>
              </div>
              {media.description && <p className="text-sm text-muted-foreground line-clamp-1">{media.description}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onPreview(media)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEdit(media)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(media)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
