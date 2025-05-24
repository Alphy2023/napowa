"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, Users, DollarSign, CalendarIcon, Heart } from "lucide-react"
import { useTheme } from "next-themes"

// Import chart components
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for charts
const memberGrowthData = [
  { month: "Jan", members: 120 },
  { month: "Feb", members: 145 },
  { month: "Mar", members: 162 },
  { month: "Apr", members: 180 },
  { month: "May", members: 205 },
  { month: "Jun", members: 230 },
  { month: "Jul", members: 245 },
  { month: "Aug", members: 270 },
  { month: "Sep", members: 290 },
  { month: "Oct", members: 310 },
  { month: "Nov", members: 325 },
  { month: "Dec", members: 350 },
]

const donationData = [
  { month: "Jan", amount: 250000 },
  { month: "Feb", amount: 320000 },
  { month: "Mar", amount: 280000 },
  { month: "Apr", amount: 360000 },
  { month: "May", amount: 420000 },
  { month: "Jun", amount: 390000 },
  { month: "Jul", amount: 450000 },
  { month: "Aug", amount: 520000 },
  { month: "Sep", amount: 480000 },
  { month: "Oct", amount: 550000 },
  { month: "Nov", amount: 620000 },
  { month: "Dec", amount: 700000 },
]

const eventAttendanceData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 110 },
  { month: "Mar", attendance: 95 },
  { month: "Apr", attendance: 130 },
  { month: "May", attendance: 145 },
  { month: "Jun", attendance: 160 },
  { month: "Jul", attendance: 175 },
  { month: "Aug", attendance: 190 },
  { month: "Sep", attendance: 205 },
  { month: "Oct", attendance: 220 },
  { month: "Nov", attendance: 235 },
  { month: "Dec", attendance: 250 },
]

const memberTypeData = [
  { name: "Regular Members", value: 350 },
  { name: "Volunteers", value: 120 },
  { name: "Widows", value: 85 },
  { name: "Committee Members", value: 45 },
]

const donationSourceData = [
  { name: "Individual Donations", value: 45 },
  { name: "Corporate Sponsors", value: 25 },
  { name: "Grants", value: 15 },
  { name: "Fundraising Events", value: 15 },
]

const programParticipationData = [
  { name: "Education Support", value: 35 },
  { name: "Health Initiatives", value: 25 },
  { name: "Skills Development", value: 20 },
  { name: "Widows Support", value: 15 },
  { name: "Other Programs", value: 5 },
]

const COLORS = ["#5ECCE9", "#0A3161", "#FFD700", "#8B2323", "#FF8C00"]

export default function AnalyticsPage() {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState("year")
  const isDark = theme === "dark"

  // Text colors based on theme
  const textColor = isDark ? "#fff" : "#000"
  const gridColor = isDark ? "#444" : "#ddd"

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">View key metrics and performance indicators for NAPOWA.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <h3 className="mt-1 text-3xl font-bold">350</h3>
                <p className="mt-1 flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+12% from last month</span>
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                <h3 className="mt-1 text-3xl font-bold">KES 4.5M</h3>
                <p className="mt-1 flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+8% from last month</span>
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events Held</p>
                <h3 className="mt-1 text-3xl font-bold">24</h3>
                <p className="mt-1 flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+15% from last month</span>
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Volunteer Hours</p>
                <h3 className="mt-1 text-3xl font-bold">1,250</h3>
                <p className="mt-1 flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+5% from last month</span>
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>Monthly member growth over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={memberGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="memberGrowth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5ECCE9" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#5ECCE9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke={textColor} />
                      <YAxis stroke={textColor} />
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#333" : "#fff",
                          borderColor: isDark ? "#444" : "#ddd",
                          color: textColor,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="members"
                        stroke="#5ECCE9"
                        fillOpacity={1}
                        fill="url(#memberGrowth)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Monthly donation amounts over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={donationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="month" stroke={textColor} />
                      <YAxis stroke={textColor} />
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#333" : "#fff",
                          borderColor: isDark ? "#444" : "#ddd",
                          color: textColor,
                        }}
                        formatter={(value) => [`KES ${value.toLocaleString()}`, "Amount"]}
                      />
                      <Bar dataKey="amount" fill="#0A3161" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Member Types</CardTitle>
                <CardDescription>Distribution of member types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={memberTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {memberTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#333" : "#fff",
                          borderColor: isDark ? "#444" : "#ddd",
                          color: textColor,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Sources</CardTitle>
                <CardDescription>Distribution of donation sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donationSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {donationSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#333" : "#fff",
                          borderColor: isDark ? "#444" : "#ddd",
                          color: textColor,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Program Participation</CardTitle>
                <CardDescription>Distribution of program participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={programParticipationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {programParticipationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#333" : "#fff",
                          borderColor: isDark ? "#444" : "#ddd",
                          color: textColor,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Attendance</CardTitle>
              <CardDescription>Monthly event attendance over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={eventAttendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" stroke={textColor} />
                    <YAxis stroke={textColor} />
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#333" : "#fff",
                        borderColor: isDark ? "#444" : "#ddd",
                        color: textColor,
                      }}
                    />
                    <Line type="monotone" dataKey="attendance" stroke="#FFD700" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs would have similar content structure */}
      </Tabs>
    </div>
  )
}
