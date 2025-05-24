import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function GalleryLoading() {
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

      {/* Gallery Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Skeleton className="aspect-square h-full w-full" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="mt-1 h-4 w-1/2" />
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
