
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Import chart components
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  Heart,
  MapPin,
  Award,
} from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"
import { AnalyticsProps } from "@/types/analytics"



const ProgramsAnalytics = ({loading,textColor,gridColor,
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
                        <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                        <h3 className="mt-1 text-2xl font-bold">{data.summary.activePrograms}</h3>
                        <p
                            className={`mt-1 text-xs ${data.summary.programGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                            {data.summary.programGrowth >= 0 ? "+" : ""}
                            {data.summary.programGrowth}% vs last period
                        </p>
                        </div>
                        <Award className="h-8 w-8 text-blue-500" />
                    </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Volunteers</p>
                        <h3 className="mt-1 text-2xl font-bold">{data.summary.totalVolunteers}</h3>
                        <p
                            className={`mt-1 text-xs ${data.summary.volunteerGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                            {data.summary.volunteerGrowth >= 0 ? "+" : ""}
                            {data.summary.volunteerGrowth}% vs last period
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
                        <p className="text-sm font-medium text-muted-foreground">Volunteer Hours</p>
                        <h3 className="mt-1 text-2xl font-bold">{data.summary.volunteerHours}</h3>
                        <p
                            className={`mt-1 text-xs ${data.summary.hoursGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                            {data.summary.hoursGrowth >= 0 ? "+" : ""}
                            {data.summary.hoursGrowth}% vs last period
                        </p>
                        </div>
                        <Heart className="h-8 w-8 text-red-500" />
                    </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                        <p className="text-sm font-medium text-muted-foreground">Active Partners</p>
                        <h3 className="mt-1 text-2xl font-bold">{data.summary.activePartners}</h3>
                        <p
                            className={`mt-1 text-xs ${data.summary.partnerGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                            {data.summary.partnerGrowth >= 0 ? "+" : ""}
                            {data.summary.partnerGrowth}% vs last period
                        </p>
                        </div>
                        <MapPin className="h-8 w-8 text-yellow-500" />
                    </div>
                    </CardContent>
                </Card>
                </>
            ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>Monthly Volunteer Hours</CardTitle>
            <CardDescription>Volunteer engagement throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                    data={data.volunteerHours}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                    <defs>
                        <linearGradient id="volunteerHours" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B2323" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8B2323" stopOpacity={0} />
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
                        dataKey="hours"
                        stroke="#8B2323"
                        fillOpacity={1}
                        fill="url(#volunteerHours)"
                    />
                    </AreaChart>
                </ResponsiveContainer>
                </div>
            ) : null}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Partner Types</CardTitle>
            <CardDescription>Distribution of partnership categories</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data.partnerTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.partnerTypes.map((entry, index) => (
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
            <CardTitle>Program Participation</CardTitle>
            <CardDescription>Distribution of participation across different programs</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
            <ChartSkeleton />
            ) : data ? (
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.participation} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                    <Bar dataKey="value" fill="#FF8C00" />
                </BarChart>
                </ResponsiveContainer>
            </div>
            ) : null}
        </CardContent>
        </Card>
    </>
  )
}

export default ProgramsAnalytics