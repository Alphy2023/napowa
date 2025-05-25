"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Camera, Save, Plus, Trash, ArrowUp, ArrowDown } from "lucide-react"
import { v4 as uuidv4 } from "uuid" // <-- Ensure you have this installed: `npm install uuid`

const DEFAULT_BUTTON_OPTIONS = [
  "Donate Now",
  "Our Programs",
  "Our Impact",
  "Partner With Us",
  "Become a Member",
  "Learn More",
]

const BUTTON_LINKS: Record<string, string> = {
  "Donate Now": "/donate",
  "Our Programs": "/programs",
  "Our Impact": "/impact",
  "Partner With Us": "/partner",
  "Become a Member": "/auth/signup",
  "Learn More": "/about",
}


type SlideType = {
  id: string
  image: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
}

export const LandingPageSettings = () => {
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState<string>("")
  const [slides, setSlides] = useState<SlideType[]>([
    {
      id: uuidv4(),
      image: "",
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      secondaryButtonText: "",
      secondaryButtonLink: "",
    },
  ])
  const [customButtons, setCustomButtons] = useState<string[]>([])

  const handleSlideChange = (index: number, key: keyof SlideType, value: string) => {
    const updatedSlides = [...slides]
    updatedSlides[index][key] = value
    setSlides(updatedSlides)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleSlideChange(index, "image", reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert("Only image files are allowed.")
    }
  }

  const handleAddCustomButton = (index: number, isPrimary: boolean) => {
    const label = prompt("Enter custom button label:")
    const link = prompt("Enter custom button link:")
    if (label && link) {
      setCustomButtons((prev) => [...prev, label])
      const key = isPrimary ? "buttonText" : "secondaryButtonText"
      const linkKey = isPrimary ? "buttonLink" : "secondaryButtonLink"
      handleSlideChange(index, key, label)
      handleSlideChange(index, linkKey, link)
    }
  }

  const getFilteredOptions = (currentIndex: number, isPrimary: boolean) => {
    const used = new Set<string>()
    slides.forEach((slide, i) => {
      if (i === currentIndex) return
      if (slide.buttonText) used.add(slide.buttonText)
      if (slide.secondaryButtonText) used.add(slide.secondaryButtonText)
    })

    const selectedOpposite = isPrimary
      ? slides[currentIndex].secondaryButtonText
      : slides[currentIndex].buttonText

    const allOptions = [...DEFAULT_BUTTON_OPTIONS, ...customButtons]

    return allOptions.filter((btn) => !used.has(btn) && btn !== selectedOpposite)
  }

  const addSlide = () => {
    setSlides([
      ...slides,
      {
        id: uuidv4(),
        image: "",
        title: "",
        description: "",
        buttonText: "",
        buttonLink: "",
        secondaryButtonText: "",
        secondaryButtonLink: "",
      },
    ])
  }

  const deleteSlide = (index: number) => {
    const updatedSlides = [...slides]
    updatedSlides.splice(index, 1)
    setSlides(updatedSlides)
  }

  const moveSlide = (index: number, direction: "up" | "down") => {
    const updatedSlides = [...slides]
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= updatedSlides.length) return
    const [movedSlide] = updatedSlides.splice(index, 1)
    updatedSlides.splice(newIndex, 0, movedSlide)
    setSlides(updatedSlides)
  }

  const onSubmit = async() => {
    setLoading(true);
    setError(null);
     try {
   

    const res = await fetch("/api/landing-slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slides),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(data); // Your success message and data
    } else {

      setError(`Error: ${res?.error}`);
      console.error('Error:', data.error);
      // setError(data.error || `Error: ${res.status}`);
    }
    } catch (error) {
      setError(error?.message || "An unexpected error occurred");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative space-y-8">
        <CardHeader>
          <CardTitle>Landing page hero sections</CardTitle>
          <CardDescription>Manage how you want your hero slides to look and what the general public sees.</CardDescription>
        </CardHeader>
      {slides.map((slide, index) => (
        <Card key={slide.id}>
          <CardHeader>
            <CardTitle>Slide {index + 1}</CardTitle>
            <CardDescription>Create and manage slide {index + 1}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
           <div className="relative  h-[200px] md:h-[400px] w-full
            bg-muted flex items-center justify-center 
            rounded-md overflow-hidden"
             onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const file = e.dataTransfer.files?.[0]
              if (file && file.type.startsWith("image/")) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  handleSlideChange(index, "image", reader.result as string)
                }
                reader.readAsDataURL(file)
              } else {
                alert("Only image files are allowed.")
              }
            }}
            >
            <label htmlFor={`file-upload-${index}`}
             className="relative w-full h-full cursor-pointer">
              {slide.image ? (
                <>
                  <Image
                    src={slide.image}
                    alt="Uploaded image"
                    fill
                    className="object-cover aspect-video"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        document.getElementById(`file-upload-${index}`)?.click()
                      }}
                    >
                      Change Image
                    </Button>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-center text-muted-foreground px-4">
                  Click to upload an image or drag & drop here
                </div>
              )}
              <input
                id={`file-upload-${index}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, index)}
              />
            </label>
          </div>


            <Separator />

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={slide.title}
                onChange={(e) => handleSlideChange(index, "title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={slide.description}
                onChange={(e) => handleSlideChange(index, "description", e.target.value)}
              />
            </div>

            {/* Primary Button */}
            <div className="space-y-2">
              <Label>Primary Button</Label>
              <div className="flex gap-2">
                <Select
                  value={slide.buttonText}
                 onValueChange={(value) => {
                    handleSlideChange(index, "buttonText", value);
                    handleSlideChange(index, "buttonLink", BUTTON_LINKS[value] || "");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a primary button" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredOptions(index, true).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="ghost"
                 onClick={() => handleAddCustomButton(index, true)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {/* <Input
                placeholder="Button Link"
                value={slide.buttonLink}
                onChange={(e) =>
                  handleSlideChange(index, "buttonLink", e.target.value)
                }
              /> */}
            </div>

            {/* Secondary Button */}
            <div className="space-y-2">
              <Label>Secondary Button</Label>
              <div className="flex gap-2">
                <Select
                  value={slide.secondaryButtonText}
                  onValueChange={(value) => {
                    handleSlideChange(index, "secondaryButtonText", value);
                    handleSlideChange(index, "secondaryButtonLink", BUTTON_LINKS[value] || "");
                  }}

                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a secondary button" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredOptions(index, false).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" variant="ghost"
                onClick={() => handleAddCustomButton(index, false)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {/* <Input
                placeholder="Secondary Button Link"
                value={slide.secondaryButtonLink}
                onChange={(e) =>
                  handleSlideChange(index, "secondaryButtonLink", e.target.value)
                }
              /> */}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveSlide(index, "up")}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveSlide(index, "down")}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteSlide(index)}
            >
              <Trash className="h-4 w-4 mr-1 text-destructive" />
            </Button>
          </CardFooter>
        </Card>
      ))}

      <div className="flex justify-between items-center gap-4">
        <Button onClick={addSlide} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add New Slide
        </Button>
        <Button onClick={onSubmit}
          loading={loading}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  )
}
