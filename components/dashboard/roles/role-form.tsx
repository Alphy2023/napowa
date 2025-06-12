"use client"

import React from "react"
import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DialogFooter,
} from "@/components/ui/dialog"
import {
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Info,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Resource, RESOURCE_CATEGORIES } from "@/types/roles"


import { RoleFormValues } from "@/schemas/role.schema"
import ScrollableTablist from "@/components/scrollable-tablist"
import { rolePermissionResourcesTabs } from "@/utils/tabs"
import { CustomAlert } from "@/components/CustomAlert"



interface RoleFormProps{
  form: any
  onSubmit: (values: RoleFormValues) => void
  expandedResources: Set<string>
  toggleResourceExpansion: (resourceName: string) => void
  togglePermission: (resourceName: string, action: string) => void
  toggleAllResourcePermissions: (resourceName: string) => void
  isPermissionSelected: (resourceName: string, action: string) => boolean
  countSelectedPermissions: () => number
  countResourcePermissions: (resourceName: string) => number
  loading: boolean
  isEdit?: boolean
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  filteredResources: Resource[]
  error?:string | null
}
// Role Form Component
export const RoleForm =({
  form,
  onSubmit,
  expandedResources,
  toggleResourceExpansion,
  togglePermission,
  toggleAllResourcePermissions,
  isPermissionSelected,
  countSelectedPermissions,
  countResourcePermissions,
  loading,
  isEdit = false,
  selectedCategory,
  setSelectedCategory,
  filteredResources,
  error
}: RoleFormProps) =>{
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Role Name</Label>
          <Input id="name" {...form.register("name")} placeholder="Enter role name" />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center space-x-2">
            <Label className="text-base font-semibold">Permissions</Label>
            <Badge variant="outline">{countSelectedPermissions()} selected</Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Select permissions for this role</span>
          </div>
        </div>

        {form.formState.errors.permissions && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{form.formState.errors.permissions.message}</AlertDescription>
          </Alert>
        )}

        {/* Resource Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
           <ScrollableTablist
            items={rolePermissionResourcesTabs}
            noCenter={true}
            />
          <TabsContent value={selectedCategory} className="mt-4">
            <div className="space-y-4">
              {filteredResources.map((resource) => {
                const isExpanded = expandedResources.has(resource.name)
                const selectedCount = countResourcePermissions(resource.name)
                const allSelected = resource.actions.length === selectedCount && selectedCount > 0

                return (
                  <Card key={resource.name} className={allSelected ? "border-primary/50" : ""}>
                    <CardHeader className="py-3 px-4">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleResourceExpansion(resource.name)}
                      >
                        <div className="flex items-center space-x-3">
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                          <div>
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge variant={allSelected ? "default" : "outline"}>
                            {selectedCount}/{resource.actions.length}
                          </Badge>
                          <Button
                            type="button"
                            variant={allSelected ? "default" : "outline"}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleAllResourcePermissions(resource.name)
                            }}
                          >
                            {allSelected ? "Unselect All" : "Select All"}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CardContent className="border-t bg-muted/20 pt-4">
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                              {resource.actions.map((action) => (
                                <div key={action} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`${resource.name}_${action}`}
                                    checked={isPermissionSelected(resource.name, action)}
                                    onCheckedChange={() => togglePermission(resource.name, action)}
                                  />
                                  <Label
                                    htmlFor={`${resource.name}_${action}`}
                                    className="text-sm capitalize cursor-pointer"
                                  >
                                    {action.replace(/_/g, " ")}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

         {error && (
            <CustomAlert variant={"destructive"} text={error}/>
          )}
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin-fast" />
              {isEdit ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {isEdit ? "Update Role" : "Create Role"}
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}