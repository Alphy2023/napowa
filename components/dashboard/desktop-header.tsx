"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useAuthContext } from "@/contexts/auth-context"
import { NavbarRightContent } from "./navbar-right-content"
import { useSession } from "next-auth/react"
import { useUserStore } from "@/store/user.store"
import { Skeleton } from "@/components/ui/skeleton"


const NavbarSkeleton = () => (
  <div className="mb-6 hidden items-center justify-between rounded-lg bg-background p-4 shadow-sm lg:flex">
    <div className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center">
        <Skeleton className="h-10 w-10 rounded-md" />
        
      </div>
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
    </div>
  </div>
)


export const DesktopHeader = () => {
    const pathname = usePathname()
  const { status } = useSession()
  const { user: currentUser } = useUserStore()
    
  // Show loading skeleton while session is loading or user data is not ready
  if (status === "loading" || !currentUser) {
    return <NavbarSkeleton />
  }

  return (
    <div className="mb-6 hidden items-center justify-between rounded-lg bg-background p-4 shadow-sm lg:flex">
      <h1 className="text-2xl font-bold">
      {pathname === "/dashboard"
          ? "Dashboard"
          : pathname?.split("/").pop()?.charAt(0).toUpperCase() + pathname.split("/").pop()?.slice(1)}
      </h1>

      <NavbarRightContent/>
  </div>
  )
}
