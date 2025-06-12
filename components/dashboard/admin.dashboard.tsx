
import { AnalyticsContent } from "./analytics-content"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
        <div className="w-full">
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">View key metrics and performance indicators for NAPOWA.</p>
      </div>
      <AnalyticsContent/>
    </div>
  )
}
