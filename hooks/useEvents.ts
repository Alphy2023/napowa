"use client"

import { useState, useEffect, useCallback } from "react"
import type { Event, EventFormData, EventResponse, ApiResponse, EventFilters, PaginationParams } from "@/types/events"

export function useEvents(
  filters: EventFilters = {
    search: "",
    category: "all",
    status: "all",
    sortBy: "startDate",
    sortOrder: "desc",
  },
  pagination: PaginationParams = { page: 1, limit: 12 },
) {
  const [data, setData] = useState<EventResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const searchParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: filters.search,
        category: filters.category,
        status: filters.status,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      })

      const response = await fetch(`/api/events?${searchParams}`)
      const result: ApiResponse<EventResponse> = await response.json()

      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError(result.error || "Failed to fetch events")
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Events fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [filters, pagination])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const createEvent = async (eventData: EventFormData): Promise<Event | null> => {
    try {
      setLoading(true)
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      })

      const result: ApiResponse<Event> = await response.json()

      if (result.success && result.data) {
        await fetchEvents() // Refresh the list
        return result.data
      } else {
        setError(result.error || "Failed to create event")
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Event creation error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateEvent = async (eventId: string, eventData: EventFormData): Promise<Event | null> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      })

      const result: ApiResponse<Event> = await response.json()

      if (result.success && result.data) {
        await fetchEvents() // Refresh the list
        return result.data
      } else {
        setError(result.error || "Failed to update event")
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Event update error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (eventId: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      })

      const result: ApiResponse<void> = await response.json()

      if (result.success) {
        await fetchEvents() // Refresh the list
        return true
      } else {
        setError(result.error || "Failed to delete event")
        return false
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Event deletion error:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchEvents()
  }

  return {
    data,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    refetch,
  }
}
