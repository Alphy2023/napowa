
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContactUsLoading() {
  return (
    <div className="container py-12 md:py-16 space-y-16">
      <div className="space-y-2 mx-auto text-center flex flex-col justify-center max-w-lg">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader className="space-y-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-2 mt-auto">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-4 w-60" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {["Email", "Phone Number", "Subject", "Message"].map((label, idx) => (
            <div className="space-y-2" key={idx}>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}

          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="aspect-video w-full rounded-lg" />
          <Skeleton className="h-6 w-64" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-8 w-72 mx-auto" />
        <div className="flex justify-center space-x-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-12 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
