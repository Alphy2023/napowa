"use client"

import { useState, useEffect, useCallback } from "react"
import type {
  Role,
  RoleFormData,
  RoleResponse,
  RoleFilters,
  PaginationParams,
} from "@/types/roles"
import { ApiResponse } from "@/lib/api/client"
import { roleApi } from "@/lib/api"

export function useRoles(
  filters: RoleFilters = {
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  },
  pagination: PaginationParams = { page: 1, limit: 10 },
) {
  const [data, setData] = useState<RoleResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const searchParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: filters.search,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      })
     
       const result: ApiResponse<RoleResponse> = await roleApi.getRoles(searchParams)
   
      if (result.success && result.data) {
        setData(result.data)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Roles fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [filters, pagination])

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  const createRole = async (roleData: RoleFormData): Promise<Role | null> => {
    try {
      setLoading(true)
       const result: ApiResponse<Role> = await roleApi.createRole(roleData)
      if (result.success && result.data) {
        await fetchRoles() // Refresh the list
        return result.data
      } else {
        setError(result.message)
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Role creation error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (roleId: string, roleData: RoleFormData): Promise<Role | null> => {
    try {
      setLoading(true)
      const result: ApiResponse<Role> = await roleApi.updateRole(roleId,roleData)

      if (result.success && result.data) {
        await fetchRoles() // Refresh the list
        return result.data
      } else {
        setError(result.message)
        return null
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Role update error:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteRole = async (roleId: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await fetch(`/api/roles/${roleId}`, {
        method: "DELETE",
      })

      const result: ApiResponse<void> = await response.json()

      if (result.success) {
        await fetchRoles() // Refresh the list
        return true
      } else {
        setError(result.error || "Failed to delete role")
        return false
      }
    } catch (err) {
      setError("Network error occurred")
      console.error("Role deletion error:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchRoles()
  }
  
  return {
    data,
    loading,
    error,
    createRole,
    updateRole,
    deleteRole,
    refetch,
  }
}
