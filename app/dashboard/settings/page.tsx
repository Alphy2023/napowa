"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent} from "@/components/ui/tabs"

import { useToast } from "@/hooks/use-toast"
import ScrollableTablist from "@/components/scrollable-tablist"
import { LandingPageSettings } from "@/components/dashboard/settings/landing-page-settings"
import { ContactUsPageSettings } from "@/components/dashboard/settings/contact-us-page-settings"
import { settingsPageTabs } from "@/utils/tabs"



export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("landing-page")



  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Manage system settings and preferences.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollableTablist
          items={settingsPageTabs}
          noCenter={true}
          />
        {/* landing page settings */}
        <TabsContent value="landing-page" className="mt-6 space-y-6">
         <LandingPageSettings/>
        </TabsContent>
        {/* contact us page*/}
        <TabsContent value="contact-us-page" className="mt-6 space-y-6">
         <ContactUsPageSettings/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
