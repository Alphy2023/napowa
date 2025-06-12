"use client"

import { useState, useEffect, useCallback } from "react"

// Types for the landing slides
export interface LandingSlide {
  id: string
  title: string
  description: string
  image: {
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
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  createdAt: string
  updatedAt: string
}

export type LandingSlideFormData = Omit<LandingSlide, "id" | "createdAt" | "updatedAt">

export function useLandingSlides() {
  const [slides, setSlides] = useState<LandingSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSlides = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/landing-slides")
      const result = await response.json()

      if (response.ok) {
        // Set slides directly from the response
        setSlides(Array.isArray(result) ? result : result.data || [])
      } else {
        setError(result.error || "Failed to fetch landing slides")
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Landing slides fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSlides()
  }, [fetchSlides])

  const createSlides = async (slidesData: LandingSlideFormData[]): Promise<LandingSlide[] | null> => {
    try {
      setLoading(true)
      const response = await fetch("/api/landing-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slidesData),
      })

      const result = await response.json()

      if (response.ok) {
        await fetchSlides() // Refresh the list
        return result.data || null
      } else {
        setError(result.error || "Failed to create landing slides")
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Landing slides creation error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateSlide = async (
    slideId: string,
    slideData: Partial<LandingSlideFormData>,
  ): Promise<LandingSlide | null> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/landing-slides`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: slideId, ...slideData }),
      })

      const result = await response.json()

      if (response.ok) {
        await fetchSlides() // Refresh the list
        return result.data || null
      } else {
        setError(result.error || "Failed to update landing slide")
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Landing slide update error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteSlide = async (slideId: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/landing-slides?id=${slideId}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (response.ok) {
        await fetchSlides() // Refresh the list
        return true
      } else {
        setError(result.error || "Failed to delete landing slide")
        return false
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Landing slide deletion error:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchSlides()
  }

  return {
    data: { slides },
    loading,
    error,
    createSlides,
    updateSlide,
    deleteSlide,
    refetch,
  }
}
