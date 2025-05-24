"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import ScrollableTablist from "@/components/scrollable-tablist"
import { HeroContent } from "@/components/hero-content"

// Sample gallery data
const galleryImages = [
  {
    id: "1",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Skills training workshop",
    caption: "Women learning soap making during a skills training workshop in Nairobi",
    category: "Skills Development",
    year: "2023",
    location: "Nairobi",
  },
  {
    id: "2",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Woman of Purpose event",
    caption: "Participants at the annual Woman of Purpose empowerment event",
    category: "Woman of Purpose",
    year: "2023",
    location: "Nairobi",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Health advocacy workshop",
    caption: "Health advocacy workshop for police wives in Mombasa",
    category: "Health Advocacy",
    year: "2022",
    location: "Mombasa",
  },
  {
    id: "4",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Widows support group",
    caption: "Support group meeting for police widows in Kisumu",
    category: "Widows Support",
    year: "2022",
    location: "Kisumu",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Financial literacy training",
    caption: "Financial literacy training session for police wives in Nakuru",
    category: "Financial Literacy",
    year: "2023",
    location: "Nakuru",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Community outreach",
    caption: "Community outreach program in Eldoret",
    category: "Community Outreach",
    year: "2022",
    location: "Eldoret",
  },
  {
    id: "7",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Donation drive",
    caption: "Donation drive for vulnerable police families",
    category: "Crisis Support",
    year: "2023",
    location: "Nairobi",
  },
  {
    id: "8",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Tailoring class",
    caption: "Women learning tailoring skills in Mombasa",
    category: "Skills Development",
    year: "2022",
    location: "Mombasa",
  },
  {
    id: "9",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Graduation ceremony",
    caption: "Graduation ceremony for skills development program participants",
    category: "Skills Development",
    year: "2023",
    location: "Nairobi",
  },
  {
    id: "10",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Leadership workshop",
    caption: "Leadership workshop for NAPOWA members",
    category: "Woman of Purpose",
    year: "2022",
    location: "Kisumu",
  },
  {
    id: "11",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Beadwork training",
    caption: "Women learning beadwork and jewelry making",
    category: "Skills Development",
    year: "2023",
    location: "Nakuru",
  },
  {
    id: "12",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Health screening",
    caption: "Health screening event for police families",
    category: "Health Advocacy",
    year: "2022",
    location: "Eldoret",
  },
  {
    id: "13",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Entrepreneurship workshop",
    caption: "Entrepreneurship workshop for police wives",
    category: "Financial Literacy",
    year: "2023",
    location: "Nairobi",
  },
  {
    id: "14",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Children's program",
    caption: "Educational program for children of police officers",
    category: "Community Outreach",
    year: "2022",
    location: "Mombasa",
  },
  {
    id: "15",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Widows gathering",
    caption: "Support gathering for police widows",
    category: "Widows Support",
    year: "2023",
    location: "Kisumu",
  },
  {
    id: "16",
    src: "/placeholder.svg?height=600&width=800",
    alt: "Food processing training",
    caption: "Food processing and preservation training",
    category: "Skills Development",
    year: "2022",
    location: "Nakuru",
  },
]
type TabItem = {
  id:string;
  title:string;
}
const tablists: TabItem[] = [
  {
    id:"all",
    title:"All Photos"
  },
  {
    id:"skills",
    title:"Skills Development"
  },
  {
    id:"health",
    title:"Health Advocacy"
  },
  {
    id:"events",
    title:"Events"
  },
  {
    id:"community",
    title:"Community"
  },
]

export default function GalleryClientPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Filter gallery images based on search term and filters
  const filteredImages = galleryImages.filter((image) => {
    const matchesSearch =
      image.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || image.category === categoryFilter
    const matchesYear = yearFilter === "all" || image.year === yearFilter
    const matchesLocation = locationFilter === "all" || image.location === locationFilter

    return matchesSearch && matchesCategory && matchesYear && matchesLocation
  })

  // Get unique categories, years, and locations for filters
  const categories = Array.from(new Set(galleryImages.map((image) => image.category)))
  const years = Array.from(new Set(galleryImages.map((image) => image.year)))
  const locations = Array.from(new Set(galleryImages.map((image) => image.location)))

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroContent
      title="Gallery"
      description={`Explore photos from our programs, events, and activities across Kenya.`}
      
      />
       

      {/* Gallery Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gallery..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{categoryFilter === "all" ? "All Categories" : categoryFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{yearFilter === "all" ? "All Years" : yearFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{locationFilter === "all" ? "All Locations" : locationFilter}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
         
            <ScrollableTablist
            items={tablists}
            noCenter={true}
            />

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03 }}
                    className="group relative overflow-hidden rounded-lg"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="h-64 w-full overflow-hidden rounded-lg"
                          onClick={() => setSelectedImage(image.id)}
                        >
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
                        <DialogTitle className="text-center p-2">Gallery image</DialogTitle>
                        <div className="relative aspect-video w-full">
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="p-4">
                          <p className="mb-2 text-center font-medium">{image.caption}</p>
                          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                            <span>{image.category}</span>
                            <span>•</span>
                            <span>{image.location}</span>
                            <span>•</span>
                            <span>{image.year}</span>
                          </div>
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

              {filteredImages.length === 0 && (
                <div className="my-12 text-center">
                  <p className="text-lg font-medium">No images found</p>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setCategoryFilter("all")
                      setYearFilter("all")
                      setLocationFilter("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="skills" className="mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages
                  .filter((image) => image.category === "Skills Development")
                  .map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="h-64 w-full overflow-hidden rounded-lg"
                            onClick={() => setSelectedImage(image.id)}
                          >
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
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="p-4">
                            <p className="mb-2 text-center font-medium">{image.caption}</p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                              <span>{image.category}</span>
                              <span>•</span>
                              <span>{image.location}</span>
                              <span>•</span>
                              <span>{image.year}</span>
                            </div>
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
            </TabsContent>

            <TabsContent value="health" className="mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages
                  .filter((image) => image.category === "Health Advocacy")
                  .map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="h-64 w-full overflow-hidden rounded-lg"
                            onClick={() => setSelectedImage(image.id)}
                          >
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
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="p-4">
                            <p className="mb-2 text-center font-medium">{image.caption}</p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                              <span>{image.category}</span>
                              <span>•</span>
                              <span>{image.location}</span>
                              <span>•</span>
                              <span>{image.year}</span>
                            </div>
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
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages
                  .filter((image) => image.category === "Woman of Purpose")
                  .map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="h-64 w-full overflow-hidden rounded-lg"
                            onClick={() => setSelectedImage(image.id)}
                          >
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
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="p-4">
                            <p className="mb-2 text-center font-medium">{image.caption}</p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                              <span>{image.category}</span>
                              <span>•</span>
                              <span>{image.location}</span>
                              <span>•</span>
                              <span>{image.year}</span>
                            </div>
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
            </TabsContent>

            <TabsContent value="community" className="mt-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages
                  .filter(
                    (image) =>
                      image.category === "Community Outreach" ||
                      image.category === "Widows Support" ||
                      image.category === "Crisis Support",
                  )
                  .map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="group relative overflow-hidden rounded-lg"
                    >
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            className="h-64 w-full overflow-hidden rounded-lg"
                            onClick={() => setSelectedImage(image.id)}
                          >
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
                            <Image
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="p-4">
                            <p className="mb-2 text-center font-medium">{image.caption}</p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                              <span>{image.category}</span>
                              <span>•</span>
                              <span>{image.location}</span>
                              <span>•</span>
                              <span>{image.year}</span>
                            </div>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
