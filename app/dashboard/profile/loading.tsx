import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="absolute -bottom-12 left-6 flex items-end">
          <Skeleton className="h-24 w-24 rounded-full border-4 border-background" />
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {/* Left Column - Profile Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-6 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-6 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-6 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-6 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-1 h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="mt-1 h-10 w-full" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-20 w-full" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
