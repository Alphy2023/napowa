// Base types for analytics data
export interface MetricCard {
  metric: string
  value: string | number
  change: string
  trend: "up" | "down" | "neutral"
}

export interface ChartDataPoint {
  month: string
  [key: string]: string | number
}

export interface PieChartData {
  name: string
  value: number
}

export interface BarChartData {
  name: string
  value: number
}

// Member Analytics Types
export interface MemberAnalytics {
  summary: {
    totalMembers: number
    activeMembers: number
    newThisMonth: number
    retentionRate: number
    avgTenure: number
    memberGrowthPercent: number
    activeGrowthPercent: number
    retentionGrowthPercent: number
    tenureGrowthPercent: number
  }
  growth: ChartDataPoint[]
  joinTrends: Array<{
    month: string
    new: number
    total: number
    growthRate: string
  }>
  statusDistribution: PieChartData[]
  typeDistribution: PieChartData[]
  countyDistribution: BarChartData[]
}

// Donation Analytics Types
export interface DonationAnalytics {
  summary: {
    totalRaised: number
    totalDonors: number
    avgDonation: number
    recurringDonors: number
    totalRaisedGrowth: number
    donorGrowth: number
    avgDonationGrowth: number
    recurringGrowth: number
  }
  monthlyTrends: Array<{
    month: string
    amount: number
    donors: number
  }>
  paymentMethods: PieChartData[]
  amountRanges: BarChartData[]
  sources: PieChartData[]
}

// Event Analytics Types
export interface EventAnalytics {
  summary: {
    totalEvents: number
    totalAttendance: number
    avgAttendance: number
    attendanceRate: number
    eventGrowth: number
    attendanceGrowth: number
    avgAttendanceGrowth: number
    attendanceRateGrowth: number
  }
  registrationVsAttendance: Array<{
    month: string
    registered: number
    attended: number
  }>
  eventTypes: PieChartData[]
  attendanceTrends: ChartDataPoint[]
}

// Program Analytics Types
export interface ProgramAnalytics {
  summary: {
    activePrograms: number
    totalVolunteers: number
    volunteerHours: number
    activePartners: number
    volunteerGrowth: number
    partnerGrowth: number
    hoursGrowth: number
    programGrowth: number
  }
  volunteerHours: ChartDataPoint[]
  partnerTypes: PieChartData[]
  participation: BarChartData[]
}

// Overview Analytics Types
export interface OverviewAnalytics {
  keyMetrics: MetricCard[]
  memberGrowth: ChartDataPoint[]
  donationTrends: ChartDataPoint[]
  eventAttendance: ChartDataPoint[]
  memberTypes: PieChartData[]
  donationSources: PieChartData[]
  programParticipation: PieChartData[]
}

// Main Analytics Response Type
export interface AnalyticsResponse {
  overview: OverviewAnalytics
  members: MemberAnalytics
  donations: DonationAnalytics
  events: EventAnalytics
  programs: ProgramAnalytics
  lastUpdated: string
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Update the TimeRange type to include more specific periods
export type TimeRange =
  | "this_month"
  | "last_month"
  | "this_quarter"
  | "last_quarter"
  | "this_year"
  | "last_year"
  | "all_time"

// Add more specific date range interface
export interface DateRange {
  startDate: Date
  endDate: Date
  label: string
}

export interface AnalyticsProps{
    loading?:boolean
    textColor?:string
    gridColor?:string
    data?:any
    isDark?:boolean
}
