import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function MeetingRoomLoading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Meeting Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-5 w-48" />
            <Skeleton className="mt-1 h-3 w-32" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      {/* Meeting Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex aspect-video items-center justify-center">
                <CardContent className="p-0">
                  <Skeleton className="h-full w-full" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full border-l md:w-80">
          <div className="flex h-12 items-center border-b px-4">
            <div className="flex gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* Participants List */}
          <div className="h-1/2 overflow-y-auto p-4">
            <Skeleton className="mb-4 h-5 w-32" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex gap-1">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="flex h-1/2 flex-col border-t">
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="ml-8 mt-1">
                      <Skeleton className="h-4 w-full max-w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Controls */}
      <div className="flex items-center justify-center gap-2 border-t p-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  )
}
