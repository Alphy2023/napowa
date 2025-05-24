import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoadingPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section Skeleton */}
      <section className="w-full bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/programs"
              className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
            <div className="mb-4 flex justify-center">
              <Skeleton className="h-10 w-10 rounded-full p-4" />
            </div>
            <Skeleton className="mx-auto mb-6 h-10 w-3/4" />{" "}
            {/* Title Skeleton */}
            <Skeleton className="mx-auto mb-8 h-6 w-full md:w-5/6" />{" "}
            {/* Description Skeleton */}
          </div>
        </div>
      </section>

      {/* Featured Image Skeleton */}
      <div className="container relative -mt-10 mb-10 h-[300px] overflow-hidden rounded-lg md:h-[400px] lg:h-[500px]">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Program Content Skeleton */}
      <section className="w-full py-8 md:py-16">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_300px]">
            {/* Main Content Area Skeleton */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <Skeleton className="mb-4 h-8 w-2/3" /> {/* H2 Skeleton */}
              <Skeleton className="mb-4 h-4 w-full" /> {/* Paragraph Skeleton */}
              <Skeleton className="mb-4 h-4 w-5/6" /> {/* Paragraph Skeleton */}
              <Skeleton className="mb-4 h-4 w-full" /> {/* Paragraph Skeleton */}
              <Skeleton className="mb-4 h-8 w-1/2" /> {/* H3 Skeleton */}
              <Skeleton className="mb-2 h-4 w-full" /> {/* List Item Skeleton */}
              <Skeleton className="mb-2 h-4 w-full" /> {/* List Item Skeleton */}
              <Skeleton className="mb-2 h-4 w-3/4" /> {/* List Item Skeleton */}
              <Skeleton className="mb-4 h-4 w-full" /> {/* Paragraph Skeleton */}
              <Skeleton className="mb-4 h-8 w-2/3" /> {/* H3 Skeleton */}
              <Skeleton className="mb-4 h-4 w-full" /> {/* Paragraph Skeleton */}
            </div>

            {/* Sidebar Skeletons */}
            <div className="space-y-8">
              {/* Key Activities Skeleton */}
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-6 w-3/5" />{" "}
                  {/* Key Activities Title */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Skeleton className="mt-1 h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="mt-1 h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Skeleton className="mt-1 h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Skeleton */}
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-6 w-1/3" />{" "}
                  {/* Impact Title */}
                  <Skeleton className="h-4 w-full" /> {/* Impact Text */}
                </CardContent>
              </Card>

              {/* Get Involved Skeleton */}
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="mb-4 h-6 w-2/5" />{" "}
                  {/* Get Involved Title */}
                  <Skeleton className="mb-4 h-4 w-full" />{" "}
                  {/* Get Involved Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" /> {/* Button Skeleton */}
                    <Skeleton className="h-10 w-full" /> {/* Button Skeleton */}
                    <Skeleton className="h-10 w-full" /> {/* Button Skeleton */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Skeleton */}
      <section className="w-full bg-muted/50 py-16">
        <div className="container">
          <Skeleton className="mx-auto mb-8 h-8 w-1/2" />{" "}
          {/* Upcoming Events Title */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Event Card 1 Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="mb-2 h-6 w-3/4" /> {/* Event Title */}
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-1/2" /> {/* Date Skeleton */}
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-2/3" /> {/* Location Skeleton */}
                  </div>
                </div>
                <Skeleton className="h-10 w-full" /> {/* Description Skeleton */}
              </CardContent>
            </Card>
            {/* Event Card 2 Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="mb-2 h-6 w-3/4" /> {/* Event Title */}
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-1/2" /> {/* Date Skeleton */}
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-2/3" /> {/* Location Skeleton */}
                  </div>
                </div>
                <Skeleton className="h-10 w-full" /> {/* Description Skeleton */}
              </CardContent>
            </Card>
            {/* Event Card 3 Skeleton */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="mb-2 h-6 w-3/4" /> {/* Event Title */}
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-1/2" /> {/* Date Skeleton */}
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-2/3" /> {/* Location Skeleton */}
                  </div>
                </div>
                <Skeleton className="h-10 w-full" /> {/* Description Skeleton */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Skeleton */}
      <section className="w-full py-16">
        <div className="container">
          <Skeleton className="mx-auto mb-8 h-8 w-1/2" />{" "}
          {/* Success Stories Title */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {/* Story Card 1 Skeleton */}
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Skeleton className="mb-4 h-24 w-24 rounded-full" />{" "}
                {/* Image Skeleton */}
                <Skeleton className="mb-2 h-6 w-3/5" /> {/* Name Skeleton */}
                <Skeleton className="h-16 w-full" /> {/* Story Text Skeleton */}
              </CardContent>
            </Card>
            {/* Story Card 2 Skeleton */}
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Skeleton className="mb-4 h-24 w-24 rounded-full" />{" "}
                {/* Image Skeleton */}
                <Skeleton className="mb-2 h-6 w-3/5" /> {/* Name Skeleton */}
                <Skeleton className="h-16 w-full" /> {/* Story Text Skeleton */}
              </CardContent>
            </Card>
            {/* Story Card 3 Skeleton */}
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Skeleton className="mb-4 h-24 w-24 rounded-full" />{" "}
                {/* Image Skeleton */}
                <Skeleton className="mb-2 h-6 w-3/5" /> {/* Name Skeleton */}
                <Skeleton className="h-16 w-full" /> {/* Story Text Skeleton */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}