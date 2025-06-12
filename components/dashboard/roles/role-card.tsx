"use client"

import React from "react"
import { Role,RESOURCES } from "@/types/roles"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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

export const RoleCard =({
  role,
  onEdit,
  onDelete,
  onClone,
}: RoleCardProps)=> {
  // Count total permissions
  const permissionCount = Object.values(role.permissions).reduce((total, actions) => total + actions.length, 0)

  // Get top resources with permissions
  const topResources = Object.entries(role.permissions)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3)
    .map(([resource]) => RESOURCES[resource]?.title || resource)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg first-letter:capitalize">{role.name}</CardTitle>
          </div>
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
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Users:</span>
            <Badge variant="secondary">
              <Users className="mr-1 h-3 w-3" />
              {role.userCount || 0}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Permissions:</span>
              <Badge variant="outline">{permissionCount}</Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {topResources.map((resource) => (
                <Badge key={resource} variant="outline" className="text-xs">
                  {resource}
                </Badge>
              ))}
              {Object.keys(role.permissions).length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{Object.keys(role.permissions).length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex w-full justify-between text-xs text-muted-foreground">
          <span>Created: {new Date(role.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(role.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  )
}