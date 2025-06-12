"use client"
import React from "react"

import { Button } from "@/components/ui/button"
import {
  Download,
} from "lucide-react"
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
import { useAnalytics } from "@/hooks/useAnalytics"
import { TimeRange } from "@/types/analytics"


interface ExportReportProps{
    timeRange?:TimeRange;
}

export const ExportReport = ({timeRange="all_time"}:ExportReportProps) => {
    const [exportDialogOpen, setExportDialogOpen] = React.useState(false)
    const [exportType, setExportType] = React.useState("overview")
    const [exportFormat, setExportFormat] = React.useState("csv")

    const { data, loading, } = useAnalytics(timeRange || "all_time")

    // Export utility functions (same as before)
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
    if (!data) return []

    const currentDate = new Date().toISOString().split("T")[0]

    switch (exportType) {
        case "members":
        return {
            summary: Object.entries(data.members.summary).map(([key, value]) => ({
            metric: key,
            value: value,
            })),
            detailed: data.members.joinTrends,
            counties: data.members.countyDistribution,
            types: data.members.typeDistribution,
        }

        case "donations":
        return {
            summary: Object.entries(data.donations.summary).map(([key, value]) => ({
            metric: key,
            value: value,
            })),
            monthly: data.donations.monthlyTrends,
            methods: data.donations.paymentMethods,
            ranges: data.donations.amountRanges,
        }

        case "events":
        return {
            summary: Object.entries(data.events.summary).map(([key, value]) => ({
            metric: key,
            value: value,
            })),
            registration: data.events.registrationVsAttendance,
            types: data.events.eventTypes,
            attendance: data.events.attendanceTrends,
        }

        case "programs":
        return {
            summary: Object.entries(data.programs.summary).map(([key, value]) => ({
            metric: key,
            value: value,
            })),
            volunteer_hours: data.programs.volunteerHours,
            partners: data.programs.partnerTypes,
            participation: data.programs.participation,
        }

        default: // overview
        return {
            summary: data.overview.keyMetrics,
            member_growth: data.overview.memberGrowth,
            donations: data.overview.donationTrends,
            events: data.overview.eventAttendance,
        }
    }
    }
    
    const handleExport = () => {
    const exportData = getExportData()
    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `NAPOWA_${exportType}_report_${timestamp}`

    // Flatten the data for export
    const flattenedData = []

    Object.keys(exportData).forEach((key) => {
        if (Array.isArray(exportData[key])) {
        flattenedData.push(...exportData[key].map((item) => ({ section: key, ...item })))
        }
    })

    switch (exportFormat) {
        case "csv":
        generateCSV(flattenedData, filename)
        break
        case "json":
        generateJSON(exportData, filename)
        break
        case "pdf":
        generatePDF(flattenedData, filename)
        break
    }

    setExportDialogOpen(false)
    }
  return (
    <>
    <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogTrigger asChild>
            <Button variant="outline" disabled={loading || !data}>
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
                {timeRange === "this_month"
                    ? "This Month"
                    : timeRange === "last_month"
                    ? "Last Month"
                    : timeRange === "this_quarter"
                        ? "This Quarter"
                        : timeRange === "last_quarter"
                        ? "Last Quarter"
                        : timeRange === "this_year"
                            ? "This Year"
                            : timeRange === "last_year"
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
    </>
  )
}
