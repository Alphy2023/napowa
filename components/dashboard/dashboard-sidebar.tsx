"use client"
import React, { useEffect } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Calendar, FileText, ImageIcon, DollarSign, Settings, LogOut, Bell, User, BarChart2, MessageSquare, Video, BellRing, Menu, X, ChevronDown, Award, Briefcase, Heart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Logo } from "@/components/logo"
import { signOut } from "next-auth/react"
import { useAuthContext } from "@/contexts/auth-context"
import { useIsMobile } from "@/hooks/use-mobile"

// Define user roles and their permissions
const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  MEMBER: "member",
}



const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      { title: "All Members", href: "/dashboard/members" },
      { title: "Add Member", href: "/dashboard/members/add" },
      { title: "Roles & Permissions", href: "/dashboard/members/roles" },
    ],
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Calendar,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
    children: [
      { title: "All Events", href: "/dashboard/events" },
      { title: "Create Event", href: "/dashboard/events/create" },
      { title: "Categories", href: "/dashboard/events/categories" },
    ],
  },
  {
    title: "Blog",
    href: "/dashboard/blog",
    icon: FileText,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      { title: "All Posts", href: "/dashboard/blog" },
      { title: "Create Post", href: "/dashboard/blog/create" },
      { title: "Categories", href: "/dashboard/blog/categories" },
    ],
  },
  {
    title: "Gallery",
    href: "/dashboard/gallery",
    icon: ImageIcon,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      { title: "All Images", href: "/dashboard/gallery" },
      { title: "Upload Images", href: "/dashboard/gallery/upload" },
      { title: "Albums", href: "/dashboard/gallery/albums" },
    ],
  },
  {
    title: "Donations",
    href: "/dashboard/donations",
    icon: DollarSign,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      { title: "All Donations", href: "/dashboard/donations" },
      { title: "Campaigns", href: "/dashboard/donations/campaigns" },
      { title: "Reports", href: "/dashboard/donations/reports" },
    ],
  },
  {
    title: "Programs",
    href: "/dashboard/programs",
    icon: Award,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      { title: "All Programs", href: "/dashboard/programs" },
      { title: "Add Program", href: "/dashboard/programs/add" },
    ],
  },
  {
    title: "Volunteers",
    href: "/dashboard/volunteers",
    icon: Heart,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      { title: "All Volunteers", href: "/dashboard/volunteers" },
      { title: "Add Volunteer", href: "/dashboard/volunteers/add" },
    ],
  },
  {
    title: "Partners",
    href: "/dashboard/partners",
    icon: Briefcase,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
    children: [
      { title: "All Partners", href: "/dashboard/partners" },
      { title: "Add Partner", href: "/dashboard/partners/add" },
    ],
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
  },
  {
    title: "Meetings",
    href: "/dashboard/meetings",
    icon: Video,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
  },
  {
    title: "Announcements",
    href: "/dashboard/announcements",
    icon: Bell,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: BellRing,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
    roles: [ROLES.ADMIN, ROLES.EDITOR],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    roles: [ROLES.ADMIN, ROLES.EDITOR, ROLES.MEMBER],
  },
]
// Mock current user
const currentUser = {
  name: "Jenetrix Otieno",
  email: "admin@NAPOWA.org",
  role: ROLES.ADMIN,
  avatar: "/placeholder.svg?height=32&width=32",
}
export const DashboardSidebar = () => {
    const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({})
    const [loading,setLoading] = React.useState<boolean>(false)
      const {openSidebar,closeSidebar,sidebarOpen} = useAuthContext()
    
    const pathname = usePathname()
    const isMobile = useIsMobile()
    
      // Filter navigation items based on user role
    const filteredNavigation = navigationItems.filter((item) => 
        item.roles.includes(currentUser.role as any));

    const toggleCollapsible = (title: string) => {
        setOpenItems((prev) => ({
        ...prev,
        [title]: !prev[title],
        }));
    
    }
    console.log({sidebarOpen})
    const handleLogout = async () => {
        setLoading(true)
        await signOut({ redirect: true, callbackUrl: "/auth/login" });
        setLoading(false)

    };
    useEffect(()=>{
      if(!isMobile){
        openSidebar()
      }
      else{
        closeSidebar()
      }
    },[isMobile])
  return (
    <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r 
        bg-background transition-transform duration-300 ease-in-out
            lg:top-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
        {/* Sidebar header - desktop only */}
        <div className="hidden h-16 items-center border-b px-4 lg:flex">
        <Logo/>
        </div>

        {/* Sidebar content */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-3 py-4">
            <div className="mb-4 px-4">
            <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>JO</AvatarFallback>
                </Avatar>
                <div>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <Badge variant="outline" className="mt-1">
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                </Badge>
                </div>
            </div>
            </div>

            <div className="space-y-1">
            {filteredNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                if (item?.children) {
                return (
                    <Collapsible
                    key={item.title}
                    open={openItems[item.title] || isActive}
                    onOpenChange={() => toggleCollapsible(item.title)}
                    >
                    <CollapsibleTrigger asChild>
                        <Button 
                        variant={isActive ? "secondary" : "ghost"} 
                        className={`w-full justify-between ${isActive ? ' bg-napowa-blue text-white hover:bg-napowa-blue/80' : ''}`}
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
                        {item.children.map((child) => {
                        const isChildActive = pathname === child.href
                        return (
                            <Button
                            key={child.title}
                            variant={isChildActive ? "secondary" : "ghost"}
                            className={`w-full justify-start ${isChildActive ? 'bg-napowa-blue/20 bg-napowa-blue hover:bg-napowa-blue/30' : ''}`}
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
                    className={`w-full justify-start ${isActive ? 'bg-napowa-blue text-white hover:bg-napowa-blue/80' : ''}`}
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
        </div>

        <div className="mt-auto border-t p-4">
            <Button variant="ghost"
            className="w-full justify-start cursor-pointer bg-napowa-red
            text-white hover:bg-napowa-red/80 hover:text-white"
            loading={loading}
            onClick={handleLogout}
            >
            <div className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
            </div>
            </Button>
        </div>
        </ScrollArea>
    </aside>
  )
}
