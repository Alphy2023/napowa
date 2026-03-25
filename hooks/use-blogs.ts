import useSWR from "swr"
import type { Blog } from "@prisma/client"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useBlogs(category?: string, published = true, page = 1, limit = 10) {
  const query = new URLSearchParams()
  if (category) query.append("category", category)
  query.append("published", published.toString())
  query.append("page", page.toString())
  query.append("limit", limit.toString())

  const { data, error, isLoading, mutate } = useSWR(
    `/api/blogs?${query.toString()}`,
    fetcher
  )

  return {
    blogs: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  }
}

export function useBlog(id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/blogs/${id}` : null,
    fetcher
  )

  return {
    blog: data,
    isLoading,
    error,
    mutate,
  }
}

export async function createBlog(data: Partial<Blog>) {
  const response = await fetch("/api/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function updateBlog(id: string, data: Partial<Blog>) {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteBlog(id: string) {
  const response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  })
  return response.json()
}

export async function publishBlog(id: string) {
  return updateBlog(id, { published: true, publishedAt: new Date() })
}
