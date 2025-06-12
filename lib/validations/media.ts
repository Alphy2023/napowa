import { z } from "zod"
import { MEDIA_CATEGORIES } from "@/types/media"

// Helper function to validate video URLs
const isValidVideoUrl = (url: string) => {
  // Check for YouTube URLs
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
  // Check for Vimeo URLs
  const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+/
  // Check for direct video file URLs
  const videoFileRegex = /\.(mp4|webm|ogg|mov)$/i
  
  return youtubeRegex.test(url) || vimeoRegex.test(url) || videoFileRegex.test(url)
}

// Helper function to validate image URLs
const isValidImageUrl = (url: string) => {
  const imageRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i
  return imageRegex.test(url)
}

export const mediaSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
  type: z.enum(["image", "video"], {
    required_error: "Please select a media type",
    invalid_type_error: "Media type must be either 'image' or 'video'",
  }),
  url: z.string().url("Please enter a valid URL").refine(
    (url) => true, // We'll validate based on type in a subsequent refinement
    { message: "Please enter a valid URL" }
  ),
  thumbnailUrl: z.string().url("Please enter a valid thumbnail URL").optional(),
  category: z.enum([...MEDIA_CATEGORIES, "all"] as [string, ...string[]], {
    required_error: "Please select a category",
    invalid_type_error: "Invalid category selected",
  }),
}).refine(
  (data) => {
    if (data.type === "video") {
      return isValidVideoUrl(data.url)
    } else if (data.type === "image") {
      return isValidImageUrl(data.url)
    }
    return true
  },
  {
    message: "URL must match the selected media type",
    path: ["url"],
  }
)

export const mediaFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  type: z.enum(["image", "video", "all"]).optional(),
  sortBy: z.enum(["title", "createdAt", "category"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
})

export type MediaFormValues = z.infer<typeof mediaSchema>
export type MediaFilterValues = z.infer<typeof mediaFilterSchema>
