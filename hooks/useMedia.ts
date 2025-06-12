"use client"

import { useState, useEffect, useCallback } from "react"
import type { Media, MediaFormData, MediaResponse, ApiResponse, MediaFilters, PaginationParams } from "@/types/media"

export function useMedia(
  filters: MediaFilters = {
    search: "",
    category: "all",
    type: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  pagination: PaginationParams = { page: 1, limit: 12 },
) {
  const [data, setData] = useState<MediaResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const searchParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: filters.search,
        category: filters.category,
        type: filters.type,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      })

      const response = await fetch(`/api/media?${searchParams}`)
      const result: ApiResponse<MediaResponse> = await response.json()

      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError(result.error || "Failed to fetch media")
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Media fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [filters, pagination])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  const createMedia = async (mediaData: MediaFormData): Promise<Media | null> => {
    try {
      setLoading(true)
      const response = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mediaData),
      })

      const result: ApiResponse<Media> = await response.json()

      if (result.success && result.data) {
        await fetchMedia() // Refresh the list
        return result.data
      } else {
        setError(result.error || "Failed to create media")
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Media creation error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateMedia = async (mediaId: string, mediaData: MediaFormData): Promise<Media | null> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/media/${mediaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mediaData),
      })

      const result: ApiResponse<Media> = await response.json()

      if (result.success && result.data) {
        await fetchMedia() // Refresh the list
        return result.data
      } else {
        setError(result.error || "Failed to update media")
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Media update error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteMedia = async (mediaId: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/media/${mediaId}`, {
        method: "DELETE",
      })

      const result: ApiResponse<void> = await response.json()

      if (result.success) {
        await fetchMedia() // Refresh the list
        return true
      } else {
        setError(result.error || "Failed to delete media")
        return false
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Media deletion error:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchMedia()
  }

  return {
    data,
    loading,
    error,
    createMedia,
    updateMedia,
    deleteMedia,
    refetch,
  }
}
