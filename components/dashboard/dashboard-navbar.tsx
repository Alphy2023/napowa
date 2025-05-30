"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Settings, LogOut, Bell, User, Menu, X,Moon,Sun} from 'lucide-react'
import { useSession } from 'next-auth/react'
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
import { useAuthContext } from "@/contexts/auth-context"
import { signOut } from "next-auth/react"
import { useUserStore } from "@/store/user.store"


export const DashboardNavbar = () => {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const {openSidebar,closeSidebar,sidebarOpen} = useAuthContext()
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
    // const { data: session, status } = useSession()
    // const currentUser = session?.user;
    const {user:currentUser} = useUserStore()
    
    const handleLogout = async () => {
         await signOut({ redirect: true, callbackUrl: "/auth/login" });
    
    };
      
  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
            <Button variant="ghost" size="icon"
            onClick={() => sidebarOpen ? closeSidebar() : openSidebar()}>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <div className="ml-3 flex items-center gap-2">
            <Logo/>
            </div>
        </div>

        <div className="flex items-center gap-2">
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
                <Button variant="ghost" size="icon" className="relative">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>JO</AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{currentUser?.profile?.firstName +" " +
                        currentUser?.profile?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                    <Badge variant="outline" className="mt-1 w-fit">
                    {currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}
                    </Badge>
                </div>
                </div>
                <DropdownMenuSeparator />
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
                <div className="flex items-center gap-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </div>
    </header>
  )
}

