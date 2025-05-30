"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { AccountSettings } from "@/components/dashboard/profile/account-settings"
import { SecuritySettings } from "@/components/dashboard/profile/security-settings"
import { ProfileSettings } from "@/components/dashboard/profile/profile-settings"
import { NotificationSettings } from "@/components/dashboard/settings/notification-settings"
import { PrivacySettings } from "@/components/dashboard/profile/privacy-settings"
import ScrollableTablist from "@/components/scrollable-tablist"
import { profilePageTabs } from "@/utils/tabs"


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
 const settingTabs: TabItem[] = [
   
    {
      title:"Landing page",
      id:"landing-page"
    },
    {
      title:"Contact us page",
      id:"contact-us-page"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
        <p className="text-muted-foreground">Manage your account information and preferences.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
       
         <ScrollableTablist
          items={profilePageTabs}
          noCenter={true}
          />

        <TabsContent value="profile" className="mt-6">
         <ProfileSettings/>
        </TabsContent>
         <TabsContent value="account" className="mt-6 space-y-6">
          <AccountSettings/>
          </TabsContent>

        <TabsContent value="notification" className="mt-6">
          <NotificationSettings/>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecuritySettings/>
        </TabsContent>
        <TabsContent value="privacy" className="mt-6">
          <PrivacySettings/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
