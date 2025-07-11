"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Settings, LogOut, Bell, User, Moon, Sun } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { useUserStore } from "@/store/user.store"
import { getFullname } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const NavbarRightSkeleton = () => (
  <div className="flex items-center space-x-4">
    <Skeleton className="h-10 w-10 rounded-md" />
    <Skeleton className="h-10 w-10 rounded-md" />
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="hidden lg:block">
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  </div>
)

export const NavbarRightContent = () => {
  const { theme, setTheme } = useTheme()
  const { status } = useSession()
  const { user: currentUser } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    setLoading(true)
    try {
      await signOut({ redirect: true, callbackUrl: "/auth/login" })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Show loading skeleton while session is loading, user data is not ready, or not mounted
  if (!mounted || status === "loading" || !currentUser) {
    return <NavbarRightSkeleton />
  }

  return (
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
              <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {currentUser?.profile?.firstName?.[0] || currentUser?.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left lg:block">
              <p className="text-sm font-medium">
                {getFullname(currentUser?.profile?.firstName, currentUser?.profile?.lastName) || "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">{currentUser?.email || "user@example.com"}</p>
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
          <DropdownMenuItem onClick={handleLogout} disabled={loading} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{loading ? "Logging out..." : "Logout"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
