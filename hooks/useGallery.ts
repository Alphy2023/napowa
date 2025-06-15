// src/hooks/use-gallery.ts
import { galleryApi } from '@/lib/api';
import { ApiResponse } from '@/lib/api/client';
import { GalleryItemResponse } from '@/types/gallery';
import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast"

// Re-defining CloudinaryImageData and gallerySubmissionSchema for frontend consistency
// In a real application, you might export these from a shared types file.
interface CloudinaryImageData {
    url: string;
    public_id: string;
    asset_id: string;
    version: number;
    format: string;
    width: number;
    height: number;
    bytes: number;
    original_filename: string;
}

const gallerySubmissionSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    album: z.string().min(1),
    tags: z.string().optional(),
    isFeatured: z.boolean().default(false),
    country: z.string().min(1),
    county: z.string().min(1),
    yearTaken: z.number().int(),
    media: z.array(z.object({
        url: z.string().url(),
        public_id: z.string().min(1),
        asset_id: z.string().min(1),
        version: z.number().int(),
        format: z.string().min(1),
        width: z.number().int(),
        height: z.number().int(),
        bytes: z.number().int(),
        original_filename: z.string().min(1),
    })).min(1),
});

// Type for a single gallery entry
export type GalleryEntry = z.infer<typeof gallerySubmissionSchema>;

// Type for the categories returned by the API
interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  mediaCount: number;
}

// Type for the entire API response data
interface GalleryApiResponseData {
  galleryEntries: GalleryEntry[];
  categories: GalleryCategory[];
  total: number;
  page: number;
  limit: number;
}

interface UseGalleryOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
// interface Extension{
//   isSingle
// }

export const useGallery = (options?: UseGalleryOptions,isSingle?:boolean) => {
  const [data, setData] = useState<GalleryApiResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const {toast} = useToast()

  const fetchGallery = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options?.page) params.append('page', options.page.toString());
      if (options?.limit) params.append('limit', options.limit.toString());
      if (options?.search) params.append('search', options.search);
      if (options?.category) params.append('category', options.category);
      if (options?.type) params.append('type', options.type);
      if (options?.sortBy) params.append('sortBy', options.sortBy);
      if (options?.sortOrder) params.append('sortOrder', options.sortOrder);

      const queryString = params.toString();
      const url = `/api/gallery${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      if (jsonResponse.success) {
        setData(jsonResponse.data);
      } else {
        setError(jsonResponse.message || 'Failed to fetch gallery data');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [options]);

  const getGalleryById = useCallback(async (mediaId:string) => {
    setLoading(true);
    setError(null);
     try {
         setLoading(true)
         setError(null)
   
        const result: ApiResponse<GalleryItemResponse> = await galleryApi.getGalleryById(mediaId)
    
        if (result.success && result.data) {
          return result.data
        } else {
          setError(result.message)
        }
      } catch (err) {
        setError("Network error occurred.")
        console.error("Failed to fetch media data:", err)
      } finally {
        setLoading(false)
      }
  }, [options]);

    const shareGallery = ({title,album}:{title:string,album:string}) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `View our gallery on ${album} at Napowa`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this link with others.",
      })
    }
  }

  useEffect(() => {
    if(!isSingle){
      fetchGallery();
    }
  }, [fetchGallery]);
  

   const refetch = () => {
    fetchGallery()
  }
  return { data, loading, error, refetch, getGalleryById,shareGallery};
};

