"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { isVideoFormat } from "@/lib/utils"
import { GalleryItemResponse } from "@/types/gallery"
import { Edit, Eye, ImageIcon, MoreHorizontal,
   Play, Trash2, Video } from "lucide-react"


interface MediaCardProps{
  galleryEntry: GalleryItemResponse 
  onDelete: (media: GalleryItemResponse ) => void
  onEdit: (mediaId: string ) => void
  onPreview: (mediaId:string ) => void
  canManage?:boolean;
}


export const MediaCard =({
  galleryEntry,
  onDelete,
  onEdit,
  onPreview,
  canManage=false
}:MediaCardProps)=> {
  const fileType = isVideoFormat(galleryEntry?.media[0]?.format) ? "video" : "image"; // Determine type from format
  const additionalMediaCount = (galleryEntry?.media?.length || 0) > 1 ?
   (galleryEntry.media.length - 1) : 0;

  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative group">
          {fileType === "image" ? ( // Use fileType here
            <img
              src={(galleryEntry?.media && galleryEntry?.media?.length > 0
                && galleryEntry?.media[0]?.url) || "/placeholder.svg"}
              alt={galleryEntry.title}
              className="h-full w-full rounded-md object-cover"
              onClick={() => onPreview(galleryEntry.id)}
            />
          ) : (
            <div className="h-48 w-full bg-black relative cursor-pointer" 
            onClick={() => onPreview(galleryEntry.id)}>
              <img
                src={galleryEntry?.media[0]?.url || "/placeholder.svg?height=200&width=400"}
                alt={galleryEntry.title}
                className="h-full w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center
               justify-center">
                <Play className="h-12 w-12 text-white opacity-80" />
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 flex space-x-1"> 
            <Badge variant={fileType === "image" ? "default" : "secondary"}>
              {fileType === "image" ? <ImageIcon className="mr-1 h-3 w-3" /> 
              : <Video className="mr-1 h-3 w-3" />} 
              {fileType.charAt(0).toUpperCase() + fileType.slice(1)} 
            </Badge>
            {additionalMediaCount > 0 && (
              <div className="bg-black/30 rounded-lg">
                <Badge variant="outline" className="text-white">
                  {additionalMediaCount}+ more
                </Badge>
                </div>
            )}
          </div>
          <div className="absolute inset-0
           bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="mr-2"
              onClick={(e) => {
                e.stopPropagation()
                onPreview(galleryEntry.id)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            {canManage && (
              <>
              <Button
                variant="secondary"
                size="sm"
                className="mr-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(galleryEntry.id)
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(galleryEntry)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium line-clamp-1">{galleryEntry.title}</h3>
             <div className="flex flex-wrap justify-center
              gap-2 text-sm line-clamp-1 text-muted-foreground">
                <span>{galleryEntry.album}</span>
                <span>•</span>
                <span>{galleryEntry.county}</span>
                <span>•</span>
                <span>{galleryEntry.yearTaken}</span>
              </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onPreview(galleryEntry.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              {canManage && (
                <>
                
                <DropdownMenuItem onClick={() => onEdit(galleryEntry.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(galleryEntry)} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}