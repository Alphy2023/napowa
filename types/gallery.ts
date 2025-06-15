import { GallerySubmissionPayload } from "@/schemas/gallery.schema"


export interface MediaItem {
  asset_id:string 
  bytes:number
  format:string
  height:number
  original_filename:string
  public_id:string
  url:string
  version:number
  width:number
}

export interface MediaFilters {
  search: string
  category: string
  // type: MediaType | "all"
  sortBy: "title" | "createdAt" | "category"
  sortOrder: "asc" | "desc"
}
export interface GalleryItemResponse{
    album:string
    country:string
    county:string
    createdAt:string
    description:string
    id:string
    isFeatured:boolean
    media:MediaItem[]
    tags:string
    title:string
    updatedAt:string 
    yearTaken:number
}
export interface GalleryListResponse {
  galleryEntries: GalleryItemResponse[]; 
  categories: {
    id: string;
    name: string;
    slug: string;
    mediaCount: number;
  }[];
  total: number;
  page: number;
  limit: number;
}   