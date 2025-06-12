"use client"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useAuthContext } from "@/contexts/auth-context"
import { NavbarRightContent } from "./navbar-right-content"
import { useSession } from "next-auth/react"
import { useUserStore } from "@/store/user.store"
import { Skeleton } from "@/components/ui/skeleton"

const NavbarSkeleton = () => (
  <header className="fixed top-0 z-40 w-full border-b bg-background lg:hidden">
    <div className="flex h-16 items-center justify-between px-4">
      <div className="flex items-center">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="ml-3 flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
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
  </header>
)

export const DashboardNavbar = () => {
  const { status } = useSession()
  const { user: currentUser } = useUserStore()
  const { openSidebar, closeSidebar, sidebarOpen } = useAuthContext()

  // Show loading skeleton while session is loading or user data is not ready
  if (status === "loading" || !currentUser) {
    return <NavbarSkeleton />
  }

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => (sidebarOpen ? closeSidebar() : openSidebar())}>
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="ml-3 flex items-center gap-2">
            <Logo />
          </div>
        </div>

        <NavbarRightContent />
      </div>
    </header>
  )
}
