"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import { useLandingSlides } from "@/hooks/useLandingSlides"

type LandingPageSlide = {
  id: string
  title: string
  description: string
  image: {
    url: string
    public_id: string
    asset_id: string
    version: number
    format: string
    width: number
    height: number
    bytes: number
    original_filename: string
  }
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
}

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  // Use the landing slides hook to get dynamic slides
  const { data, loading, error } = useLandingSlides()
  const slides = data?.slides || []

  useEffect(() => {
    if (!autoplay || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay, slides.length])

  // Reset current slide if it's out of bounds when slides change
  useEffect(() => {
    if (current >= slides.length && slides.length > 0) {
      setCurrent(0)
    }
  }, [slides.length, current])

  const nextSlide = () => {
    if (slides.length === 0) return
    setAutoplay(false)
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    if (slides.length === 0) return
    setAutoplay(false)
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  const goToSlide = (index: number) => {
    setAutoplay(false)
    setCurrent(index)
  }

  // Loading state
  if (loading) {
    return (
      <section className="relative w-full overflow-hidden overflow-x-hidden bg-gradient-to-b from-primary/10 to-background h-[600px] md:h-[700px]">
        <div className="container relative z-10 h-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            {/* <p className="text-lg text-muted-foreground">Please wait...</p> */}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary/10 to-background h-[600px] md:h-[700px]">
        <div className="container relative z-10 h-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4 text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-xl font-semibold text-destructive">Failed to load slides</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  // No slides state
  if (slides?.length === 0) {
    return (
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-primary/10 to-background h-[600px] md:h-[700px]">
        <div className="container relative z-10 h-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4 text-center max-w-md">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <ChevronRight className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No slides available</h2>
            <p className="text-muted-foreground">
              Hero slides will appear here once they are configured in the admin panel.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full overflow-hidden
     bg-gradient-to-bp from-primary/10p to-backgroundp h-[600px] md:h-[700px]">
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            current === index && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0 bg-transparent"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-transparent"
                  style={{
                    backgroundImage: `url(${slide.image.url})`,
                    opacity: 0.6,
                  }}
                />
                <div className="absolute inset-0 bg-black/30" />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="container relative z-10 h-full flex items-center">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              current === index && (
                <motion.div
                  key={slide.id}
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
                    className="mb-6 text-4xl font-bold tracking-tight
                     md:text-6xl text-white drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8 text-lg text-white/90 md:text-xl drop-shadow-md"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center"
                  >
                    <Button asChild size="lg" className="shadow-lg">
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      // className="bg-white/10 border-white/20
                      //  text-white dark:hover:bg-white/20 shadow-lg"
                    >
                      <Link href={slide.secondaryButtonLink}>{slide.secondaryButtonText}</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-10 z-20 
        flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${current === index ? "bg-white w-6" : "bg-white/30"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 z-20
             -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/40 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/40 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </section>
  )
}
