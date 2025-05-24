"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { PageTitle } from "./page-title"

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

export function GalleryPreview() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 container">
      <div className="">
        <PageTitle
        title="Gallery"
        description={`A glimpse into our community outreach and
             empowerment activities across Kenya.`}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-lg"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button className="h-64 w-full overflow-hidden rounded-lg" onClick={() => setSelectedImage(index)}>
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm">{image.caption}</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 sm:max-w-4xl">
                  <div className="relative aspect-video w-full">
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain" />
                  </div>
                  <div className="p-4">
                    <p className="text-center">{image.caption}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant={"transparent"}>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
