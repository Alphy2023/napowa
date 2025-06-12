
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Import chart components
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { ChartSkeleton } from "./chart-skeleton"
import { COLORS } from "@/constants/mock-data"
import { Award, CalendarIcon, UserCheck, Users } from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"
import { AnalyticsProps } from "@/types/analytics"



const MembersAnalytics = ({loading,textColor,gridColor,
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
                    <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                    <h3 className="mt-1 text-2xl font-bold">{data.summary.activeMembers}</h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.activeGrowthPercent >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.activeGrowthPercent >= 0 ? "+" : ""}
                        {data.summary.activeGrowthPercent}% vs last period
                    </p>
                    </div>
                    <UserCheck className="h-8 w-8 text-green-500" />
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                    <h3 className="mt-1 text-2xl font-bold">{data.summary.newThisMonth}</h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.memberGrowthPercent >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.memberGrowthPercent >= 0 ? "+" : ""}
                        {data.summary.memberGrowthPercent}% vs last period
                    </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                    <h3 className="mt-1 text-2xl font-bold">{data.summary.retentionRate}%</h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.retentionGrowthPercent >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.retentionGrowthPercent >= 0 ? "+" : ""}
                        {data.summary.retentionGrowthPercent}% vs last period
                    </p>
                    </div>
                    <Award className="h-8 w-8 text-yellow-500" />
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Tenure</p>
                    <h3 className="mt-1 text-2xl font-bold">{data.summary.avgTenure} yrs</h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.tenureGrowthPercent >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.tenureGrowthPercent >= 0 ? "+" : ""}
                        {data.summary.tenureGrowthPercent}% vs last period
                    </p>
                    </div>
                    <CalendarIcon className="h-8 w-8 text-purple-500" />
                </div>
                </CardContent>
            </Card>
            </>
        ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>Member Registration Trends</CardTitle>
            <CardDescription>New member registrations vs total members</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.joinTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="newMembers" x1="0" y1="0" x2="0" y2="1">
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
                        dataKey="new"
                        stroke="#5ECCE9"
                        fillOpacity={1}
                        fill="url(#newMembers)"
                        name="New Members"
                    />
                    <Line type="monotone" dataKey="total" stroke="#0A3161" strokeWidth={2} name="Total Members" />
                    </AreaChart>
                </ResponsiveContainer>
                </div>
            ) : null}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Member Status Distribution</CardTitle>
            <CardDescription>Current status of all members</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data.statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.statusDistribution.map((entry, index) => (
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

        <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Members by county</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={data.countyDistribution}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                    <XAxis dataKey="name" stroke={textColor} />
                    <YAxis stroke={textColor} />
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: isDark ? "#333" : "#fff",
                        borderColor: isDark ? "#444" : "#ddd",
                        color: textColor,
                        }}
                    />
                    <Bar dataKey="value" fill="#5ECCE9" />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            ) : null}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Member Types</CardTitle>
            <CardDescription>Distribution by member category</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data.typeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.typeDistribution.map((entry, index) => (
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
    </>
  )
}

export default MembersAnalytics