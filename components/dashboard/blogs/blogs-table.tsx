"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash } from "lucide-react"
import { deleteBlog } from "@/hooks/use-blogs"
import { useToast } from "@/hooks/use-toast"
import type { Blog } from "@prisma/client"

interface BlogsTableProps {
  blogs: Blog[]
  isLoading: boolean
  pagination?: any
  onPageChange?: (page: number) => void
  onRefresh?: () => void
}

export function BlogsTable({
  blogs,
  isLoading,
  pagination,
  onPageChange,
  onRefresh,
}: BlogsTableProps) {
  const { toast } = useToast()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return
    try {
      await deleteBlog(id)
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      })
      onRefresh?.()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading blogs...</div>
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No blogs found
              </TableCell>
            </TableRow>
          ) : (
            blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>{blog.category || "Uncategorized"}</TableCell>
                <TableCell>{blog.views}</TableCell>
                <TableCell>
                  {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Not published"}
                </TableCell>
                <TableCell>
                  <Badge variant={blog.published ? "default" : "secondary"}>
                    {blog.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
