
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Import chart components
import {
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

import { ChartSkeleton } from "./chart-skeleton"
import { COLORS } from "@/constants/mock-data"
import {
  Users,
  CalendarIcon,
  UserCheck,
  Award,
} from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"
import { AnalyticsProps } from "@/types/analytics"



const EventsAnalytics = ({loading,textColor,gridColor,
data,isDark
}:AnalyticsProps) => {
  return (
    <>
        <div className="grid gap-4 md:grid-cols-4">
            {loading ? (
                Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
            ) : data ? (
                <>
                <Card>
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                        <h3 className="mt-1 text-2xl font-bold">{data.summary.totalEvents}</h3>
                        <p
                            className={`mt-1 text-xs ${data.summary.eventGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                            {data.summary.eventGrowth >= 0 ? "+" : ""}
                            {data.summary.eventGrowth}% vs last period
                        </p>
                        </div>
                        <CalendarIcon className="h-8 w-8 text-blue-500" />
                    </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Attendance</p>
                        <h3 className="mt-1 text-2xl font-bold">{data.summary.totalAttendance}</h3>
                        <p
                            className={`mt-1 text-xs ${data.summary.attendanceGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                            {data.summary.attendanceGrowth >= 0 ? "+" : ""}
                            {data.summary.attendanceGrowth}% vs last period
                        </p>
                        </div>
                        <Users className="h-8 w-8 text-green-500" />
                    </div>
                    </CardContent>
                </Card>

                <Card>
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                    <h3 className="mt-1 text-2xl font-bold">{data.summary.avgAttendance}</h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.avgAttendanceGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.avgAttendanceGrowth >= 0 ? "+" : ""}
                        {data.summary.avgAttendanceGrowth}% vs last period
                    </p>
                    </div>
                    <UserCheck className="h-8 w-8 text-yellow-500" />
                </div>
                </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                        <h3 className="mt-1 text-2xl font-bold">{data.summary.attendanceRate}%</h3>
                        <p
                            className={`mt-1 text-xs ${data.summary.attendanceRateGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                            {data.summary.attendanceRateGrowth >= 0 ? "+" : ""}
                            {data.summary.attendanceRateGrowth}% vs last period
                        </p>
                        </div>
                        <Award className="h-8 w-8 text-purple-500" />
                    </div>
                    </CardContent>
                </Card>
            </>
        ) : null}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>Registration vs Attendance</CardTitle>
            <CardDescription>Monthly comparison of registrations and actual attendance</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={data.registrationVsAttendance}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
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
                    <Bar dataKey="registered" fill="#5ECCE9" name="Registered" />
                    <Bar dataKey="attended" fill="#0A3161" name="Attended" />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            ) : null}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Event Types</CardTitle>
            <CardDescription>Distribution of event categories</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data.eventTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.eventTypes.map((entry, index) => (
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
            ) : null}
            </CardContent>
        </Card>
        </div>
   
        <Card>
        <CardHeader>
            <CardTitle>Monthly Event Attendance Trend</CardTitle>
            <CardDescription>Event attendance patterns throughout the year</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
            <ChartSkeleton />
            ) : data ? (
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.attendanceTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                    <Line type="monotone" dataKey="attendance" stroke="#FFD700" strokeWidth={3} />
                </LineChart>
                </ResponsiveContainer>
            </div>
            ) : null}
        </CardContent>
        </Card>
    </>
  )
}

export default EventsAnalytics