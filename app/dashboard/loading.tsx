"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <Skeleton className="h-8 w-40" />
        <Tabs value="overview" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview" disabled>
              <Skeleton className="h-6 w-20" />
            </TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              <Skeleton className="h-6 w-20" />
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              <Skeleton className="h-6 w-20" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24 mb-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="h-full">
            <CardHeader>
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-20 ml-auto" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-36" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
