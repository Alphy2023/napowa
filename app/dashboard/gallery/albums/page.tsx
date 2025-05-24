"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FolderPlus, MoreHorizontal, Pencil, Trash, ImageIcon, Plus } from 'lucide-react'

// Sample albums data
const albums = [
  {
    id: "1",
    name: "Events",
    description: "Photos from various NAPOWA events and gatherings.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 24,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-10T14:20:00Z",
  },
  {
    id: "2",
    name: "Workshops",
    description: "Photos from skills development workshops and training sessions.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 18,
    createdAt: "2023-02-20T09:45:00Z",
    updatedAt: "2023-04-25T11:30:00Z",
  },
  {
    id: "3",
    name: "Health",
    description: "Photos from health awareness campaigns and medical outreach programs.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 12,
    createdAt: "2023-03-10T14:20:00Z",
    updatedAt: "2023-05-05T16:15:00Z",
  },
  {
    id: "4",
    name: "Seminars",
    description: "Photos from educational seminars and conferences.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 15,
    createdAt: "2023-04-05T11:30:00Z",
    updatedAt: "2023-05-12T13:45:00Z",
  },
  {
    id: "5",
    name: "Support Groups",
    description: "Photos from support group meetings and counseling sessions.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 9,
    createdAt: "2023-02-15T13:15:00Z",
    updatedAt: "2023-04-20T10:30:00Z",
  },
  {
    id: "6",
    name: "Children",
    description: "Photos from children's events and activities.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 21,
    createdAt: "2023-03-25T10:00:00Z",
    updatedAt: "2023-05-15T15:20:00Z",
  },
  {
    id: "7",
    name: "Meetings",
    description: "Photos from board meetings and administrative gatherings.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 8,
    createdAt: "2023-01-30T09:30:00Z",
    updatedAt: "2023-04-10T14:45:00Z",
  },
  {
    id: "8",
    name: "Outreach",
    description: "Photos from community outreach programs and charitable activities.",
    coverImage: "/placeholder.svg?height=400&width=600",
    imageCount: 16,
    createdAt: "2023-02-28T11:45:00Z",
    updatedAt: "2023-05-08T12:30:00Z",
  },
]

export default function GalleryAlbumsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newAlbumName, setNewAlbumName] = useState("")
  const [newAlbumDescription, setNewAlbumDescription] = useState("")
  const [editingAlbum, setEditingAlbum] = useState<typeof albums[0] | null>(null)

  // Filter albums based on search term
  const filteredAlbums = albums.filter((album) =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateAlbum = () => {
    if (!newAlbumName.trim()) {
      toast({
        title: "Album name required",
        description: "Please enter a name for the album.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Album created",
      description: `Album "${newAlbumName}" has been created successfully.`,
    })

    setNewAlbumName("")
    setNewAlbumDescription("")
    setIsCreateDialogOpen(false)
  }

  const handleEditAlbum = () => {
    if (!editingAlbum || !editingAlbum.name.trim()) {
      toast({
        title: "Album name required",
        description: "Please enter a name for the album.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Album updated",
      description: `Album "${editingAlbum.name}" has been updated successfully.`,
    })

    setEditingAlbum(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteAlbum = (id: string, name: string) => {
    toast({
      title: "Album deleted",
      description: `Album "${name}" has been deleted successfully.`,
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
          <h2 className="text-3xl font-bold tracking-tight">Albums</h2>
          <p className="text-muted-foreground">
            Manage photo albums and collections.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-napowa-blue hover:bg-napowa-blue/80 text-white">
                <FolderPlus className="mr-2 h-4 w-4" />
                Create Album
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Album</DialogTitle>
                <DialogDescription>
                  Create a new album to organize your gallery images.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="album-name">Album Name</Label>
                  <Input
                    id="album-name"
                    placeholder="Enter album name"
                    value={newAlbumName}
                    onChange={(e) => setNewAlbumName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="album-description">Description</Label>
                  <Textarea
                    id="album-description"
                    placeholder="Enter album description"
                    value={newAlbumDescription}
                    onChange={(e) => setNewAlbumDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-napowa-blue hover:bg-napowa-blue/80 text-white" onClick={handleCreateAlbum}>
                  Create Album
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Photo Albums</CardTitle>
          <CardDescription>
            View and manage all photo albums.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAlbums.map((album, index) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={album.coverImage || "/placeholder.svg"}
                          alt={album.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-lg font-semibold text-white">{album.name}</h3>
                          <p className="text-sm text-white/80">{album.imageCount} images</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {album.description}
                        </p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Last updated: {formatDate(album.updatedAt)}
                        </p>
                      </div>
                      <div className="flex border-t p-2">
                        <Button variant="ghost" size="sm" className="flex-1" asChild>
                          <Link href={`/dashboard/gallery?album=${album.id}`}>
                            <ImageIcon className="mr-2 h-4 w-4" />
                            View Images
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setEditingAlbum(album)
                              setIsEditDialogOpen(true)
                            }}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Album
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href="/dashboard/gallery/upload">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Images
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="bg-napowa-red focus:bg-napowa-red/80"
                              onClick={() => handleDeleteAlbum(album.id, album.name)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Album
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Album Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Album</DialogTitle>
            <DialogDescription>
              Update the album details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-album-name">Album Name</Label>
              <Input
                id="edit-album-name"
                placeholder="Enter album name"
                value={editingAlbum?.name || ""}
                onChange={(e) => setEditingAlbum(prev => prev ? { ...prev, name: e.target.value } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-album-description">Description</Label>
              <Textarea
                id="edit-album-description"
                placeholder="Enter album description"
                value={editingAlbum?.description || ""}
                onChange={(e) => setEditingAlbum(prev => prev ? { ...prev, description: e.target.value } : null)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-napowa-blue hover:bg-napowa-blue/80 text-white" onClick={handleEditAlbum}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
