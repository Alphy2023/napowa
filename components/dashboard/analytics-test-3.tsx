"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Download,
  TrendingUp,
  Users,
  DollarSign,
  CalendarIcon,
  Heart,
  UserCheck,
  CreditCard,
  MapPin,
  Award,
} from "lucide-react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
  { month: "Nov", members: 620000 },
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

// Additional data for new tabs
const memberStatusData = [
  { name: "Active", value: 320 },
  { name: "Inactive", value: 25 },
  { name: "Pending", value: 5 },
]

const memberCountyData = [
  { name: "Nairobi", value: 120 },
  { name: "Kiambu", value: 85 },
  { name: "Machakos", value: 65 },
  { name: "Kajiado", value: 45 },
  { name: "Murang'a", value: 35 },
]

const memberJoinTrendData = [
  { month: "Jan", new: 15, total: 120 },
  { month: "Feb", new: 25, total: 145 },
  { month: "Mar", new: 17, total: 162 },
  { month: "Apr", new: 18, total: 180 },
  { month: "May", new: 25, total: 205 },
  { month: "Jun", new: 25, total: 230 },
  { month: "Jul", new: 15, total: 245 },
  { month: "Aug", new: 25, total: 270 },
  { month: "Sep", new: 20, total: 290 },
  { month: "Oct", new: 20, total: 310 },
  { month: "Nov", new: 15, total: 325 },
  { month: "Dec", new: 25, total: 350 },
]

const donationMethodData = [
  { name: "M-Pesa", value: 60 },
  { name: "Bank Transfer", value: 25 },
  { name: "Card Payment", value: 15 },
]

const donationAmountRangeData = [
  { range: "0-1K", count: 45 },
  { range: "1K-5K", count: 35 },
  { range: "5K-10K", count: 25 },
  { range: "10K-50K", count: 15 },
  { range: "50K+", count: 8 },
]

const monthlyDonorData = [
  { month: "Jan", donors: 45, amount: 250000 },
  { month: "Feb", donors: 52, amount: 320000 },
  { month: "Mar", donors: 48, amount: 280000 },
  { month: "Apr", donors: 58, amount: 360000 },
  { month: "May", donors: 65, amount: 420000 },
  { month: "Jun", donors: 62, amount: 390000 },
  { month: "Jul", donors: 68, amount: 450000 },
  { month: "Aug", donors: 75, amount: 520000 },
  { month: "Sep", donors: 72, amount: 480000 },
  { month: "Oct", donors: 78, amount: 550000 },
  { month: "Nov", donors: 82, amount: 620000 },
  { month: "Dec", donors: 88, amount: 700000 },
]

const eventTypeData = [
  { name: "Workshops", value: 8 },
  { name: "Meetings", value: 6 },
  { name: "Social Events", value: 4 },
  { name: "Training", value: 3 },
  { name: "Fundraising", value: 3 },
]

const eventRegistrationData = [
  { month: "Jan", registered: 95, attended: 85 },
  { month: "Feb", registered: 125, attended: 110 },
  { month: "Mar", registered: 110, attended: 95 },
  { month: "Apr", registered: 145, attended: 130 },
  { month: "May", registered: 165, attended: 145 },
  { month: "Jun", registered: 180, attended: 160 },
  { month: "Jul", registered: 195, attended: 175 },
  { month: "Aug", registered: 210, attended: 190 },
  { month: "Sep", registered: 225, attended: 205 },
  { month: "Oct", registered: 240, attended: 220 },
  { month: "Nov", registered: 255, attended: 235 },
  { month: "Dec", registered: 270, attended: 250 },
]

const volunteerHoursData = [
  { month: "Jan", hours: 85 },
  { month: "Feb", hours: 95 },
  { month: "Mar", hours: 110 },
  { month: "Apr", hours: 125 },
  { month: "May", hours: 140 },
  { month: "Jun", hours: 155 },
  { month: "Jul", hours: 170 },
  { month: "Aug", hours: 185 },
  { month: "Sep", hours: 200 },
  { month: "Oct", hours: 215 },
  { month: "Nov", hours: 230 },
  { month: "Dec", hours: 250 },
]

const partnerTypeData = [
  { name: "Corporate", value: 12 },
  { name: "NGO", value: 8 },
  { name: "Government", value: 5 },
  { name: "Individual", value: 15 },
]

const COLORS = ["#5ECCE9", "#0A3161", "#FFD700", "#8B2323", "#FF8C00"]

export const AnalyticsContent = () => {
  const { theme } = useTheme()
  const [timeRange, setTimeRange] = useState("year")
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportType, setExportType] = useState("overview")
  const [exportFormat, setExportFormat] = useState("csv")
  const isDark = theme === "dark"

  // Text colors based on theme
  const textColor = isDark ? "#fff" : "#000"
  const gridColor = isDark ? "#444" : "#ddd"

  // Export utility functions
  const generateCSV = (data: any[], filename: string) => {
    if (!data.length) return

    const headers = Object.keys(data[0]).join(",")
    const rows = data.map((row) => Object.values(row).join(",")).join("\n")
    const csvContent = `${headers}\n${rows}`

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateJSON = (data: any[], filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generatePDF = async (data: any[], filename: string) => {
    // Simple PDF generation using HTML to PDF approach
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${filename}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1 { color: #333; }
        </style>
      </head>
      <body>
        <h1>NAPOWA Analytics Report - ${filename}</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <p>Time Range: ${timeRange}</p>
        <table>
          <thead>
            <tr>
              ${Object.keys(data[0] || {})
                .map((key) => `<th>${key}</th>`)
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (row) => `
              <tr>
                ${Object.values(row)
                  .map((value) => `<td>${value}</td>`)
                  .join("")}
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.print()
  }

  const getExportData = () => {
    const currentDate = new Date().toISOString().split("T")[0]

    switch (exportType) {
      case "members":
        return {
          summary: [
            { metric: "Total Members", value: 350, change: "+12%" },
            { metric: "Active Members", value: 320, change: "+8%" },
            { metric: "New This Month", value: 25, change: "+67%" },
            { metric: "Retention Rate", value: "94%", change: "+2%" },
          ],
          detailed: memberJoinTrendData.map((item) => ({
            ...item,
            growth_rate: item.new > 0 ? ((item.new / (item.total - item.new)) * 100).toFixed(1) + "%" : "0%",
          })),
          counties: memberCountyData,
          types: memberTypeData,
        }

      case "donations":
        return {
          summary: [
            { metric: "Total Raised", value: "KES 4.5M", change: "+8%" },
            { metric: "Total Donors", value: 788, change: "+12%" },
            { metric: "Average Donation", value: "KES 5,710", change: "-3%" },
            { metric: "Recurring Donors", value: 156, change: "+18%" },
          ],
          monthly: monthlyDonorData,
          methods: donationMethodData,
          ranges: donationAmountRangeData,
        }

      case "events":
        return {
          summary: [
            { metric: "Total Events", value: 24, change: "+15%" },
            { metric: "Total Attendance", value: 1950, change: "+22%" },
            { metric: "Average Attendance", value: 81, change: "+6%" },
            { metric: "Attendance Rate", value: "89%", change: "+3%" },
          ],
          registration: eventRegistrationData,
          types: eventTypeData,
          attendance: eventAttendanceData,
        }

      case "programs":
        return {
          summary: [
            { metric: "Active Programs", value: 8, change: "+2 new" },
            { metric: "Total Volunteers", value: 120, change: "+15%" },
            { metric: "Volunteer Hours", value: 1850, change: "+28%" },
            { metric: "Active Partners", value: 40, change: "+8 new" },
          ],
          volunteer_hours: volunteerHoursData,
          partners: partnerTypeData,
          participation: programParticipationData,
        }

      default: // overview
        return {
          summary: [
            { metric: "Total Members", value: 350, change: "+12%" },
            { metric: "Total Donations", value: "KES 4.5M", change: "+8%" },
            { metric: "Events Held", value: 24, change: "+15%" },
            { metric: "Volunteer Hours", value: 1250, change: "+5%" },
          ],
          member_growth: memberGrowthData,
          donations: donationData,
          events: eventAttendanceData,
        }
    }
  }

  const handleExport = () => {
    const data = getExportData()
    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `NAPOWA_${exportType}_report_${timestamp}`

    // Flatten the data for export
    const exportData = []

    // Add summary data
    if (data.summary) {
      exportData.push(...data.summary.map((item) => ({ section: "Summary", ...item })))
    }

    // Add detailed data based on export type
    Object.keys(data).forEach((key) => {
      if (key !== "summary" && Array.isArray(data[key])) {
        exportData.push(...data[key].map((item) => ({ section: key, ...item })))
      }
    })

    switch (exportFormat) {
      case "csv":
        generateCSV(exportData, filename)
        break
      case "json":
        generateJSON(data, filename)
        break
      case "pdf":
        generatePDF(exportData, filename)
        break
    }

    setExportDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div className="flex items-center gap-2 ml-auto">
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
          <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Export Analytics Report</DialogTitle>
                <DialogDescription>Select the type of report and format you want to export.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <RadioGroup value={exportType} onValueChange={setExportType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="overview" id="overview" />
                      <Label htmlFor="overview">Overview</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="members" id="members" />
                      <Label htmlFor="members">Members</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="donations" id="donations" />
                      <Label htmlFor="donations">Donations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="events" id="events" />
                      <Label htmlFor="events">Events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="programs" id="programs" />
                      <Label htmlFor="programs">Programs</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="export-format">Export Format</Label>
                  <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="csv" id="csv" />
                      <Label htmlFor="csv">CSV (Excel Compatible)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="json" id="json" />
                      <Label htmlFor="json">JSON (Data Format)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pdf" id="pdf" />
                      <Label htmlFor="pdf">PDF (Print Ready)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Time Range</Label>
                  <p className="text-sm text-muted-foreground">
                    Current selection:{" "}
                    {timeRange === "month"
                      ? "Last Month"
                      : timeRange === "quarter"
                        ? "Last Quarter"
                        : timeRange === "year"
                          ? "Last Year"
                          : "All Time"}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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

        {/* Members Tab */}
        <TabsContent value="members" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Members</p>
                    <h3 className="mt-1 text-2xl font-bold">320</h3>
                    <p className="mt-1 text-xs text-green-500">91% of total</p>
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
                    <h3 className="mt-1 text-2xl font-bold">25</h3>
                    <p className="mt-1 text-xs text-green-500">+67% vs last month</p>
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
                    <h3 className="mt-1 text-2xl font-bold">94%</h3>
                    <p className="mt-1 text-xs text-green-500">+2% vs last year</p>
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
                    <h3 className="mt-1 text-2xl font-bold">2.3 yrs</h3>
                    <p className="mt-1 text-xs text-green-500">+0.2 vs last year</p>
                  </div>
                  <CalendarIcon className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Member Registration Trends</CardTitle>
                <CardDescription>New member registrations vs total members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={memberJoinTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Status Distribution</CardTitle>
                <CardDescription>Current status of all members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={memberStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {memberStatusData.map((entry, index) => (
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Members by county</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={memberCountyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Types</CardTitle>
                <CardDescription>Distribution by member category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={memberTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
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
          </div>
        </TabsContent>

        {/* Donations Tab */}
        <TabsContent value="donations" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                    <h3 className="mt-1 text-2xl font-bold">KES 4.5M</h3>
                    <p className="mt-1 text-xs text-green-500">+8% vs last month</p>
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
                    <h3 className="mt-1 text-2xl font-bold">788</h3>
                    <p className="mt-1 text-xs text-green-500">+12% vs last month</p>
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
                    <h3 className="mt-1 text-2xl font-bold">KES 5,710</h3>
                    <p className="mt-1 text-xs text-red-500">-3% vs last month</p>
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
                    <h3 className="mt-1 text-2xl font-bold">156</h3>
                    <p className="mt-1 text-xs text-green-500">+18% vs last month</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Donation Trends</CardTitle>
                <CardDescription>Donation amounts and donor count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyDonorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                          name === "amount" ? `KES ${value.toLocaleString()}` : value,
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods used</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donationMethodData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {donationMethodData.map((entry, index) => (
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Donation Amount Ranges</CardTitle>
                <CardDescription>Distribution of donation amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={donationAmountRangeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="range" stroke={textColor} />
                      <YAxis stroke={textColor} />
                      <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#333" : "#fff",
                          borderColor: isDark ? "#444" : "#ddd",
                          color: textColor,
                        }}
                      />
                      <Bar dataKey="count" fill="#FFD700" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation Sources</CardTitle>
                <CardDescription>Where donations are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donationSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
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
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                    <h3 className="mt-1 text-2xl font-bold">24</h3>
                    <p className="mt-1 text-xs text-green-500">+15% vs last year</p>
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
                    <h3 className="mt-1 text-2xl font-bold">1,950</h3>
                    <p className="mt-1 text-xs text-green-500">+22% vs last year</p>
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
                    <h3 className="mt-1 text-2xl font-bold">81</h3>
                    <p className="mt-1 text-xs text-green-500">+6% vs last year</p>
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
                    <h3 className="mt-1 text-2xl font-bold">89%</h3>
                    <p className="mt-1 text-xs text-green-500">+3% vs last year</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Registration vs Attendance</CardTitle>
                <CardDescription>Monthly comparison of registrations and actual attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eventRegistrationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Types</CardTitle>
                <CardDescription>Distribution of event categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {eventTypeData.map((entry, index) => (
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
              <CardTitle>Monthly Event Attendance Trend</CardTitle>
              <CardDescription>Event attendance patterns throughout the year</CardDescription>
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
                    <Line type="monotone" dataKey="attendance" stroke="#FFD700" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Programs</p>
                    <h3 className="mt-1 text-2xl font-bold">8</h3>
                    <p className="mt-1 text-xs text-green-500">+2 new this year</p>
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
                    <h3 className="mt-1 text-2xl font-bold">120</h3>
                    <p className="mt-1 text-xs text-green-500">+15% vs last year</p>
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
                    <h3 className="mt-1 text-2xl font-bold">1,850</h3>
                    <p className="mt-1 text-xs text-green-500">+28% vs last year</p>
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
                    <h3 className="mt-1 text-2xl font-bold">40</h3>
                    <p className="mt-1 text-xs text-green-500">+8 new partnerships</p>
                  </div>
                  <MapPin className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Volunteer Hours</CardTitle>
                <CardDescription>Volunteer engagement throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={volunteerHoursData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner Types</CardTitle>
                <CardDescription>Distribution of partnership categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={partnerTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {partnerTypeData.map((entry, index) => (
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
              <CardTitle>Program Participation</CardTitle>
              <CardDescription>Distribution of participation across different programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={programParticipationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
