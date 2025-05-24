"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"


type LandingPageSlide = {
  title:string;
  description:string;
  image:string;
  buttonText:string;
  buttonLink:string;
  secondaryButtonText:string;
  secondaryButtonLink:string;
}

const slides: LandingPageSlide[] = [
  {
    title: "Empowering Police Wives and Widows Across Kenya",
    description:
      "NAPOWA is committed to improving the lives of police families through skills development, health advocacy, and economic empowerment.",
    image: "/images/landing-image-1.jpg?height=1080&width=1920",
    buttonText: "Donate Now",
    buttonLink: "/donate",
    secondaryButtonText: "Our Programs",
    secondaryButtonLink: "/programs",
  },
  {
    title: "Building Stronger Communities Together",
    description: "Join our network of support and solidarity for police families throughout Kenya.",
    image: "/images/landing-image-2.jpg?height=1080&width=1920&text=Community",
    buttonText: "Become a Member",
    buttonLink: "/auth/signup",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
  },
  {
    title: "Creating Opportunities for Economic Empowerment",
    description: "Our skills development programs help police wives and widows achieve financial independence.",
    image: "/images/landing-image-3.jpg?height=1080&width=1920&text=Empowerment",
    buttonText: "Our Impact",
    buttonLink: "/programs",
    secondaryButtonText: "Partner With Us",
    secondaryButtonLink: "/partner",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay])

  const nextSlide = () => {
    setAutoplay(false)
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setAutoplay(false)
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  return (
    <section className="relative w-full overflow-hidden
     bg-gradient-to-b from-primary/10 to-background h-[600px] md:h-[700px]">
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            current === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0 bg-transparent"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-transparent"
                  style={{ backgroundImage: `url(${slide.image})`,
                   opacity: 0.6 }}
                />
              </motion.div>
            ),
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="container relative z-10 h-full flex items-center">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              current === index && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mx-auto max-w-3xl text-center"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-6 text-4xl font-bold 
                    tracking-tight md:text-6xl text-napowa-orangep text-white"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8 text-lg text-muted-foregroundp  md:text-xl"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center"
                  >
                    <Button asChild size="lg">
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href={slide.secondaryButtonLink}>{slide.secondaryButtonText}</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 bottom-10 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setAutoplay(false)
              setCurrent(index)
            }}
            className={`h-2 w-2 rounded-full transition-all
               ${current === index ? "bg-primary w-6" : "bg-primary/30"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 
        -translate-y-1/2 rounded-full bg-background/20
         p-2 text-napowa-red backdrop-blur-sm 
         transition-all hover:bg-background/40"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 
        -translate-y-1/2 rounded-full
         bg-background/20 p-2 text-napowa-red 
         backdrop-blur-sm transition-all hover:bg-background/40"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  )
}
