import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MeetingsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
            <div className="ml-auto">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <Skeleton className="h-40 w-full md:h-auto md:w-48" />
                    <div className="flex-1 p-6">
                      <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Skeleton className="h-10 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Meetings */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <Skeleton className="h-40 w-full md:h-auto md:w-48" />
                    <div className="flex-1 p-6">
                      <div className="flex flex-col justify-between gap-4 md:flex-row">
                        <div className="space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Skeleton className="h-10 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
