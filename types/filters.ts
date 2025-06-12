

export interface PageFilters {
  search: string
  sortBy: "name" | "createdAt" | "userCount"
  sortOrder: "asc" | "desc"
}