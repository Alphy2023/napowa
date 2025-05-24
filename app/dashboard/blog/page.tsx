"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, Grid, List, Calendar, Eye, Trash, Pencil, MoreHorizontal } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

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
    id: "4",
    title: "Upcoming Woman of Purpose Annual Event",
    slug: "woman-of-purpose-event",
    excerpt: "Details about the upcoming Woman of Purpose annual empowerment event.",
    content: "Full content here...",
    category: "Events",
    author: "Grace Otieno",
    status: "draft",
    publishedAt: null,
    createdAt: "2023-05-05T09:30:00Z",
    updatedAt: "2023-05-06T11:15:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["events", "empowerment", "woman of purpose"],
    views: 0,
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
    id: "6",
    title: "Crisis Support: How NAPOWA Helps in Difficult Times",
    slug: "crisis-support",
    excerpt: "Learn about NAPOWA's crisis support system for police families facing difficult situations.",
    content: "Full content here...",
    category: "Crisis Support",
    author: "Hope Njeri",
    status: "draft",
    publishedAt: null,
    createdAt: "2023-05-08T13:10:00Z",
    updatedAt: "2023-05-09T10:45:00Z",
    featuredImage: "/placeholder.svg?height=400&width=600",
    tags: ["crisis", "support", "assistance"],
    views: 0,
  },
]

export default function BlogPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter blog posts based on search term and filters
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDeletePost = (id: string) => {
    toast({
      title: "Blog post deleted",
      description: "The blog post has been deleted successfully.",
    })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published"
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
          <p className="text-muted-foreground">
            Manage blog posts and articles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild className="bg-napowa-blue hover:bg-napowa-blue/80 text-white">
            <Link href="/dashboard/blog/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>
            View and manage all blog posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60">
                    <div className="p-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Category</p>
                          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="Widows Support">Widows Support</SelectItem>
                              <SelectItem value="Skills Development">Skills Development</SelectItem>
                              <SelectItem value="Health">Health</SelectItem>
                              <SelectItem value="Events">Events</SelectItem>
                              <SelectItem value="Success Stories">Success Stories</SelectItem>
                              <SelectItem value="Crisis Support">Crisis Support</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Status</p>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center rounded-md border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none rounded-l-md ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none rounded-r-md ${viewMode === 'list' ? 'bg-muted' : ''}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                    <span className="sr-only">List view</span>
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative h-48 w-full">
                              <Image
                                src={post.featuredImage || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute right-2 top-2">
                                <Badge variant={post.status === "published" ? "default" : "secondary"} className={post.status === "published" ? "bg-napowa-blue" : ""}>
                                  {post.status === "published" ? "Published" : "Draft"}
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="line-clamp-1 text-lg font-semibold">{post.title}</h3>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                {formatDate(post.publishedAt)}
                                <span className="mx-2">•</span>
                                <Eye className="mr-1 h-3 w-3" />
                                {post.views} views
                              </div>
                              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                {post.excerpt}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-1">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/blog/${post.id}`}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex-1 bg-napowa-red hover:bg-napowa-red/80"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead className="hidden md:table-cell">Author</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Published</TableHead>
                          <TableHead className="hidden md:table-cell">Views</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="relative h-10 w-10 overflow-hidden rounded">
                                  <Image
                                    src={post.featuredImage || "/placeholder.svg"}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{post.title}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1 md:hidden">{post.author}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{post.category}</TableCell>
                            <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                            <TableCell>
                              <Badge variant={post.status === "published" ? "default" : "secondary"} className={post.status === "published" ? "bg-napowa-blue" : ""}>
                                {post.status === "published" ? "Published" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{formatDate(post.publishedAt)}</TableCell>
                            <TableCell className="hidden md:table-cell">{post.views}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/blog/${post.id}`}>
                                      <Pencil className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/blog/${post.slug}`} target="_blank">
                                      <Eye className="mr-2 h-4 w-4" />
                                      View
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="bg-napowa-red focus:bg-napowa-red/80"
                                    onClick={() => handleDeletePost(post.id)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="published" className="mt-4">
                {/* Similar structure as above but filtered for published posts */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts
                      .filter((post) => post.status === "published")
                      .map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="relative h-48 w-full">
                                <Image
                                  src={post.featuredImage || "/placeholder.svg"}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute right-2 top-2">
                                  <Badge variant="default" className="bg-napowa-blue">Published</Badge>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="line-clamp-1 text-lg font-semibold">{post.title}</h3>
                                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {formatDate(post.publishedAt)}
                                  <span className="mx-2">•</span>
                                  <Eye className="mr-1 h-3 w-3" />
                                  {post.views} views
                                </div>
                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                  {post.excerpt}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-1">
                                  {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex border-t p-2">
                                <Button variant="ghost" size="sm" className="flex-1" asChild>
                                  <Link href={`/dashboard/blog/${post.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="flex-1 bg-napowa-red hover:bg-napowa-red/80"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead className="hidden md:table-cell">Author</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Published</TableHead>
                          <TableHead className="hidden md:table-cell">Views</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts
                          .filter((post) => post.status === "published")
                          .map((post) => (
                            <TableRow key={post.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="relative h-10 w-10 overflow-hidden rounded">
                                    <Image
                                      src={post.featuredImage || "/placeholder.svg"}
                                      alt={post.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{post.title}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1 md:hidden">{post.author}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{post.category}</TableCell>
                              <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                              <TableCell>
                                <Badge variant="default" className="bg-napowa-blue">Published</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{formatDate(post.publishedAt)}</TableCell>
                              <TableCell className="hidden md:table-cell">{post.views}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/dashboard/blog/${post.id}`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                      <Link href={`/blog/${post.slug}`} target="_blank">
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="bg-napowa-red focus:bg-napowa-red/80"
                                      onClick={() => handleDeletePost(post.id)}
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="draft" className="mt-4">
                {/* Similar structure as above but filtered for draft posts */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts
                      .filter((post) => post.status === "draft")
                      .map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="relative h-48 w-full">
                                <Image
                                  src={post.featuredImage || "/placeholder.svg"}
                                  alt={post.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute right-2 top-2">
                                  <Badge variant="secondary">Draft</Badge>
                                </div>
                              </div>
                              <div className="p-4">
                                <h3 className="line-clamp-1 text-lg font-semibold">{post.title}</h3>
                                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {formatDate(post.publishedAt)}
                                </div>
                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                  {post.excerpt}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-1">
                                  {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex border-t p-2">
                                <Button variant="ghost" size="sm" className="flex-1" asChild>
                                  <Link href={`/dashboard/blog/${post.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="flex-1 bg-napowa-red hover:bg-napowa-red/80"
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead className="hidden md:table-cell">Author</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Created</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPosts
                          .filter((post) => post.status === "draft")
                          .map((post) => (
                            <TableRow key={post.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="relative h-10 w-10 overflow-hidden rounded">
                                    <Image
                                      src={post.featuredImage || "/placeholder.svg"}
                                      alt={post.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-medium">{post.title}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1 md:hidden">{post.author}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{post.category}</TableCell>
                              <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">Draft</Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{formatDate(post.createdAt)}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/dashboard/blog/${post.id}`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="bg-napowa-red focus:bg-napowa-red/80"
                                      onClick={() => handleDeletePost(post.id)}
                                    >
                                      <Trash className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
