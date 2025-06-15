"use client"
import React, { useEffect, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Calendar,
  FileText,
  ImageIcon,
  DollarSign,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  Video,
  BellRing,
  ChevronDown,
  Award,
  Briefcase,
  Heart,
  Lock,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Logo } from "@/components/logo"
import { signOut, useSession } from "next-auth/react"
import { useAuthContext } from "@/contexts/auth-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { useUserStore } from "@/store/user.store"
import { usePermissions } from "@/hooks/usePermissions"
import { getFullname } from "@/lib/utils"

// Define user roles and their permissions
const ROLES = {
  ADMIN: "user",
  EDITOR: "editor",
  MEMBER: "member",
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    permission: { resource: "dashboard", action: "view" },
  },
  {
    title: "Roles & permissions",
    href: "/dashboard/roles-permissions",
    icon: Lock,
    permission: { resource: "roles", action: "view" },
  },
  {
    title: "Members",
    icon: Users,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      {
        title: "All Members",
        href: "/dashboard/members",
        permission: { resource: "members", action: "view" },
      },
      {
        title: "Add Member",
        href: "/dashboard/members/add",
        permission: { resource: "members", action: "create" },
      },
      {
        title: "Roles & Permissions",
        href: "/dashboard/members/roles",
        permission: { resource: "members", action: "manage_roles" },
      },
    ],
  },
  {
    title: "Events",
    icon: Calendar,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
    children: [
      {
        title: "All Events",
        href: "/dashboard/events",
        permission: { resource: "events", action: "view" },
      },
      {
        title: "Create Event",
        href: "/dashboard/events/create",
        permission: { resource: "events", action: "create" },
      },
      {
        title: "Categories",
        href: "/dashboard/events/categories",
        permission: { resource: "events", action: "manage_categories" },
      },
    ],
  },
  {
    title: "Blog",
    icon: FileText,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      {
        title: "All Posts",
        href: "/dashboard/blog",
        permission: { resource: "blog", action: "view" },
      },
      {
        title: "Create Post",
        href: "/dashboard/blog/create",
        permission: { resource: "blog", action: "create" },
      },
      {
        title: "Categories",
        href: "/dashboard/blog/categories",
        permission: { resource: "blog", action: "manage_categories" },
      },
    ],
  },
  {
    title: "Gallery",
    icon: ImageIcon,
    permission: { resource: "gallery", action: "view" },
    children: [
      {
        title: "All Media",
        href: "/dashboard/gallery",
        permission: { resource: "gallery", action: "view" },
      },
      {
        title: "Upload Media",
        href: "/dashboard/gallery/upload",
        permission: { resource: "gallery", action: "create" },
      },
    
    ],
  },
  {
    title: "Donations",
    icon: DollarSign,
    permission: { resource: "programs", action: "view" },
    children: [
      {
        title: "All Donations",
        href: "/dashboard/donations",
        permission: { resource: "donations", action: "view" },
      },
      {
        title: "Campaigns",
        href: "/dashboard/donations/campaigns",
        permission: { resource: "donations", action: "manage_campaigns" },
      },
      {
        title: "Reports",
        href: "/dashboard/donations/reports",
        permission: { resource: "donations", action: "read_reports" },
      },
    ],
  },
  {
    title: "Programs",
    icon: Award,
    permission: { resource: "programs", action: "view" },
    children: [
      {
        title: "All Programs",
        href: "/dashboard/programs",
        permission: { resource: "programs", action: "view" },
      },
      {
        title: "Add Program",
        href: "/dashboard/programs/add",
        permission: { resource: "programs", action: "create" },
      },
    ],
  },
  {
    title: "Volunteers",
    icon: Heart,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      {
        title: "All Volunteers",
        href: "/dashboard/volunteers",
        permission: { resource: "volunteers", action: "view" },
      },
      {
        title: "Add Volunteer",
        href: "/dashboard/volunteers/add",
        permission: { resource: "volunteers", action: "create" },
      },
    ],
  },
  {
    title: "Partners",
    icon: Briefcase,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      {
        title: "All Partners",
        href: "/dashboard/partners",
        permission: { resource: "partners", action: "view" },
      },
      {
        title: "Add Partner",
        href: "/dashboard/partners/add",
        permission: { resource: "partners", action: "create" },
      },
    ],
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
    permission: { resource: "messages", action: "view" },
  },
  {
    title: "Meetings",
    href: "/dashboard/meetings",
    icon: Video,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
    permission: { resource: "meetings", action: "view" },
  },
  {
    title: "Announcements",
    href: "/dashboard/announcements",
    icon: Bell,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    permission: { resource: "announcements", action: "view" },
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: BellRing,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
    permission: { resource: "notifications", action: "view" },
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    permission: { resource: "reports", action: "view" },
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
    permission: { resource: "settings", action: "view" },
  },
]

// Loading skeleton component for navigation items
const NavigationSkeleton = () => (
  <div className="space-y-2">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3 px-3 py-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 flex-1" />
      </div>
    ))}
  </div>
)

// User profile skeleton
const UserProfileSkeleton = () => (
  <div className="mb-4 px-4">
    <div className="flex items-center gap-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  </div>
)

export const DashboardSidebar = () => {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({})
  const [logoutLoading, setLogoutLoading] = React.useState<boolean>(false)
  const [isInitialized, setIsInitialized] = useState(false)

  const { data: session, status } = useSession()
  const { openSidebar, closeSidebar, sidebarOpen } = useAuthContext()
  const { user: currentUser } = useUserStore()
  const { hasPermission } = usePermissions()

  const pathname = usePathname()
  const isMobile = useIsMobile()
  const sidebarRef = React.useRef<HTMLDivElement | null>(null)

  // Check if everything is ready
  const isSessionReady = status !== "loading"
  const isUserReady = currentUser !== null
  const hasSessionPermissions = session?.user?.permissions !== undefined
  const isReady = isSessionReady && isUserReady && hasSessionPermissions && isInitialized

  // Initialize after a short delay to ensure middleware has run
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true)
    }, 500) // Small delay to ensure middleware completes

    return () => clearTimeout(timer)
  }, [])

  const filteredNavigation = React.useMemo(() => {
    if (!isReady) return []

    return navigationItems.filter((item) => {
      // Check permission access if permission is defined
      const hasPermissionAccess = item.permission
        ? hasPermission(item.permission.resource, item.permission.action)
        : false

      // For items with children, check if at least one child passes permission
      const childrenPass = item.children?.some((child) => {
        const childPermissionAccess = child.permission
          ? hasPermission(child.permission.resource, child.permission.action)
          : false
        return childPermissionAccess
      })

      return hasPermissionAccess || childrenPass
    })
  }, [isReady, hasPermission])

  const toggleCollapsible = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleLogout = async () => {
    setLogoutLoading(true)
    await signOut({ redirect: true, callbackUrl: "/auth/login" })
    setLogoutLoading(false)
  }

  useEffect(() => {
    if (!isMobile) {
      openSidebar()
    } else {
      closeSidebar()
    }
  }, [isMobile])

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isMobile && sidebarOpen) {
        closeSidebar()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarRef, isMobile, sidebarOpen])

  return (
    <>
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden" />
      )}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r 
        bg-background transition-transform duration-300 ease-in-out
            lg:top-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar header - desktop only */}
        <div className="hidden h-16 items-center border-b px-4 lg:flex">
          <Logo />
        </div>

        {/* Sidebar content */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            {/* User Profile Section */}
            {!isReady ? (
              <UserProfileSkeleton />
            ) : (
              <div className="mb-4 px-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {currentUser?.profile?.firstName?.[0] || "U"}
                      {currentUser?.profile?.lastName?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {getFullname(currentUser?.profile?.firstName, currentUser?.profile?.lastName)}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Section */}
            {!isReady ? (
              <NavigationSkeleton />
            ) : (
              <div className="space-y-1">
                {filteredNavigation.map((item) => {
                  const isActive = pathname === item.href

                  if (item?.children) {
                    // Filter children based on permissions
                    const filteredChildren = item.children.filter((child) => {
                      return child.permission ? hasPermission(child.permission.resource, child.permission.action) : true
                    })

                    // Don't render parent if no children pass permission check
                    if (filteredChildren.length === 0) return null

                    return (
                      <Collapsible
                        key={item.title}
                        open={openItems[item.title] || isActive}
                        onOpenChange={() => toggleCollapsible(item.title)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className={`w-full justify-between ${isActive ? " bg-napowa-red text-white hover:bg-napowa-red/80" : ""}`}
                          >
                            <div className="flex items-center">
                              <item.icon className="mr-2 h-4 w-4" />
                              <span>{item.title}</span>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${openItems[item.title] ? "rotate-180" : ""}`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-6 pt-1">
                          {filteredChildren.map((child) => {
                            const isChildActive = pathname === child.href
                            return (
                              <Button
                                key={child.title}
                                variant={isChildActive ? "secondary" : "ghost"}
                                className={`w-full justify-start ${isChildActive ? "bg-napowa-blue/20 bg-napowa-red text-white hover:bg-napowa-red/80" : ""}`}
                                asChild
                              >
                                <Link href={child.href}>{child.title}</Link>
                              </Button>
                            )
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    )
                  }

                  return (
                    <Button
                      key={item.title}
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start ${isActive ? "bg-napowa-red text-white hover:bg-napowa-red/80" : ""}`}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </Button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Logout Section */}
          <div className="mt-auto border-t p-4">
            {!isReady ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start cursor-pointer hover:bg-napowa-red/80 hover:text-white"
                loading={logoutLoading}
                onClick={handleLogout}
                disabled={logoutLoading}
              >
                <div className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </div>
              </Button>
            )}
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
