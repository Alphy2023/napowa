import { z } from "zod"

export type EventStatus = "upcoming" | "ongoing" | "completed" | "cancelled"

export interface Event {
  id: string
  title: string
  slug: string
  description: string
  category: string
  location: string
  startDate: string
  endDate: string
  status: EventStatus
  featuredImage?: string
  featuredVideo?: string
  capacity: number
  registrations: number
  organizer: string
  createdAt: string
  updatedAt: string
}

export interface EventFormData {
  title: string
  description: string
  category: string
  location: string
  startDate: string
  endDate: string
  status: EventStatus
  featuredImage?: string
  featuredVideo?: string
  capacity: number
  organizer: string
}

export interface EventResponse {
  events: Event[]
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

export interface EventFilters {
  search: string
  category: string
  status: string
  sortBy: "title" | "startDate" | "createdAt" | "registrations"
  sortOrder: "asc" | "desc"
}

export interface PaginationParams {
  page: number
  limit: number
}

// Event categories
export const EVENT_CATEGORIES = [
  "Conference",
  "Workshop",
  "Seminar",
  "Health",
  "Support Group",
  "Training",
  "Fundraising",
  "Social",
  "Other",
]

// Event statuses
export const EVENT_STATUSES = [
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

// Zod schema for event validation
export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  status: z.enum(["upcoming", "ongoing", "completed", "cancelled"]),
  featuredImage: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  featuredVideo: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  capacity: z.coerce
    .number()
    .int("Capacity must be a whole number")
    .positive("Capacity must be positive")
    .optional()
    .or(z.literal("")),
})

export type EventFormValues = z.infer<typeof eventSchema>
