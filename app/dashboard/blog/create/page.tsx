"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, X, Plus, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Categories for the dropdown
const categories = [
  "Widows Support",
  "Skills Development",
  "Health",
  "Events",
  "Success Stories",
  "Crisis Support",
  "Woman of Purpose",
  "Financial Literacy",
]

export default function CreateBlogPost() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("content")
  const [isSaving, setIsSaving] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [post, setPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Jane Muthoni", // Default author
    status: "draft",
    publishedAt: null,
    featuredImage: "/placeholder.svg?height=400&width=600", // Default image
    metaTitle: "",
    metaDescription: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Auto-generate slug from title
    if (name === "title" && !post.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setPost((prev) => ({ ...prev, slug, [name]: value }))
    } else {
      setPost((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name === "status") {
      const status = checked ? "published" : "draft"
      const publishedAt = checked ? new Date().toISOString() : null
      setPost((prev) => ({ ...prev, status, publishedAt }))
    } else {
      setPost((prev) => ({ ...prev, [name]: checked }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    // Validate required fields
    if (!post.title || !post.content || !post.category) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields: title, content, and category.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Create a new post object with all data
    const newPost = {
      ...post,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    }

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Blog post created",
        description: "Your blog post has been created successfully.",
      })
      router.push("/dashboard/blog")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/blog">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{post.title || "Create New Blog Post"}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={post.excerpt}
                    onChange={handleChange}
                    placeholder="Brief summary of the post"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">
                    Content <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    placeholder="Write your blog post content here..."
                    rows={20}
                    className="font-mono"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  <div className="relative h-[200px] w-full overflow-hidden rounded-md border">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage || "/placeholder.svg"}
                        alt="Featured image"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <p className="text-muted-foreground">No image selected</p>
                      </div>
                    )}
                    <Button variant="secondary" size="sm" className="absolute bottom-2 right-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" name="slug" value={post.slug} onChange={handleChange} placeholder="post-url-slug" />
                  <p className="text-xs text-muted-foreground">
                    The URL-friendly version of the title. Automatically generated from the title if left blank.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={post.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={post.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full p-0 hover:bg-destructive/20"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add tag</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="status" className="flex items-center gap-2">
                    Published
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </Label>
                  <Switch
                    id="status"
                    checked={post.status === "published"}
                    onCheckedChange={(checked) => handleSwitchChange("status", checked)}
                  />
                </div>

                {post.status === "published" && (
                  <div className="space-y-2">
                    <Label htmlFor="publishedAt">Publish Date</Label>
                    <Input
                      id="publishedAt"
                      name="publishedAt"
                      type="datetime-local"
                      value={post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ""}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 pt-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={post.metaTitle || post.title}
                    onChange={handleChange}
                    placeholder="SEO title (defaults to post title)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={post.metaDescription || post.excerpt}
                    onChange={handleChange}
                    placeholder="SEO description (defaults to post excerpt)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Social Media Preview</Label>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="relative h-[200px] w-full overflow-hidden rounded-md">
                          <Image
                            src={post.featuredImage || "/placeholder.svg"}
                            alt="Social media preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold">{post.metaTitle || post.title || "Post Title"}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.metaDescription || post.excerpt || "Post description will appear here."}
                        </p>
                        <p className="text-xs text-muted-foreground">NAPOWA.org</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
