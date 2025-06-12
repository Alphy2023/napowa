"use client"

import { useState, useEffect } from "react"
import type { AnalyticsResponse, TimeRange, ApiResponse } from "@/types/analytics"

export function useAnalytics(timeRange: TimeRange = "this_year") {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/analytics?timeRange=${timeRange}`)
        const result: ApiResponse<AnalyticsResponse> = await response.json()

        if (result.success && result.data) {
          setData(result.data)
        } else {
          setError(result.error || "Failed to fetch analytics")
        }
      } catch (err) {
        setError("Network error occurred")
        console.error("Analytics fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange])

  const refetch = () => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/analytics?timeRange=${timeRange}`)
        const result: ApiResponse<AnalyticsResponse> = await response.json()

        if (result.success && result.data) {
          setData(result.data)
        } else {
          setError(result.error || "Failed to fetch analytics")
        }
      } catch (err) {
        setError("Network error occurred")
        console.error("Analytics fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }

  return { data, loading, error, refetch }
}
