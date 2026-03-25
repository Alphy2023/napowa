"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProgram } from "@/hooks/use-programs"
import { useToast } from "@/hooks/use-toast"
import type { ProgramCategory } from "@prisma/client"

interface CreateProgramDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: ProgramCategory[]
  onSuccess?: () => void
}

export function CreateProgramDialog({
  open,
  onOpenChange,
  categories,
  onSuccess,
}: CreateProgramDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    shortDescription: "",
    content: "",
    deliveryMode: "hybrid",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createProgram({
        ...formData,
        createdById: "temp-user-id", // Should come from session
      })
      onSuccess?.()
      setFormData({
        title: "",
        categoryId: "",
        shortDescription: "",
        content: "",
        deliveryMode: "hybrid",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create program",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Program</DialogTitle>
          <DialogDescription>Add a new training program or course</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Program Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select value={formData.categoryId} onValueChange={(v) => setFormData({ ...formData, categoryId: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
          />
          <Textarea
            placeholder="Full Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={5}
          />
          <Select value={formData.deliveryMode} onValueChange={(v) => setFormData({ ...formData, deliveryMode: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Delivery Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Program"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
