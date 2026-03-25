"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useBlogs } from "@/hooks/use-blogs"
import { BlogsTable } from "@/components/dashboard/blogs/blogs-table"
import { CreateBlogDialog } from "@/components/dashboard/blogs/create-blog-dialog"

export default function BlogsPage() {
  const [page, setPage] = useState(1)
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const { toast } = useToast()

  const { blogs, pagination, isLoading, mutate } = useBlogs(undefined, undefined, page)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">Manage blog articles and content</p>
        </div>
        <Button onClick={() => setOpenCreateDialog(true)}>Create Blog</Button>
      </div>

      <BlogsTable
        blogs={blogs}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onRefresh={() => mutate()}
      />

      <CreateBlogDialog
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
        onSuccess={() => {
          mutate()
          setOpenCreateDialog(false)
          toast({
            title: "Success",
            description: "Blog created successfully",
          })
        }}
      />
    </div>
  )
}
