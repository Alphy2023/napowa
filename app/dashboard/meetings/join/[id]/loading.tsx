import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MeetingJoinLoading() {
  return (
    <div className="container mx-auto max-w-3xl py-8">
      <div className="mb-6 text-center">
        <Skeleton className="mx-auto h-8 w-64" />
        <Skeleton className="mx-auto mt-2 h-4 w-48" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Video Preview */}
            <div className="mx-auto aspect-video w-full max-w-md overflow-hidden rounded-lg">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Device Selection */}
            <div className="space-y-4">
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Meeting Info */}
            <div className="rounded-lg border p-4">
              <Skeleton className="h-5 w-32" />
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            </div>

            {/* Join Button */}
            <div className="flex justify-center">
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
