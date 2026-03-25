"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { usePrograms, useProgramCategories } from "@/hooks/use-programs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Clock, MapPin } from "lucide-react"

export function ProgramsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>()
  const { programs, isLoading } = usePrograms(selectedCategoryId)
  const { categories } = useProgramCategories()

  if (isLoading) {
    return <div className="container py-12 text-center">Loading programs...</div>
  }

  return (
    <main className="w-full">
      {/* Header */}
      <section className="w-full bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Our Programs</h1>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive training programs designed to empower police families
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="w-full py-12">
        <div className="container">
          {/* Category Tabs */}
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-auto gap-2 overflow-x-auto">
              <TabsTrigger value="all" onClick={() => setSelectedCategoryId(undefined)}>
                All Programs
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No programs found in this category</p>
                  </div>
                ) : (
                  programs.map((program) => (
                    <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {program.featuredImage && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={(program.featuredImage as any).url || "/placeholder.svg"}
                            alt={program.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="line-clamp-2">{program.title}</CardTitle>
                          <Badge variant="outline">{program.deliveryMode}</Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {program.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm">
                          {program.duration && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{program.duration}</span>
                            </div>
                          )}
                          {program.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{program.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{program.enrolledCount} enrolled</span>
                          </div>
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/programs/${program.id}`}>Learn More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
