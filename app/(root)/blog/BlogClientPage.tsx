"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Filter, User, ArrowRight, Grid, List } from "lucide-react"
import ScrollableTablist from "@/components/scrollable-tablist"
import { HeroContent } from "@/components/hero-content"

// Sample blog post data
const blogPosts = [
  {
    id: "1",
    title: "Supporting Police Widows: NAPOWA's Approach",
    slug: "supporting-police-widows",
    excerpt: "Learn about NAPOWA's comprehensive approach to supporting police widows across Kenya.",
    content: "Full content here...",
    category: "Widows Support",
    author: "Jane Muthoni",
    status: "published",
    publishedAt: "2023-04-15T10:30:00Z",
    createdAt: "2023-04-10T08:15:00Z",
    updatedAt: "2023-04-14T14:20:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["widows", "support", "community"],
    views: 245,
  },
  {
    id: "2",
    title: "Skills Development Programs for Police Wives",
    slug: "skills-development-programs",
    excerpt: "Discover the various skills development programs NAPOWA offers to police wives.",
    content: "Full content here...",
    category: "Skills Development",
    author: "Mary Akinyi",
    status: "published",
    publishedAt: "2023-03-22T09:45:00Z",
    createdAt: "2023-03-18T11:30:00Z",
    updatedAt: "2023-03-21T16:10:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["skills", "development", "training"],
    views: 189,
  },
  {
    id: "3",
    title: "Health Advocacy: Ensuring Well-being of Police Families",
    slug: "health-advocacy",
    excerpt: "How NAPOWA advocates for the health and well-being of police families.",
    content: "Full content here...",
    category: "Health",
    author: "Sarah Wanjiku",
    status: "published",
    publishedAt: "2023-02-28T14:20:00Z",
    createdAt: "2023-02-25T10:05:00Z",
    updatedAt: "2023-02-27T13:40:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["health", "advocacy", "well-being"],
    views: 312,
  },
  {
    id: "5",
    title: "Success Stories: Police Wives Entrepreneurs",
    slug: "success-stories-entrepreneurs",
    excerpt: "Inspiring success stories of police wives who have become successful entrepreneurs.",
    content: "Full content here...",
    category: "Success Stories",
    author: "Faith Kamau",
    status: "published",
    publishedAt: "2023-01-18T08:00:00Z",
    createdAt: "2023-01-15T14:25:00Z",
    updatedAt: "2023-01-17T16:30:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["success", "entrepreneurship", "inspiration"],
    views: 427,
  },
  {
    id: "7",
    title: "The Impact of Woman of Purpose Events",
    slug: "impact-woman-of-purpose",
    excerpt: "Exploring the transformative impact of our annual Woman of Purpose events on participants' lives.",
    content: "Full content here...",
    category: "Woman of Purpose",
    author: "Hope Njeri",
    status: "published",
    publishedAt: "2023-05-10T11:15:00Z",
    createdAt: "2023-05-05T09:30:00Z",
    updatedAt: "2023-05-09T14:45:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["empowerment", "events", "inspiration"],
    views: 178,
  },
  {
    id: "8",
    title: "Financial Literacy for Police Families",
    slug: "financial-literacy-police-families",
    excerpt: "How financial literacy training is helping police families achieve economic stability and independence.",
    content: "Full content here...",
    category: "Financial Literacy",
    author: "Charity Odhiambo",
    status: "published",
    publishedAt: "2023-04-28T13:20:00Z",
    createdAt: "2023-04-25T10:15:00Z",
    updatedAt: "2023-04-27T16:30:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["finance", "literacy", "economic empowerment"],
    views: 203,
  },
]

type TabItem = {
  id:string;
  title:string;
}
const tablists: TabItem[] = [
  {
    id:"all",
    title:"All Posts"
  },
  {
    id:"skills",
    title:"Skills Development"
  },
  {
    id:"health",
    title:"Health Advocacy"
  },
  {
    id:"events",
    title:"Events"
  },
  {
    id:"community",
    title:"Community"
  },
]

export default function BlogClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter blog posts based on search term and filters
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroContent
          title="Blog"
          description={`Read the latest news, stories, 
          and updates from NAPOWA's work across Kenya.`}
          
        />
    

      {/* Blog Posts Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{categoryFilter === "all" ? "All Categories" : categoryFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none rounded-l-md ${viewMode === "grid" ? "bg-muted" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none rounded-r-md ${viewMode === "list" ? "bg-muted" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
             <ScrollableTablist
              items={tablists}
              noCenter={true}
              />

            <TabsContent value="all" className="mt-0">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="h-full overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={post.featuredImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-2 flex items-center gap-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`} className="group">
                            <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">{post.title}</h2>
                          </Link>
                          <p className="mb-4 line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="mr-1 h-3 w-3" />
                            <span>{post.author}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t p-6 pt-4">
                          <Button asChild variant="ghost" className="w-full">
                            <Link href={`/blog/${post.slug}`} className="flex items-center justify-center">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card>
                        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
                          <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                            <Image
                              src={post.featuredImage || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="rounded-md object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant="outline">{post.category}</Badge>
                              <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
                            </div>
                            <Link href={`/blog/${post.slug}`} className="group">
                              <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">{post.title}</h2>
                            </Link>
                            <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <User className="mr-1 h-3 w-3" />
                                <span>{post.author}</span>
                              </div>
                              <Button asChild variant="ghost" size="sm">
                                <Link href={`/blog/${post.slug}`} className="flex items-center">
                                  Read More
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="my-12 text-center">
                  <p className="text-lg font-medium">No blog posts found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setCategoryFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Similar structure for other tabs, filtering by category */}
            <TabsContent value="widows" className="mt-0">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts
                    .filter((post) => post.category === "Widows Support")
                    .map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="h-full overflow-hidden">
                          <div className="relative h-48 w-full">
                            <Image
                              src={post.featuredImage || "/placeholder.svg"}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-6">
                            <div className="mb-2 flex items-center gap-2">
                              <Badge variant="outline">{post.category}</Badge>
                              <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
                            </div>
                            <Link href={`/blog/${post.slug}`} className="group">
                              <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">{post.title}</h2>
                            </Link>
                            <p className="mb-4 line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <User className="mr-1 h-3 w-3" />
                              <span>{post.author}</span>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t p-6 pt-4">
                            <Button asChild variant="ghost" className="w-full">
                              <Link href={`/blog/${post.slug}`} className="flex items-center justify-center">
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredPosts
                    .filter((post) => post.category === "Widows Support")
                    .map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card>
                          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row">
                            <div className="relative h-48 w-full sm:h-auto sm:w-1/3">
                              <Image
                                src={post.featuredImage || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="mb-2 flex items-center gap-2">
                                <Badge variant="outline">{post.category}</Badge>
                                <span className="text-xs text-muted-foreground">{formatDate(post.publishedAt)}</span>
                              </div>
                              <Link href={`/blog/${post.slug}`} className="group">
                                <h2 className="mb-2 text-xl font-semibold group-hover:text-primary">{post.title}</h2>
                              </Link>
                              <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <User className="mr-1 h-3 w-3" />
                                  <span>{post.author}</span>
                                </div>
                                <Button asChild variant="ghost" size="sm">
                                  <Link href={`/blog/${post.slug}`} className="flex items-center">
                                    Read More
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              )}
            </TabsContent>

            {/* Repeat similar structure for other tabs */}
          </Tabs>
        </div>
      </section>
    </main>
  )
}
