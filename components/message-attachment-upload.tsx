"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Paperclip, X, File, ImageIcon, FileText, Film } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MessageAttachmentUploadProps {
  onAttach: (files: File[]) => void
  attachments: File[]
  onRemove: (index: number) => void
}

export default function MessageAttachmentUpload({ onAttach, attachments, onRemove }: MessageAttachmentUploadProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      // Check file size (limit to 10MB per file)
      const oversizedFiles = newFiles.filter((file) => file.size > 10 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        toast({
          title: "File too large",
          description: "Files must be less than 10MB",
          variant: "destructive",
        })
        return
      }

      // Simulate upload progress
      newFiles.forEach((file) => {
        simulateUploadProgress(file.name)
      })

      onAttach(newFiles)
    }
  }

  const simulateUploadProgress = (fileName: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
      }
      setUploadProgress((prev) => ({
        ...prev,
        [fileName]: progress,
      }))
    }, 200)
  }

  const getFileIcon = (file: File) => {
    const fileType = file.type.split("/")[0]
    switch (fileType) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "video":
        return <Film className="h-5 w-5 text-purple-500" />
      case "application":
        if (file.type.includes("pdf")) {
          return <FileText className="h-5 w-5 text-red-500" />
        }
        return <File className="h-5 w-5 text-orange-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const getFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative h-20 w-20 overflow-hidden rounded border">
          <img
            src={URL.createObjectURL(file) || "/placeholder.svg"}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-2">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />

      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
        <Paperclip className="h-4 w-4" />
        Attach Files
      </Button>

      {attachments.length > 0 && (
        <div className="mt-2 space-y-2">
          {attachments.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center gap-2 rounded-md border p-2">
              {getFilePreview(file) || (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">{getFileIcon(file)}</div>
              )}
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                {uploadProgress[file.name] !== undefined && uploadProgress[file.name] < 100 && (
                  <Progress value={uploadProgress[file.name]} className="h-1 w-full" />
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemove(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
