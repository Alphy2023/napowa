import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto h-10 w-64" />
        <Skeleton className="mx-auto mt-2 h-5 w-96" />
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
              <div className="ml-auto flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <Skeleton className="aspect-video h-full w-full" />
              <div className="p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-2 h-8 w-full max-w-md" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
                <div className="mt-6 flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-1 h-3 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="aspect-video h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="mt-2 h-6 w-full" />
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-3/4" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-10" />
      </div>
    </div>
  )
}
