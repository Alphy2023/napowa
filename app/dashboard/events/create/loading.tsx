import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CreateEventLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-32 w-full" />
            </div>

            <div>
              <Skeleton className="mb-2 h-4 w-24" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square h-24 w-full rounded-md" />
                ))}
                <Skeleton className="flex aspect-square h-24 w-full items-center justify-center rounded-md border-2 border-dashed" />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
