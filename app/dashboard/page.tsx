"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, Calendar, DollarSign, TrendingUp, ArrowUpRight, ChevronRight } from "lucide-react"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartArea,
  ChartLine,
  ChartBar,
} from "@/components/ui/chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for charts
  const donationData = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 18000 },
    { month: "Mar", amount: 15000 },
    { month: "Apr", amount: 22000 },
    { month: "May", amount: 28000 },
    { month: "Jun", amount: 25000 },
    { month: "Jul", amount: 32000 },
  ]

  const membershipData = [
    { month: "Jan", members: 120 },
    { month: "Feb", members: 150 },
    { month: "Mar", members: 180 },
    { month: "Apr", members: 210 },
    { month: "May", members: 250 },
    { month: "Jun", members: 280 },
    { month: "Jul", members: 310 },
  ]

  const recentDonations = [
    { id: 1, name: "Jane Doe", amount: 5000, date: "2023-05-15", method: "M-Pesa" },
    { id: 2, name: "John Smith", amount: 10000, date: "2023-05-14", method: "Bank Transfer" },
    { id: 3, name: "Mary Johnson", amount: 2500, date: "2023-05-13", method: "M-Pesa" },
    { id: 4, name: "Robert Brown", amount: 7500, date: "2023-05-12", method: "Card Payment" },
    { id: 5, name: "Sarah Williams", amount: 3000, date: "2023-05-11", method: "M-Pesa" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Woman of Purpose Annual Event", date: "2023-06-15", location: "Nairobi" },
    { id: 2, title: "Skills Training Workshop", date: "2023-06-22", location: "Mombasa" },
    { id: 3, title: "Health Advocacy Program", date: "2023-07-05", location: "Kisumu" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">310</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  +12% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES 152,000</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  +28% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next event in 5 days</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                <span className="flex items-center text-green-500">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  +1 from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="col-span-2 md:col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Donation Overview</CardTitle>
              <CardDescription>Monthly donation trends for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Chart
                  data={donationData}
                  dataKey="month"
                  categories={["amount"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `KES ${value.toLocaleString()}`}
                  showLegend={false}
                >
                  <ChartContainer>
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <ChartGrid />
                    <ChartXAxis />
                    <ChartYAxis />
                    <ChartBar className="fill-primary" />
                  </ChartContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="col-span-2 md:col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Membership Growth</CardTitle>
              <CardDescription>Monthly membership trends for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Chart
                  data={membershipData}
                  dataKey="month"
                  categories={["members"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `${value} members`}
                  showLegend={false}
                >
                  <ChartContainer>
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <ChartGrid />
                    <ChartXAxis />
                    <ChartYAxis />
                    <ChartLine className="stroke-primary" />
                    <ChartArea className="fill-primary/20" />
                  </ChartContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest donations received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{donation.name}</p>
                        <p className="text-xs text-muted-foreground">{donation.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">KES {donation.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(donation.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/donations">
                    View All Donations
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Events scheduled in the near future</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                        days left
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/events">
                    View All Events
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
