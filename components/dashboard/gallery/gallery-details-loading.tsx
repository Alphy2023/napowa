
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"; 

export default function GalleryDetailsPageLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between flex-col sm:flex-row space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          {/* Skeleton for Back Button */}
          <Skeleton className="h-9 w-9 rounded-md" /> {/* Button size approximation */}
          <Skeleton className="h-8 w-48" /> {/* Title Placeholder */}
        </div>
        <div className="flex items-center space-x-2">
          {/* Skeleton for Share Button */}
          <Skeleton className="h-9 w-9 rounded-md" />
          {/* Skeleton for Download Button */}
          <Skeleton className="h-9 w-9 rounded-md" />
          {/* Skeleton for Edit Button */}
          <Skeleton className="h-9 w-24 rounded-md" /> {/* Adjust width for text "Edit" */}
          {/* Skeleton for Delete Button */}
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Pane (Media Display) Skeleton */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Skeleton className="relative aspect-video w-full" /> {/* Main media area */}

              {/* Thumbnail navigation skeleton */}
              <div className="relative mt-4 px-4 pb-4 flex items-center">
                {/* Skeleton for Left Chevron Button */}
                <Skeleton
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full" // Adjust size for circle button
                />

                <div className="flex gap-2 overflow-hidden justify-center flex-grow">
                  {[...Array(5)].map((_, index) => ( // Show a few placeholder thumbnails
                    <Skeleton key={index} className="w-24 h-16 rounded-md flex-shrink-0" />
                  ))}
                </div>

                {/* Skeleton for Right Chevron Button */}
                <Skeleton
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full" // Adjust size for circle button
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Pane (Media Information & Related Images) Skeleton */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-2/3" /> {/* Media Information Title */}
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-full mt-2" /> {/* Description Placeholder */}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Info sections */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Separator />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Separator />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Separator />
              <div className="flex flex-wrap gap-1">
                {[...Array(4)].map((_, i) => ( // Tags placeholders
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </CardContent>
            <div className="p-6 flex justify-between">
              {/* Skeleton for Add/Remove from Featured Button */}
              <Skeleton className="h-9 w-48 rounded-md" /> {/* Adjust width for button text */}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-2/3" /> {/* Related Images Title */}
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-full mt-2" /> {/* Related Images Description */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="relative aspect-square w-full rounded-md" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}