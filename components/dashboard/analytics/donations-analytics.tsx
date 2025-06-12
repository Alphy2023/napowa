
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
import {
  Users,
  DollarSign,
  Heart,
  CreditCard,
} from "lucide-react"
import { MetricCardSkeleton } from "./metric-card-skeleton"
import { AnalyticsProps } from "@/types/analytics"



const DonationsAnalytics = ({loading,textColor,gridColor,
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
                    <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                    <h3 className="mt-1 text-2xl font-bold">
                        KES {(data.summary.totalRaised / 1000000).toFixed(1)}M
                    </h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.totalRaisedGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.totalRaisedGrowth >= 0 ? "+" : ""}
                        {data.summary.totalRaisedGrowth}% vs last period
                    </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-500" />
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Donors</p>
                    <h3 className="mt-1 text-2xl font-bold">{data.summary.totalDonors}</h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.donorGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.donorGrowth >= 0 ? "+" : ""}
                        {data.summary.donorGrowth}% vs last period
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
                    <p className="text-sm font-medium text-muted-foreground">Avg. Donation</p>
                    <h3 className="mt-1 text-2xl font-bold">
                        KES {data.summary.avgDonation.toLocaleString()}
                    </h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.avgDonationGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.avgDonationGrowth >= 0 ? "+" : ""}
                        {data.summary.avgDonationGrowth}% vs last period
                    </p>
                    </div>
                    <CreditCard className="h-8 w-8 text-yellow-500" />
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">Recurring Donors</p>
                    <h3 className="mt-1 text-2xl font-bold">{data.summary.recurringDonors}</h3>
                    <p
                        className={`mt-1 text-xs ${data.summary.recurringGrowth >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                        {data.summary.recurringGrowth >= 0 ? "+" : ""}
                        {data.summary.recurringGrowth}% vs last period
                    </p>
                    </div>
                    <Heart className="h-8 w-8 text-red-500" />
                </div>
                </CardContent>
            </Card>
            </>
        ) : null}
    </div>
   
    <div className="grid gap-4 md:grid-cols-2">
    <Card>
        <CardHeader>
        <CardTitle>Monthly Donation Trends</CardTitle>
        <CardDescription>Donation amounts and donor count over time</CardDescription>
        </CardHeader>
        <CardContent>
        {loading ? (
            <ChartSkeleton />
        ) : data ? (
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                data={data.monthlyTrends}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                <defs>
                    <linearGradient id="donationAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A3161" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0A3161" stopOpacity={0} />
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
                    formatter={(value, name) => [
                    name === "amount" ? `KES ${Number(value).toLocaleString()}` : value,
                    name === "amount" ? "Amount" : "Donors",
                    ]}
                />
                <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#0A3161"
                    fillOpacity={1}
                    fill="url(#donationAmount)"
                    name="amount"
                />
                <Line type="monotone" dataKey="donors" stroke="#5ECCE9" strokeWidth={2} name="donors" />
                </AreaChart>
            </ResponsiveContainer>
            </div>
        ) : null}
        </CardContent>
    </Card>

    <Card>
        <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Distribution of payment methods used</CardDescription>
        </CardHeader>
        <CardContent>
        {loading ? (
            <ChartSkeleton />
        ) : data ? (
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={data.paymentMethods}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.paymentMethods.map((entry, index) => (
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
        <CardTitle>Donation Amount Ranges</CardTitle>
        <CardDescription>Distribution of donation amounts</CardDescription>
        </CardHeader>
        <CardContent>
        {loading ? (
            <ChartSkeleton />
        ) : data ? (
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.amountRanges} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                <Bar dataKey="value" fill="#FFD700" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        ) : null}
        </CardContent>
    </Card>

    <Card>
        <CardHeader>
        <CardTitle>Donation Sources</CardTitle>
        <CardDescription>Where donations are coming from</CardDescription>
        </CardHeader>
        <CardContent>
        {loading ? (
            <ChartSkeleton />
        ) : data ? (
            <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={data.sources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.sources.map((entry, index) => (
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

export default DonationsAnalytics