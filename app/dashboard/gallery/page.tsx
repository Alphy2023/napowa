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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MoreHorizontal,
  Filter,
  Grid,
  List,
  Upload,
  Trash,
  Edit,
  Eye,
  Plus,
  Download,
  FolderPlus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample gallery data
const galleryItems = [
  {
    id: "1",
    title: "Annual General Meeting 2023",
    description: "Photos from our Annual General Meeting held in Nairobi.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Events",
    tags: ["meeting", "members", "nairobi"],
    uploadedBy: "Jane Muthoni",
    uploadDate: "2023-04-15T10:30:00Z",
    featured: true,
  },
  {
    id: "2",
    title: "Skills Development Workshop",
    description: "Participants learning soap making skills at our workshop.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Workshops",
    tags: ["workshop", "skills", "training"],
    uploadedBy: "Mary Akinyi",
    uploadDate: "2023-03-22T09:45:00Z",
    featured: false,
  },
  {
    id: "3",
    title: "Health Screening Day",
    description: "Free health screenings provided to police families.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Health",
    tags: ["health", "screening", "community"],
    uploadedBy: "Sarah Wanjiku",
    uploadDate: "2023-02-28T14:20:00Z",
    featured: true,
  },
  {
    id: "4",
    title: "Financial Literacy Seminar",
    description: "Teaching essential financial skills to our members.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Seminars",
    tags: ["finance", "education", "seminar"],
    uploadedBy: "Grace Otieno",
    uploadDate: "2023-05-05T09:30:00Z",
    featured: false,
  },
  {
    id: "5",
    title: "Widows Support Group Meeting",
    description: "Monthly support group for police widows.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Support Groups",
    tags: ["widows", "support", "meeting"],
    uploadedBy: "Faith Kamau",
    uploadDate: "2023-01-18T08:00:00Z",
    featured: false,
  },
  {
    id: "6",
    title: "Children's Day Celebration",
    description: "Fun activities for children of police officers.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Children",
    tags: ["children", "celebration", "fun"],
    uploadedBy: "Hope Njeri",
    uploadDate: "2023-05-08T13:10:00Z",
    featured: true,
  },
  {
    id: "7",
    title: "Board Meeting",
    description: "Quarterly board meeting of NAPOWA leadership.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Meetings",
    tags: ["board", "leadership", "planning"],
    uploadedBy: "Charity Odhiambo",
    uploadDate: "2023-04-20T10:00:00Z",
    featured: false,
  },
  {
    id: "8",
    title: "Community Outreach",
    description: "Distributing supplies to families in need.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    album: "Outreach",
    tags: ["community", "outreach", "charity"],
    uploadedBy: "Mercy Nyambura",
    uploadDate: "2023-03-15T11:30:00Z",
    featured: true,
  },
]

export default function GalleryPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [albumFilter, setAlbumFilter] = useState("all")
  const [featuredFilter, setFeaturedFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter gallery items based on search term and filters
  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesAlbum = albumFilter === "all" || item.album === albumFilter
    const matchesFeatured =
      featuredFilter === "all" ||
      (featuredFilter === "featured" && item.featured) ||
      (featuredFilter === "regular" && !item.featured)

    return matchesSearch && matchesAlbum && matchesFeatured
  })

  const handleDeleteItem = (id: string) => {
    toast({
      title: "Image deleted",
      description: "The image has been deleted successfully.",
    })
  }

  const handleToggleFeatured = (id: string, featured: boolean) => {
    toast({
      title: featured ? "Removed from featured" : "Added to featured",
      description: `The image has been ${featured ? "removed from" : "added to"} featured images.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gallery</h2>
          <p className="text-muted-foreground">Manage images and photo albums.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/gallery/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Images
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/gallery/albums">
              <FolderPlus className="mr-2 h-4 w-4" />
              Manage Albums
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>View and manage all images in the gallery.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
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
                          <p className="text-sm font-medium">Album</p>
                          <Select value={albumFilter} onValueChange={setAlbumFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select album" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Albums</SelectItem>
                              <SelectItem value="Events">Events</SelectItem>
                              <SelectItem value="Workshops">Workshops</SelectItem>
                              <SelectItem value="Health">Health</SelectItem>
                              <SelectItem value="Seminars">Seminars</SelectItem>
                              <SelectItem value="Support Groups">Support Groups</SelectItem>
                              <SelectItem value="Children">Children</SelectItem>
                              <SelectItem value="Meetings">Meetings</SelectItem>
                              <SelectItem value="Outreach">Outreach</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Featured Status</p>
                          <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Images</SelectItem>
                              <SelectItem value="featured">Featured Only</SelectItem>
                              <SelectItem value="regular">Regular Only</SelectItem>
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
              <TabsList>
                <TabsTrigger value="all">All Images</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative h-48 w-full">
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute right-2 top-2">
                                {item.featured && (
                                  <Badge variant="default" className="bg-primary">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="line-clamp-1 text-lg font-semibold">{item.title}</h3>
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                <Badge variant="outline">{item.album}</Badge>
                                <span className="ml-2">{formatDate(item.uploadDate)}</span>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-1">
                                {item.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex border-t p-2">
                              <Button variant="ghost" size="sm" className="flex-1" asChild>
                                <Link href={`/dashboard/gallery/${item.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex-1 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteItem(item.id)}
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
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left font-medium">Image</th>
                          <th className="px-4 py-3 text-left font-medium">Title</th>
                          <th className="px-4 py-3 text-left font-medium">Album</th>
                          <th className="px-4 py-3 text-left font-medium">Uploaded By</th>
                          <th className="px-4 py-3 text-left font-medium">Date</th>
                          <th className="px-4 py-3 text-left font-medium">Featured</th>
                          <th className="px-4 py-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="px-4 py-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded">
                                <Image
                                  src={item.imageUrl || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">{item.album}</td>
                            <td className="px-4 py-3">{item.uploadedBy}</td>
                            <td className="px-4 py-3">{formatDate(item.uploadDate)}</td>
                            <td className="px-4 py-3">
                              {item.featured ? (
                                <Badge variant="default" className="bg-primary">
                                  Featured
                                </Badge>
                              ) : (
                                <Badge variant="outline">Regular</Badge>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/gallery/${item.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/gallery/${item.id}/edit`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleToggleFeatured(item.id, item.featured)}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    {item.featured ? "Remove from Featured" : "Add to Featured"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <a href={item.imageUrl} download>
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </a>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteItem(item.id)}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
              {/* Other tab contents would follow a similar structure */}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
