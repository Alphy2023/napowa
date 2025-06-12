
"use client"

import React from "react"
import { Role,RESOURCES } from "@/types/roles"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Edit,
  Trash2,
  Users,
  Shield,
  MoreHorizontal,
  Copy,
} from "lucide-react"


interface RoleCardProps{
 role: Role
  onEdit: (role: Role) => void
  onDelete: (role: Role) => void
  onClone: (role: Role) => void
}


export const RoleListItem =({
  role,
  onEdit,
  onDelete,
  onClone,
}: RoleCardProps) => {
  // Count total permissions
  const permissionCount = Object.values(role.permissions).reduce((total, actions) => total + actions.length, 0)

  // Get resources with permissions
  const resourcesWithPermissions = Object.keys(role.permissions).map(
    (resource) => RESOURCES[resource]?.title || resource,
  )

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold first-letter:capitalize">{role.name}</h3>
              <div className="flex flex-wrap gap-1 max-w-md">
                {resourcesWithPermissions.slice(0, 5).map((resource) => (
                  <Badge key={resource} variant="outline" className="text-xs">
                    {resource}
                  </Badge>
                ))}
                {resourcesWithPermissions.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{resourcesWithPermissions.length - 5} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{permissionCount} permissions</span>
                <span>{role.userCount || 0} users</span>
                <span>Created {new Date(role.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              <Users className="mr-1 h-3 w-3" />
              {role.userCount || 0}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(role)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onClone(role)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Clone
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(role)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}