export type MediaType = "image" | "video"

export interface Media {
  id: string
  title: string
  description?: string
  type: MediaType
  url: string
  thumbnailUrl?: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface MediaCategory {
  id: string
  name: string
  slug: string
  description?: string
  mediaCount: number
}

export interface MediaFormData {
  title: string
  description?: string
  type: MediaType
  url: string
  thumbnailUrl?: string
  category: string
}

export interface MediaResponse {
  media: Media[]
  categories: MediaCategory[]
  total: number
  page: number
  limit: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type ViewMode = "grid" | "list"

export interface MediaFilters {
  search: string
  category: string
  type: MediaType | "all"
  sortBy: "title" | "createdAt" | "category"
  sortOrder: "asc" | "desc"
}

export interface PaginationParams {
  page: number
  limit: number
}

// Media categories
export const MEDIA_CATEGORIES = [
  "Skills Development",
  "Events",
  "Workshops",
  "Testimonials",
  "Programs",
  "Partners",
  "General",
]
