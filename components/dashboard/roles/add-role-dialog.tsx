"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Plus
} from "lucide-react"

import { RESOURCE_CATEGORIES, RESOURCES, type PaginationParams, type Resource, type Role, type RoleFilters } from "@/types/roles"
import { RoleFormSchema, RoleFormValues } from "@/schemas/role.schema"
import { RoleForm } from "./role-form"
import { useRoles } from "@/hooks/useRoles"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"


interface RoleFormProps{
  isEdit?: boolean
  isDialogOpen:boolean;
  isClone?:boolean;
  setIsDialogOpen:(open:boolean)=>void;
  selectedRole?:Role
  setSelectedRole?:(role:Role|null)=>void;
  handleClose:()=>void;
}

export const AddRoleDialog = ({
  isEdit = false,
  isDialogOpen=false,
  selectedRole,
  handleClose,
  isClone=false,

  setIsDialogOpen
}: RoleFormProps) => {
    const [filters, setFilters] = useState<RoleFilters>({
    search: "",
    sortBy: "name",
    sortOrder: "asc",
    })
    const {toast} = useToast()
    const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12,
    })
   
    const [expandedResources, setExpandedResources] = useState<Set<string>>(new Set())
    const [selectedCategory, setSelectedCategory] = useState<string>("all")

    const { loading, error, 
    createRole, updateRole} = useRoles(filters, pagination)
    const form = useForm<RoleFormValues>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
        name: "",
        permissions: {},
    },
    })
    
    // Filter resources by category
    const filteredResources = useMemo(() => {
    if (selectedCategory === "all") {
        return Object.values(RESOURCES)
    }

    const resourcesInCategory = RESOURCE_CATEGORIES[selectedCategory] || []
    return resourcesInCategory.map((name) => RESOURCES[name]).filter(Boolean)
    }, [selectedCategory])

    
    
    const toggleResourceExpansion = (resourceName: string) => {
    setExpandedResources((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(resourceName)) {
        newSet.delete(resourceName)
        } else {
        newSet.add(resourceName)
        }
        return newSet
    })
    }

    const onSubmit = async (values: RoleFormValues) => {
    try {
        // Filter out empty permission arrays
        const cleanedPermissions = Object.fromEntries(
        Object.entries(values.permissions).filter(([_, actions]) => actions.length > 0),
        )

        const formData = {
        ...values,
        permissions: cleanedPermissions,
        }

        if (selectedRole && isEdit) {
        const result = await updateRole(selectedRole.id, formData)
        if (result) {
            toast({
            title: "Success",
            description: "Role updated successfully",
            })
            handleClose()
            form.reset()

        }
        } else {
        const result = await createRole(formData)
        if (result) {
            toast({
            title: "Success",
            description: "Role created successfully",
            })
            handleClose()
            form.reset()
        }
        }
    } catch (err: any) {
        toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive",
        })
    }
    }
     

    const togglePermission = (resourceName: string, action: string) => {
    const currentPermissions = form.getValues("permissions")
    const resourcePermissions = currentPermissions[resourceName] || []

    const newPermissions = resourcePermissions.includes(action)
        ? resourcePermissions.filter((a) => a !== action)
        : [...resourcePermissions, action]

    form.setValue(`permissions.${resourceName}`, newPermissions)
    }

    const toggleAllResourcePermissions = (resourceName: string) => {
    const resource = RESOURCES[resourceName]
    if (!resource) return

    const currentPermissions = form.getValues("permissions")
    const resourcePermissions = currentPermissions[resourceName] || []

    const allSelected = resource.actions.every((action) => resourcePermissions.includes(action))

    if (allSelected) {
        // Remove all permissions for this resource
        form.setValue(`permissions.${resourceName}`, [])
    } else {
        // Add all permissions for this resource
        form.setValue(`permissions.${resourceName}`, [...resource.actions])
    }
    }

    const isPermissionSelected = (resourceName: string, action: string) => {
    const permissions = form.watch("permissions")
    return permissions[resourceName]?.includes(action) || false
    }

    const countSelectedPermissions = () => {
    const permissions = form.watch("permissions")
    return Object.values(permissions).reduce((total, actions) => total + actions.length, 0)
    }

    const countResourcePermissions = (resourceName: string) => {
    const permissions = form.watch("permissions")
    return permissions[resourceName]?.length || 0
    }
    const updateFormValues = useCallback(()=>{
        if(selectedRole && isEdit){
            form.reset({
                name: selectedRole.name,
                permissions: selectedRole.permissions,
            })
        }
        if(selectedRole && isClone){
            form.reset({
              name: `${selectedRole.name} (Copy)`,
              permissions: { ...selectedRole.permissions },
            })
        }
    },[selectedRole,isEdit,isClone])

    useEffect(()=>{
        updateFormValues()
    },[updateFormValues])


  return (
    <>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {!isEdit && (
        <DialogTrigger asChild>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
        </Button>
        </DialogTrigger>
        )}
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle>{isEdit ? "Edit Role" :"Create New Role"}</DialogTitle>
            <DialogDescription>
                {isEdit ? "Update the role details and permissions." : 
                "Define a new role and assign permissions to it."}
            </DialogDescription>
        </DialogHeader>
        <RoleForm
            form={form}
            onSubmit={onSubmit}
            expandedResources={expandedResources}
            toggleResourceExpansion={toggleResourceExpansion}
            togglePermission={togglePermission}
            toggleAllResourcePermissions={toggleAllResourcePermissions}
            isPermissionSelected={isPermissionSelected}
            countSelectedPermissions={countSelectedPermissions}
            countResourcePermissions={countResourcePermissions}
            loading={loading}
            isEdit={isEdit}
            error={error}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredResources={filteredResources}
        />
        </DialogContent>
    </Dialog>
    </>
  )
}
