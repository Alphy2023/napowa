"use client"

import React from "react"

import AdminDashboard from "@/components/dashboard/admin.dashboard"
import { useUserStore } from "@/store/user.store"
import MemberDashboard from "@/components/dashboard/member.dashboard";

export default function DashboardPage() {
    const {user} = useUserStore();
    const [content,setContent] = React.useState<React.ReactNode>(null)

    const renderContent = React.useCallback(()=>{
      switch(user?.role?.toLowerCase()){
        case 'admin':
        case 'administrator':
        case 'editor':
          setContent(<AdminDashboard/>)
          break;
        case 'member':
          setContent(<MemberDashboard/>)
          break;
        default:
          setContent(null)
      }
    },[user?.role])

    React.useEffect(()=>{
      renderContent()
    },[renderContent])

  return (
    <div className="space-y-8">
      {content}
    </div>
  )
}
