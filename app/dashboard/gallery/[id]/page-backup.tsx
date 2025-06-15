"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Download, Edit, Heart, Share2, Trash } from 'lucide-react'

// Sample gallery item data
const galleryItem = {
  id: "1",
  title: "Annual General Meeting 2023",
  description: "Photos from our Annual General Meeting held in Nairobi. The event brought together police wives from across the country to discuss important issues and plan for the future.",
  imageUrl: "/placeholder.svg?height=800&width=1200",
  album: "Events",
  tags: ["meeting", "members", "nairobi"],
  uploadedBy: "Jane Muthoni",
  uploadDate: "2023-04-15T10:30:00Z",
  featured: true,
  dimensions: "1920x1080",
  size: "2.4 MB",
  format: "JPEG",
  views: 245,
  downloads: 32,
  likes: 18,
  relatedImages: [
    {
      id: "2",
      title: "AGM 2023 - Group Photo",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "3",
      title: "AGM 2023 - Panel Discussion",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "4",
      title: "AGM 2023 - Award Ceremony",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
  ]
}

export default function GalleryItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isFeatured, setIsFeatured] = useState(galleryItem.featured)
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(galleryItem.title)
  const [description, setDescription] = useState(galleryItem.description)
  const [album, setAlbum] = useState(galleryItem.album)
  const [tags, setTags] = useState(galleryItem.tags.join(", "))

  const handleToggleFeatured = () => {
    setIsFeatured(!isFeatured)
    toast({
      title: isFeatured ? "Removed from featured" : "Added to featured",
      description: `The image has been ${isFeatured ? "removed from" : "added to"} featured images.`,
    })
  }

  const handleDelete = () => {
    toast({
      title: "Image deleted",
      description: "The image has been deleted successfully.",
    })
    router.push("/dashboard/gallery")
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "The image is being downloaded.",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`https://NAPOWA.org/gallery/${params.id}`)
    toast({
      title: "Link copied",
      description: "Image link has been copied to clipboard.",
    })
  }

  const handleSaveChanges = () => {
    setIsEditing(false)
    toast({
      title: "Changes saved",
      description: "The image details have been updated successfully.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Media Details</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <Button className="bg-napowa-blue hover:bg-napowa-blue/80 text-white" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          )}
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={galleryItem.imageUrl || "/placeholder.svg"}
                  alt={galleryItem.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Information</CardTitle>
              <CardDescription>Details about this image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Title</label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="album" className="text-sm font-medium">Album</label>
                    <Select value={album} onValueChange={setAlbum}>
                      <SelectTrigger id="album">
                        <SelectValue placeholder="Select album" />
                      </SelectTrigger>
                      <SelectContent>
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
                    <label htmlFor="tags" className="text-sm font-medium">Tags</label>
                    <Input
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Separate tags with commas"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={isFeatured}
                      onChange={handleToggleFeatured}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">Featured Image</label>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Album:</span>
                      <Badge variant="outline">{album}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Uploaded by:</span>
                      <span className="text-sm">{galleryItem.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Upload date:</span>
                      <span className="text-sm">{formatDate(galleryItem.uploadDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Featured:</span>
                      <span className="text-sm">{isFeatured ? "Yes" : "No"}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Dimensions:</span>
                      <span className="text-sm">{galleryItem.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Size:</span>
                      <span className="text-sm">{galleryItem.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Format:</span>
                      <span className="text-sm">{galleryItem.format}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Views:</span>
                      <span className="text-sm">{galleryItem.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Downloads:</span>
                      <span className="text-sm">{galleryItem.downloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Likes:</span>
                      <span className="text-sm">{galleryItem.likes}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <span className="text-sm font-medium">Tags:</span>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {galleryItem.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {!isEditing && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={handleToggleFeatured}>
                  <Heart className={`mr-2 h-4 w-4 ${isFeatured ? "fill-NAPOWA-red bg-napowa-red" : ""}`} />
                  {isFeatured ? "Remove from Featured" : "Add to Featured"}
                </Button>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Images</CardTitle>
              <CardDescription>Other images from the same album</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {galleryItem.relatedImages.map((image) => (
                  <Link key={image.id} href={`/dashboard/gallery/${image.id}`} className="block">
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                      <Image
                        src={image.imageUrl || "/placeholder.svg"}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
