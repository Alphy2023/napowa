"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  CalendarIcon,
  Heart,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import { useTheme } from "next-themes"


// Import types and hooks
import type { TimeRange } from "@/types/analytics"
import { useAnalytics } from "@/hooks/useAnalytics"
import OverviewAnalytics from "./analytics/overview-analytics"
import MembersAnalytics from "./analytics/members-analytics"
import { MetricCardSkeleton } from "./analytics/metric-card-skeleton"
import DonationsAnalytics from "./analytics/donations-analytics"
import EventsAnalytics from "./analytics/events-analytics"
import ProgramsAnalytics from "./analytics/programs-analytics"
import { ExportReport } from "./export-report"
import ScrollableTablist from "../scrollable-tablist"
import { analyticsPageTabs } from "@/utils/tabs"



export const AnalyticsContent = () => {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState<TimeRange>("all_time")

  const { data, loading, error, refetch } = useAnalytics(timeRange)
  const isDark = theme === "dark"

  // Text colors based on theme
  const textColor = isDark ? "#fff" : "#000"
  const gridColor = isDark ? "#444" : "#ddd"


 

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load analytics data: {error}
            <Button variant="outline" size="sm" className="ml-2" onClick={refetch}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center gap-2 ml-auto">
          <Select value={timeRange} onValueChange={(value: TimeRange) => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_quarter">This Quarter</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={refetch} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          {/* export btn */}
          <ExportReport
          timeRange={timeRange}
          />
      
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
          : data
            ? data.overview.keyMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                        <h3 className="mt-1 text-3xl font-bold">{metric.value}</h3>
                        <p
                          className={`mt-1 flex items-center text-xs ${
                            metric.trend === "up"
                              ? "text-green-500"
                              : metric.trend === "down"
                                ? "text-red-500"
                                : "text-gray-500"
                          }`}
                        >
                          {metric.trend === "up" ? (
                            <TrendingUp className="mr-1 h-3 w-3" />
                          ) : metric.trend === "down" ? (
                            <TrendingDown className="mr-1 h-3 w-3" />
                          ) : null}
                          <span>{metric.change}</span>
                        </p>
                      </div>
                      <div className="rounded-full bg-primary/10 p-3">
                        {index === 0 && <Users className="h-6 w-6 text-primary" />}
                        {index === 1 && <DollarSign className="h-6 w-6 text-primary" />}
                        {index === 2 && <CalendarIcon className="h-6 w-6 text-primary" />}
                        {index === 3 && <Heart className="h-6 w-6 text-primary" />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            : null}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
         <ScrollableTablist
            items={analyticsPageTabs}
            noCenter={true}
            />
        {/* <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList> */}

        <TabsContent value="overview" className="mt-4 space-y-4">
            <OverviewAnalytics
            isDark={isDark}
            data={data?.overview}
            loading={loading}
            gridColor={gridColor}
            textColor={textColor}
            />
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="mt-4 space-y-4">
         <MembersAnalytics
           isDark={isDark}
            data={data?.members}
            loading={loading}
            gridColor={gridColor}
            textColor={textColor}
         
         />
        </TabsContent>

        {/* Donations Tab */}
        <TabsContent value="donations" className="mt-4 space-y-4">
        <DonationsAnalytics
          isDark={isDark}
          data={data?.donations}
          loading={loading}
          gridColor={gridColor}
          textColor={textColor}
         
         />
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-4 space-y-4">
        <EventsAnalytics
          isDark={isDark}
          data={data?.events}
          loading={loading}
          gridColor={gridColor}
          textColor={textColor}
         
         />
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="mt-4 space-y-4">
         <ProgramsAnalytics
          isDark={isDark}
          data={data?.programs}
          loading={loading}
          gridColor={gridColor}
          textColor={textColor}
         
         />
        </TabsContent>
      </Tabs>

      {/* Last updated info */}
      {data && (
        <div className="text-center text-sm text-muted-foreground">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  )
}
