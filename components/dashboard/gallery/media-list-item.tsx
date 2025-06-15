"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { isVideoFormat } from "@/lib/utils"
import { GalleryItemResponse } from "@/types/gallery"
import { Edit, Eye, ImageIcon,
   Play, Trash2, Video } from "lucide-react"


interface MediaCardProps{
  galleryEntry: GalleryItemResponse 
  onDelete: (media: GalleryItemResponse ) => void
  onEdit: (mediaId: string ) => void
  onPreview: (mediaId:string ) => void
  canManage?:boolean
}

export const MediaListItem =({
  galleryEntry,
  onDelete,
  onEdit,
  onPreview,
  canManage=false
}: MediaCardProps)=> {
  const fileType = isVideoFormat(galleryEntry?.media[0]?.format) ? "video" : "image"; // Determine type from format
  const additionalMediaCount = (galleryEntry?.media?.length || 0) > 1
   ? (galleryEntry?.media.length - 1) : 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-col sm:flex-row">
          <div className="flex items-center space-x-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              {fileType === "image" ? ( 
                <img
                  src={(galleryEntry?.media && galleryEntry?.media?.length > 0
                    && galleryEntry?.media[0]?.url) || "/placeholder.svg"}
                  alt={galleryEntry.title}
                  className="h-full w-full rounded-md object-cover"
                  onClick={() => onPreview(galleryEntry.id)}
                />
              ) : (
                <div
                  className="h-full w-full bg-black rounded-md relative cursor-pointer"
                  onClick={() => onPreview(galleryEntry.id)}
                >
                  <img
                    src={galleryEntry?.media[0]?.url || "/placeholder.svg?height=64&width=64"}
                    alt={galleryEntry.title}
                    className="h-full w-full rounded-md object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white opacity-80" />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{galleryEntry.title}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {galleryEntry.album}
                </Badge>
                <Badge variant={fileType === "image" 
                  ? "default" : "secondary"} className="text-xs"> 
                 
                  {fileType === "image" ? <ImageIcon 
                  className="mr-1 h-3 w-3" /> 
                  : <Video className="mr-1 h-3 w-3" />}
                  
                  {fileType.charAt(0).toUpperCase() + fileType.slice(1)} 
                  
                </Badge>
                {additionalMediaCount > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {additionalMediaCount}+ more
                  </Badge>
                )}
              </div>
              {galleryEntry.description && <p className="text-sm 
              text-muted-foreground line-clamp-1">
                {galleryEntry.description}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm"
             onClick={() => onPreview(galleryEntry.id)}>
              <Eye className="h-4 w-4" />
            </Button>
            {
              canManage && (
                <>
                <Button variant="outline" size="sm" onClick={() => onEdit(galleryEntry.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(galleryEntry)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                </>
              )
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )
}