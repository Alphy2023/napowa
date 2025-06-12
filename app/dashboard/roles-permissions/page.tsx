"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import {
  Edit,
  Trash2,
  Users,
  Shield,
  MoreHorizontal,
  Copy,
} from "lucide-react"
import { useRoles } from "@/hooks/useRoles"
import type { ViewMode, RoleFilters, PaginationParams, Role } from "@/types/roles"
import { RESOURCES } from "@/types/roles"
import PageFetchErrroUI from "@/components/page-fetch-error-ui"
import { RoleListSkeleton } from "@/components/dashboard/roles/role-list-skeleton"
import { RoleCardSkeleton } from "@/components/dashboard/roles/role-card-skeleton"
import { AddRoleDialog } from "@/components/dashboard/roles/add-role-dialog"
import FilterControlUI from "@/components/filter-control-ui"
import { RoleCard } from "@/components/dashboard/roles/role-card"
import { RoleListItem } from "@/components/dashboard/roles/role-list-card"



export default function RolePermissionManager() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filters, setFilters] = useState<RoleFilters>({
    search: "",
    sortBy: "name",
    sortOrder: "asc",
  })
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12,
  })
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isClone,setIsClone] = useState(false)
 

  const { data, loading, error, 
     deleteRole, refetch } = useRoles(filters, pagination)


  // Filter and sort roles
  const filteredRoles = useMemo(() => {
    if (!data?.roles) return []
    return data.roles
  }, [data?.roles])

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handleSortChange = (sortBy: RoleFilters["sortBy"]) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc",
    }))
  }

  const handleClose = ()=>{
    refetch()
    setSelectedRole(null)
    setIsCreateDialogOpen(false)
    setIsEditDialogOpen(false)
    setIsClone(false)
  }


  const handleEdit = (role: Role) => {
    setSelectedRole(role)
    setIsEditDialogOpen(true)
  }

  const handleClone = (role: Role) => {
    setSelectedRole(role)
    setIsCreateDialogOpen(true)
    setIsClone(true)

  }

  const handleDelete = async (role: Role) => {
    if (confirm(`Are you sure you want to delete the role "${role.name}"?`)) {
      const success = await deleteRole(role.id)
      if (success) {
        toast({
          title: "Success",
          description: "Role deleted successfully",
        })
      }
    }
  }


  if (error) {
    return (
      <PageFetchErrroUI
        error={error}
        refetch={refetch}
        title="roles"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role & Permission Management</h1>
          <p className="text-muted-foreground">Manage user roles and their permissions across the system</p>
        </div>

        <AddRoleDialog
        isEdit={false}
        isDialogOpen={isCreateDialogOpen}
        setIsDialogOpen={setIsCreateDialogOpen}
        selectedRole={isClone && selectedRole}
        handleClose={handleClose}

        isClone={isClone}
        />
        
      </div>

      {/* Filters and Controls */}
 
      <FilterControlUI
        loading={loading}
        filters={filters}
        refetch={refetch}
        handleSearch={handleSearch}
        handleSortChange={handleSortChange}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />

      {/* Roles Display */}
      {loading ? (
        viewMode === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <RoleCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <RoleListSkeleton />
        )
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredRoles.map((role) => (
                <RoleCard 
                 key={role.id} 
                 role={role}
                 onEdit={handleEdit} 
                 onDelete={handleDelete} onClone={handleClone} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRoles.map((role) => (
                <RoleListItem
                  key={role.id}
                  role={role}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onClone={handleClone}
                />
              ))}
            </div>
          )}

          {filteredRoles.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No roles found</h3>
                <p className="text-muted-foreground">
                  {filters.search ? "Try adjusting your search criteria" : "Create your first role to get started"}
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Pagination */}
      {data && data.total > pagination.limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, data.total)} of {data.total} roles
          </p>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.ceil(data.total / pagination.limit) }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === Math.ceil(data.total / pagination.limit) ||
                    Math.abs(page - pagination.page) <= 2,
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={pagination.page === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPagination((prev) => ({ ...prev, page }))}
                    >
                      {page}
                    </Button>
                  </React.Fragment>
                ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= Math.ceil(data.total / pagination.limit)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
       <AddRoleDialog
        isEdit={true}
        isDialogOpen={isEditDialogOpen}
        setSelectedRole={setSelectedRole}
        handleClose={handleClose}
        selectedRole={selectedRole}
        setIsDialogOpen={setIsEditDialogOpen}
        />
    </div>
  )
}

