
import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryPreviewLoading() {
  return (
    <section className="py-16 md:py-24 container">
      <div>
        {/* Page Title Skeleton */}
        <div className="mb-10 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4" /> {/* Title placeholder */}
          <Skeleton className="h-5 w-96 mx-auto" /> {/* Description placeholder */}
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <Skeleton className="h-64 w-full rounded-lg" /> {/* Image placeholder */}
            </div>
          ))}
        </div>

        {/* "View Full Gallery" Button Skeleton */}
        <div className="mt-12 text-center">
            <Skeleton className="h-12 w-48" /> 
        </div>
      </div>
    </section>
  );
}