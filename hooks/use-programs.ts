import useSWR from "swr"
import type { Program, ProgramCategory } from "@prisma/client"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function usePrograms(categoryId?: string, page = 1, limit = 10) {
  const query = new URLSearchParams()
  if (categoryId) query.append("categoryId", categoryId)
  query.append("page", page.toString())
  query.append("limit", limit.toString())

  const { data, error, isLoading, mutate } = useSWR(
    `/api/programs?${query.toString()}`,
    fetcher
  )

  return {
    programs: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate,
  }
}

export function useProgram(id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/programs/${id}` : null,
    fetcher
  )

  return {
    program: data,
    isLoading,
    error,
    mutate,
  }
}

export function useProgramCategories() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/program-categories",
    fetcher
  )

  return {
    categories: data?.data || [],
    isLoading,
    error,
    mutate,
  }
}

export async function createProgram(data: Partial<Program>) {
  const response = await fetch("/api/programs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function updateProgram(id: string, data: Partial<Program>) {
  const response = await fetch(`/api/programs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteProgram(id: string) {
  const response = await fetch(`/api/programs/${id}`, {
    method: "DELETE",
  })
  return response.json()
}

export async function createProgramCategory(data: Partial<ProgramCategory>) {
  const response = await fetch("/api/program-categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function updateProgramCategory(id: string, data: Partial<ProgramCategory>) {
  const response = await fetch(`/api/program-categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function deleteProgramCategory(id: string) {
  const response = await fetch(`/api/program-categories/${id}`, {
    method: "DELETE",
  })
  return response.json()
}
