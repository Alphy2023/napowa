import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function MessagesLoading() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col md:flex-row md:space-x-4">
      {/* Sidebar */}
      <div className="mb-4 w-full md:mb-0 md:w-80">
        <Card className="h-full">
          <CardContent className="p-4">
            <Skeleton className="h-10 w-full" />
            <div className="mt-4 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                  <Skeleton className="h-3 w-3 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        <Card className="flex h-full flex-col">
          {/* Chat Header */}
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-1 h-3 w-24" />
              </div>
              <div className="ml-auto flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Received Messages */}
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <div className="rounded-lg bg-muted p-3">
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
              </div>

              {/* Sent Messages */}
              <div className="flex items-start justify-end gap-3">
                <div className="text-right">
                  <div className="rounded-lg bg-primary p-3">
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>

              {/* Received Messages */}
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div>
                  <div className="rounded-lg bg-muted p-3">
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
              </div>

              {/* Sent Messages */}
              <div className="flex items-start justify-end gap-3">
                <div className="text-right">
                  <div className="rounded-lg bg-primary p-3">
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
