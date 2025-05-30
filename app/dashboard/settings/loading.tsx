"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function SettingsPageLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-80 mt-2" />
      </div>

      <Tabs value="landing-page" className="w-full">
        {/* Tabs header skeleton */}
        <div className="flex space-x-4 overflow-x-auto border-b pb-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-32 rounded-md" />
          ))}
        </div>

        {/* Landing Page Settings Skeleton */}
        <TabsContent value="landing-page" className="mt-6 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-36 w-full rounded-md" />
        </TabsContent>

        {/* Contact Us Page Settings Skeleton */}
        <TabsContent value="contact-us-page" className="mt-6 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-36 w-full rounded-md" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
