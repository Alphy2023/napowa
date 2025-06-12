// Role and Permission Types
export interface Permission {
  resource: string
  actions: string[]
}

export interface Role {
  id: string
  name: string
  permissions: Record<string, string[]>
  userCount?: number
  createdAt: string
  updatedAt: string
}

export interface Resource {
  name: string
  title: string
  description: string
  actions: string[]
}

export interface RoleFormData {
  name: string
  permissions: Record<string, string[]>
}
// export type SearchParams = {
//   page?: string
//   limit?: string,
//   search?: string,
//   sortBy?: string,
//   sortOrder?: string,
// }
export interface RoleResponse {
  roles: Role[]
  resources: Resource[]
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

export interface RoleFilters {
  search: string
  sortBy: "name" | "createdAt" | "userCount"
  sortOrder: "asc" | "desc"
}

export interface PaginationParams {
  page: number
  limit: number
}

export const RESOURCES: Record<string, Resource> = {
  dashboard: { 
    name: "dashboard", 
    title: "Dashboard", 
    description: "Overview of key metrics and stats.", 
    actions: ["view","view stats"] 
  },
  members: { 
    name: "members", 
    title: "Members", 
    description: "Manage and view members of the platform.", 
    actions: ["view", "create", "manage_roles","delete_member"] 
  },
  events: { 
    name: "events", 
    title: "Events", 
    description: "Organize and manage events.", 
    actions: ["view", "create", "update", "delete"] 
  },
  blog: { 
    name: "blog", 
    title: "Blog", 
    description: "Manage blog posts and categories.", 
    actions: ["view", "create", "update", "delete", "manage_categories"] 
  },
  gallery: { 
    name: "gallery", 
    title: "Gallery", 
    description: "Manage photo albums and images.", 
    actions: ["view", "create", "update","delete"] 
  },
  donations: { 
    name: "donations", 
    title: "Donations", 
    description: "Manage campaigns and reports.", 
    actions: ["view","view_campaigns", "manage_campaigns", "read_reports"] 
  },
  programs: { 
    name: "programs", 
    title: "Programs", 
    description: "Manage programs offered.", 
    actions: ["view", "create","update","delete"] 
  },
  volunteers: { 
    name: "volunteers", 
    title: "Volunteers", 
    description: "Manage volunteer information.", 
    actions: ["view", "create","update","delete"] 
  },
  partners: { 
    name: "partners", 
    title: "Partners", 
    description: "Manage partner organizations.", 
    actions: ["view", "create","update","delete"] 
  },
  messages: { 
    name: "messages", 
    title: "Messages", 
    description: "View and manage messages.", 
    actions: ["view","create_messages","create_group","manage_messages","manage_groups"] 
  },
  meetings: { 
    name: "meetings", 
    title: "Meetings", 
    description: "Schedule and track meetings.", 
    actions: ["view","schedule_meetings","update_meetings","join_meetings","record_meetings"] 
  },
  announcements: { 
    name: "announcements", 
    title: "Announcements", 
    description: "Create and manage announcements.", 
    actions: ["view","create","update","delete"] 
  },
  notifications: { 
    name: "notifications", 
    title: "Notifications", 
    description: "Manage notification settings.", 
    actions: ["view","manage_notifications"] 
  },
  reports: { 
    name: "reports", 
    title: "Reports", 
    description: "View generated reports.", 
    actions: ["view","generate_reports"] 
  },
  settings: { 
    name: "settings", 
    title: "Settings", 
    description: "System and application settings.", 
    actions: ["view","manage_settings"] 
  },
}

// Resource categories for UI organization
export const RESOURCE_CATEGORIES: Record<string, string[]> = {
  "Core": ["dashboard", "analytics", "settings"],
  "Content": ["blog", "gallery", "announcements"],
  "Users": ["members", "volunteers"],
  "Operations": ["events", "meetings", "programs", "partners"],
  "Communication": ["messages", "notifications"],
  "Finance": ["donations", "reports"]
}
