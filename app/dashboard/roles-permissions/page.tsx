"use client";

import React, { useEffect, useState, useMemo } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Search} from "lucide-react"; 
import { Form } from "@/components/ui/form";

const RESOURCES = {
  dashboard: ["view"],
  analytics: ["view"],
  members: ["view", "create", "manage_roles"],
  events: ["view", "create", "update", "delete"],
  blog: ["view", "create", "update", "delete", "manage_categories"],
  gallery: ["view", "create", "manage_albums"],
  donations: ["view", "manage_campaigns", "read_reports"],
  programs: ["view", "create"],
  volunteers: ["view", "create"],
  partners: ["view", "create"],
  messages: ["view"],
  meetings: ["view"],
  announcements: ["view"],
  notifications: ["view"],
  reports: ["view"],
  settings: ["view"],
} as const;

const RESOURCE_INFO: Record<
  keyof typeof RESOURCES,
  { title: string; description: string }
> = {
  dashboard: { title: "Dashboard", description: "Overview of key metrics and stats." },
  analytics: { title: "Analytics", description: "Detailed data analysis and reports." },
  members: { title: "Members", description: "Manage and view members of the platform." },
  events: { title: "Events", description: "Organize and manage events." },
  blog: { title: "Blog", description: "Manage blog posts and categories." },
  gallery: { title: "Gallery", description: "Manage photo albums and images." },
  donations: { title: "Donations", description: "Manage campaigns and reports." },
  programs: { title: "Programs", description: "Manage programs offered." },
  volunteers: { title: "Volunteers", description: "Manage volunteer information." },
  partners: { title: "Partners", description: "Manage partner organizations." },
  messages: { title: "Messages", description: "View and manage messages." },
  meetings: { title: "Meetings", description: "Schedule and track meetings." },
  announcements: { title: "Announcements", description: "Create and manage announcements." },
  notifications: { title: "Notifications", description: "Manage notification settings." },
  reports: { title: "Reports", description: "View generated reports." },
  settings: { title: "Settings", description: "System and application settings." },
};

const resourceKeys = Object.keys(RESOURCES) as (keyof typeof RESOURCES)[];

const RoleFormSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  permissions: z.record(
    z.enum(resourceKeys),
    z.array(z.string()).optional()
  ),
});

type RoleFormValues = z.infer<typeof RoleFormSchema>;

export default function RolePermissionManager() {
  const [existingRoles, setExistingRoles] = useState<string[]>([]);
  const [filterText, setFilterText] = useState("");
  const [openResources, setOpenResources] = useState<Record<string, boolean>>({});

  const form =useForm<RoleFormValues>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
      roleName: "",
      permissions: {},
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = form

  const watchedRole = watch("roleName");
  const watchedPermissions = watch("permissions");

  useEffect(() => {
    fetch("/api/roles")
      .then((res) => res.json())
      .then((data) => setExistingRoles(data.roles))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (existingRoles.includes(watchedRole)) {
      fetch(`/api/roles/${encodeURIComponent(watchedRole)}`)
        .then((res) => res.json())
        .then((data) => {
          setValue("permissions", data.permissions);
        })
        .catch(console.error);
    }
  }, [watchedRole, existingRoles, setValue]);

  const filteredResources = useMemo(() => {
    const lower = filterText.toLowerCase();
    return resourceKeys.filter((key) => {
      const { title, description } = RESOURCE_INFO[key];
      return (
        title.toLowerCase().includes(lower) ||
        description.toLowerCase().includes(lower) ||
        key.toLowerCase().includes(lower)
      );
    });
  }, [filterText]);

  const toggleResourceOpen = (resource: string) => {
    setOpenResources((prev) => ({ ...prev, [resource]: !prev[resource] }));
  };

  const toggleSelectAll = (resource: keyof typeof RESOURCES) => {
    const current = new Set(watchedPermissions?.[resource] || []);
    const all = RESOURCES[resource];
    const allSelected = all.every((a) => current.has(a));
    if (allSelected) {
      setValue(`permissions.${resource}`, []);
    } else {
      setValue(`permissions.${resource}`, all);
    }
  };

  const toggleSelectAllGlobal = () => {
    const allSelected = resourceKeys.every((resource) =>
      RESOURCES[resource].every((a) =>
        watchedPermissions?.[resource]?.includes(a)
      )
    );

    resourceKeys.forEach((resource) => {
      setValue(
        `permissions.${resource}`,
        allSelected ? [] : [...RESOURCES[resource]]
      );
    });
  };

  const onSubmit = async (values: RoleFormValues) => {
    try {
      const res = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast({ title: "Saved", description: `Role "${values.roleName}" updated.` });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Could not save role.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="roleName">Role</Label>
            <Controller
              name="roleName"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {existingRoles.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Input
              id="roleName"
              placeholder="Or type new role name"
              {...register("roleName")}
              className="mt-1"
            />
            {errors.roleName && (
              <p className="text-sm text-red-600">{errors.roleName.message}</p>
            )}
          </div>
        </div>

        {/* Search Input with Icon */}
        <div className="relative w-full max-w-md mt-6">
          <Search className="absolute left-3 top-3.5 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search resources..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        {/* Global Select All / Unselect All */}
        <div className="flex justify-end mt-2">
          <Button type="button" variant="outline" onClick={toggleSelectAllGlobal}>
            Toggle All Permissions
          </Button>
        </div>

        {/* Resource Permissions */}
        <div className="space-y-4 mt-4">
          {filteredResources.map((resource) => {
            const { title, description } = RESOURCE_INFO[resource];
            const isOpen = openResources[resource] ?? true;
            const currentActions = watchedPermissions?.[resource] || [];
            const allActions = RESOURCES[resource];
            const allSelected = allActions.every((a) => currentActions.includes(a));

            return (
              <div key={resource} className="border rounded shadow-sm">
                <button
                  type="button"
                  onClick={() => toggleResourceOpen(resource)}
                  className="w-full px-4 py-3 bg-gray-100 flex justify-between items-center focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`${resource}-content`}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-lg">{title}</span>
                    <span className="text-sm text-gray-600">{description}</span>
                  </div>
                  <span className="ml-2 text-xl select-none">{isOpen ? "−" : "+"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-4 py-4 bg-white"
                      id={`${resource}-content`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <Button type="button" size="sm" onClick={() => toggleSelectAll(resource)}>
                          {allSelected ? "Unselect All" : "Select All"}
                        </Button>
                        <span className="text-sm text-gray-500">
                          {currentActions.length} / {allActions.length} selected
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-6">
                        {allActions.map((action) => {
                          const fieldName = `permissions.${resource}` as const;
                          const checked = currentActions.includes(action);
                          return (
                            <div key={action} className="flex items-center space-x-2">
                              <Checkbox
                                id={`${resource}_${action}`}
                                checked={checked}
                                onCheckedChange={(val) => {
                                  const current = new Set(currentActions);
                                  if (val) current.add(action);
                                  else current.delete(action);
                                  setValue(fieldName, Array.from(current));
                                }}
                              />
                              <Label
                                htmlFor={`${resource}_${action}`}
                                className="capitalize cursor-pointer"
                              >
                                {action.replace(/_/g, " ")}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save Role"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
