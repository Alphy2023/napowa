"use client"

import React, { useState, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { toast } from "@/components/ui/use-toast"
import {
  Search,
  Grid3X3,
  List,
  Plus,
  AlertCircle,
  RefreshCw,
  Filter,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useGallery } from "@/hooks/useGallery"
import type {Media} from "@/types/media"
import { MEDIA_CATEGORIES } from "@/types/media"
import Link from "next/link"
import { ViewMode } from "@/types/view-mode.types"
import { GalleryItemResponse, MediaFilters } from "@/types/gallery"
import { MediaCard } from "./media-card"
import { MediaListItem } from "./media-list-item"
import PageFetchErrroUI from "@/components/page-fetch-error-ui"
import { PaginationParams } from "@/types/filters"





interface GalleryManagerProps{
  showHeader?:boolean
  canManage?:boolean
  cardHref:string
}
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

export default function GalleryManager({showHeader=false,canManage=false,
  cardHref
}:GalleryManagerProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const [yearFilter, setYearFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  
  const [filters, setFilters] = useState<MediaFilters>({
    search: "",
    category: "all",
    // type: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  })
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12,
  })
  


  // Combine filters and pagination into a single options object for useGallery
  const galleryOptions = useMemo(() => ({
    ...filters,
    ...pagination,
  }), [filters, pagination]);

  const { data, loading, error, refetch } = useGallery(galleryOptions);

  const years = Array.from(new Set(data?.galleryEntries?.map((media) => media.yearTaken)))
  const locations = Array.from(new Set(data?.galleryEntries?.map((media) => media.county)))

  // Filter media by category for the tabs
  const mediaByCategory = useMemo(() => {
    if (!data?.galleryEntries) return {}

    const grouped: Record<string, GalleryItemResponse[]> = { all: [...data.galleryEntries] }

    data.galleryEntries.forEach((media) => {
      if (!grouped[media.album]) { 
        grouped[media.album] = []
      }
      grouped[media.album].push(media as GalleryItemResponse) 
    })

    return grouped
  }, [data?.galleryEntries])

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
      try {
        const response = await fetch(`/api/gallery/${media.id}`, { // Assuming an API endpoint for deleting media
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete media');
        }
        toast({
          title: "Success",
          description: "Media deleted successfully",
        });
        refetch(); // Refetch data after successful deletion
      } catch (err) {
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "An unknown error occurred during deletion.",
          variant: "destructive",
        });
      }
    }
  }

  const handleEdit = (mediaId:string) => {
  }

  const handlePreview = (mediaId:string) => {
    router.push(`${cardHref}/${mediaId}`)
  }



  if (error) {
    return (
      <PageFetchErrroUI
      refetch={refetch}
      title="gallery"
      error={error}
      />
    )
  }

  const displayedMedia = selectedCategory === "all" ? data?.galleryEntries || [] : mediaByCategory[selectedCategory] || []

  return (
    <div className="space-y-6 container">
      
    {/* Header */}
      {showHeader && (
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

        </div>

      )}

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
                  {MEDIA_CATEGORIES.map((album) => (
                    <SelectItem key={album} value={album}>
                      {album}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

               {/* <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{yearFilter === "all" ? "All Years" : yearFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              {/* <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{locationFilter === "all" ? "All Locations" : locationFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              {/* <Select value={filters.type} onValueChange={handleTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select> */}
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
                          galleryEntry={media} 
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onPreview={handlePreview}
                          canManage={canManage}
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
                          galleryEntry={media} 
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onPreview={handlePreview}
                          canManage={canManage}
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

     
    </div>
  )
}

