// hooks/useGallery.ts
"use client"

import { useState, useEffect, useCallback } from "react"
import type { Media, MediaFormData, MediaResponse, ApiResponse, MediaFilters, PaginationParams } from "@/types/media"

export function useGallery(
  filters: MediaFilters = {
    search: "",
    category: "all",
    // type: "all",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  pagination: PaginationParams = { page: 1, limit: 12 },
) {
  const [data, setData] = useState<MediaResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Directly construct the URLSearchParams from filters and pagination
      const queryParams = new URLSearchParams()
      queryParams.append("page", pagination.page.toString())
      queryParams.append("limit", pagination.limit.toString())
      if (filters.search) queryParams.append("search", filters.search)
      if (filters.category !== "all") queryParams.append("category", filters.category)
      // if (filters.type !== "all") queryParams.append("type", filters.type)
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy)
      if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder)

      const response = await fetch(`/api/gallery?${queryParams.toString()}`)
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
  }, [filters, pagination]) // Dependencies for useCallback

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery]) // Dependency on fetchGallery

  const deleteMedia = async (mediaId: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/gallery/${mediaId}`, {
        method: "DELETE",
      })

      const result: ApiResponse<void> = await response.json()

      if (result.success) {
        await fetchGallery() // Refresh the list
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
    fetchGallery()
  }

  return {
    data,
    loading,
    error,
    deleteMedia,
    refetch,
  }
}