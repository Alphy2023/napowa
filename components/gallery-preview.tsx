"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PageTitle } from "./page-title"
import { useGallery } from "@/hooks/useGallery"
import { GalleryItemResponse, MediaFilters } from "@/types/gallery"
import { PaginationParams } from "@/types/filters"
import GalleryPreviewLoading from "./gallery-preview-skeleton"
import { Badge } from "./ui/badge"
import { useRouter } from "next/navigation"

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "NAPOWA community outreach",
    caption: "Community outreach program in Nairobi",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Skills training workshop",
    caption: "Skills training workshop for police wives",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Woman of Purpose event",
    caption: "Annual Woman of Purpose empowerment event",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Widows support group",
    caption: "Support group meeting for police widows",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Donation drive",
    caption: "Donation drive for vulnerable families",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Health advocacy program",
    caption: "Health advocacy program for police families",
  },
]


interface PreviewCardItemProps{
  entryItem:GalleryItemResponse,
  index:number,
  handlePreview:(id:string)=>void;
}
export function GalleryPreview() {
  const [filters, setFilters] = useState<MediaFilters>({
      search: "",
      category: "all",
      sortBy: "createdAt",
      sortOrder: "desc",
    })
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 6,
  })
   const galleryOptions = useMemo(() => ({
      ...filters,
      ...pagination,
    }), [filters, pagination]);
  const {data,refetch,error,loading} = useGallery(galleryOptions)
  
  const router = useRouter()

  const handlePreview = (id:string) => {
    return router.push(`/gallery/${id}`)
  }

  if(loading){
    return <GalleryPreviewLoading/>
  }

  return (
    <>
    {data && data?.galleryEntries ? (
    <section className="py-16 md:py-24 container">
      <div className="">
        <PageTitle
        title="Gallery"
        description={`A glimpse into our community outreach and
             empowerment activities across Kenya.`}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data?.galleryEntries.slice(0, 6).map((entryItem, index) => (
          <PreviewCardItem
            entryItem={entryItem}
            index={index}
            key={index}
            handlePreview={handlePreview}
          />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant={"transparent"}>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
    ) : null}
    </>
  )
}

function PreviewCardItem({entryItem,index,handlePreview}:PreviewCardItemProps){
   const additionalMediaCount = (entryItem?.media?.length || 0) > 1 ?
   (entryItem.media.length - 1) : 0;
  return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        className="group relative overflow-hidden rounded-lg"
      >
        <button className="h-64 w-full overflow-hidden rounded-lg"
        onClick={() => handlePreview(entryItem?.id)}
        >
              <Image
                src={entryItem?.media[0]?.url || "/placeholder.svg"}
                alt={entryItem?.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm">{entryItem?.title}</p>
              </div>
               <div className="absolute top-2 right-2 flex space-x-1"> 
                        
                {additionalMediaCount > 0 && (
                  <div className="bg-black/30 rounded-lg">
                    <Badge variant="outline" className="text-white">
                      {additionalMediaCount}+ more
                    </Badge>
                    </div>
                )}
              </div>
        </button>
      </motion.div>
  )
}