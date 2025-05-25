"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Settings, LogOut, Bell, User, Menu, X} from 'lucide-react'

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



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const {openSidebar,closeSidebar,sidebarOpen} = useAuthContext()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  


  useEffect(() => {
    setMounted(true)
  }, [])


  if (!mounted) {
    return null
  }

  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        {/* <div className="flex h-2">
          <div className="w-1/3 bg-napowa-blue"></div>
          <div className="w-1/3 bg-napowa-yellow"></div>
          <div className="w-1/3 bg-napowa-red"></div>
        </div> */}
        <div className="napowa-stripes-top"></div>


        {/* Mobile header - Fixed */}
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
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                      <AvatarFallback>JO</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                      <Badge variant="outline" className="mt-1 w-fit">
                        {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
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
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1 pt-16 lg:pt-0">
        <DashboardSidebar/>

          {/* Main content - Scrollable */}
          <main className="flex-1 overflow-auto bg-muted/30 p-4 lg:ml-64 lg:p-8">
            {/* Desktop header - Fixed */}
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
                    <DropdownMenuItem asChild>
                      <Link href="/login">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Page content */}
            <div className="rounded-lg bg-background p-4 shadow-sm lg:p-6">{children}</div>
          </main>
        </div>
        <div className="napowa-stripes-bottom"></div>

      </div>
    </>
  )
}

function Sun({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

function Moon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}
