"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Settings, LogOut, Bell, User, Moon,Sun} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { useAuthContext } from "@/contexts/auth-context"
import { signOut } from "next-auth/react"

// Define user roles and their permissions
const ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  MEMBER: "member",
}

// Mock current user
const currentUser = {
  name: "Jenetrix Otieno",
  email: "admin@NAPOWA.org",
  role: ROLES.ADMIN,
  avatar: "/placeholder.svg?height=32&width=32",
}

export const DesktopHeader = () => {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const {openSidebar,closeSidebar,sidebarOpen} = useAuthContext()
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/auth/login" });

    };

    return (
     <div className="mb-6 hidden items-center justify-between rounded-lg bg-background p-4 shadow-sm lg:flex">
        <h1 className="text-2xl font-bold">
        {pathname === "/dashboard"
            ? "Dashboard"
            : pathname?.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
        </h1>

        <div className="flex items-center space-x-4">
        <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-napowa-red text-[10px] text-white">
                3
                </span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between border-b px-4 py-2">
                <span className="font-semibold">Notifications</span>
                <Button variant="ghost" size="sm">
                Mark all as read
                </Button>
            </div>
            <div className="max-h-96 overflow-auto">
                {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="flex cursor-pointer flex-col items-start p-4">
                    <div className="flex w-full items-start gap-4">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm">New donation received from Jane Doe</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    </div>
                </DropdownMenuItem>
                ))}
            </div>
            <div className="border-t p-2">
                <Button variant="ghost" size="sm" className="w-full justify-center">
                View all notifications
                </Button>
            </div>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2">
                <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>JO</AvatarFallback>
                </Avatar>
                <div className="hidden text-left lg:block">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild
             onClick={()=>handleLogout()}
            >
                <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
                </Link>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
    </div>
  )
}
