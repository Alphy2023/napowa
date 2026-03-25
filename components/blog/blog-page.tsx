"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBlogs } from "@/hooks/use-blogs"
import { Input } from "@/components/ui/input"
import { Calendar, User, Eye } from "lucide-react"

export function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { blogs, isLoading } = useBlogs(undefined, true)

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div className="container py-12 text-center">Loading blogs...</div>
  }

  return (
    <main className="w-full">
      {/* Header */}
      <section className="w-full bg-gradient-to-r from-primary/10 to-primary/5 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay updated with news, insights, and stories from NAPOWA
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="w-full py-8 bg-muted/50">
        <div className="container">
          <div className="relative">
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full py-12">
        <div className="container">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blogs found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  {blog.featuredImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={(blog.featuredImage as any).url || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {blog.category && <Badge variant="outline">{blog.category}</Badge>}
                    </div>
                    <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {blog.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      {blog.publishedAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{blog.views} views</span>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/blog/${blog.slug}`}>Read Article</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
