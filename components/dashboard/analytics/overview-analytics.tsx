
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
import { AnalyticsProps } from "@/types/analytics"



const OverviewAnalytics = ({loading,textColor,gridColor,
data,isDark
}:AnalyticsProps) => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
            <CardTitle>Member Growth</CardTitle>
            <CardDescription>Monthly member growth over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.memberGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            ) : null}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
            <CardDescription>Monthly donation amounts over the selected period</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.donationTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="month" stroke={textColor} />
                    <YAxis stroke={textColor} />
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: isDark ? "#333" : "#fff",
                        borderColor: isDark ? "#444" : "#ddd",
                        color: textColor,
                        }}
                        formatter={(value) => [`KES ${Number(value).toLocaleString()}`, "Amount"]}
                    />
                    <Bar dataKey="amount" fill="#0A3161" />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            ) : null}
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
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data.memberTypes}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.memberTypes.map((entry, index) => (
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

        <Card>
            <CardHeader>
            <CardTitle>Donation Sources</CardTitle>
            <CardDescription>Distribution of donation sources</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data.donationSources}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.donationSources.map((entry, index) => (
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

        <Card>
            <CardHeader>
            <CardTitle>Program Participation</CardTitle>
            <CardDescription>Distribution of program participation</CardDescription>
            </CardHeader>
            <CardContent>
            {loading ? (
                <ChartSkeleton />
            ) : data ? (
                <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data.programParticipation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {data.programParticipation.map((entry, index) => (
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
            <CardTitle>Event Attendance</CardTitle>
            <CardDescription>Monthly event attendance over the selected period</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
            <ChartSkeleton />
            ) : data ? (
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.eventAttendance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            ) : null}
        </CardContent>
        </Card>
    </>
  )
}

export default OverviewAnalytics