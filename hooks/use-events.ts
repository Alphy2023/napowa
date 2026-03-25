import useSWR from "swr"
import type { Event } from "@prisma/client"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useEvents(status?: string, category?: string, page = 1, limit = 10) {
  const query = new URLSearchParams()
  if (status) query.append("status", status)
  if (category) query.append("category", category)
  query.append("page", page.toString())
  query.append("limit", limit.toString())

  const { data, error, isLoading, mutate } = useSWR(
    `/api/events?${query.toString()}`,
    fetcher
  )

  return {
    events: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  }
}

export function useEvent(id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/events/${id}` : null,
    fetcher
  )

  return {
    event: data,
    isLoading,
    error,
    mutate,
  }
}

export async function createEvent(data: Partial<Event>) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function updateEvent(id: string, data: Partial<Event>) {
  const response = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteEvent(id: string) {
  const response = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  })
  return response.json()
}
