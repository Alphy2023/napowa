

export interface PageFilters {
  search: string
  sortBy: "name" | "createdAt" | "userCount"
  sortOrder: "asc" | "desc"
}
export interface PaginationParams {
  page: number
  limit: number
}