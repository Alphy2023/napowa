"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar"
import { DesktopHeader } from "@/components/dashboard/desktop-header"
import { getCurrentUser } from "@/lib/session"
import { getSession } from "next-auth/react"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
 
  useEffect(() => {
    setMounted(true)
  }, [])


  if (!mounted) {
    return null
  }

  return (
    <>
      <div className="flex min-h-screen flex-col bg-background">
        
        <div className="napowa-stripes-top"></div>
        {/* Mobile header - Fixed */}
        <DashboardNavbar/>
        

        <div className="flex flex-1 pt-16 lg:pt-0">
        <DashboardSidebar/>

          {/* Main content - Scrollable */}
          <main className="flex-1 overflow-auto bg-muted/30 p-4 lg:ml-64 lg:p-8">
            {/* Desktop header - Fixed */}
           <DesktopHeader/>

            {/* Page content */}
            <div className="rounded-lg bg-background p-4 shadow-sm lg:p-6">{children}</div>
          </main>
        </div>
        <div className="napowa-stripes-bottom"></div>

      </div>
    </>
  )
}
