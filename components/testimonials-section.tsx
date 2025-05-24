"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { PageTitle } from "./page-title"

const testimonials = [
  {
    quote:
      "NAPOWA helped me start my own business after my husband passed away. Now I can support my children and even help other widows in my community.",
    author: "Jane Muthoni",
    role: "Police Widow, Nairobi",
    program: "Skills Development",

    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The skills training program changed my life. I learned how to make soap and candles, and now I earn enough to supplement my family's income.",
    author: "Mary Akinyi",
    role: "Police Wife, Kisumu",
    program: "Financial Literacy",

    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The counseling services provided by NAPOWA helped me cope with the stress of being married to a police officer. I'm grateful for their support.",
    author: "Sarah Wanjiku",
    role: "Police Wife, Mombasa",
    program: "Woman of Purpose",

    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section className="py-16 md:py-24 container mb-16">
      <div className="">
        <PageTitle
        title="Success Stories"
        description={`  Hear from the women whose lives have been 
            transformed through our programs and initiatives.`}
        />
       

        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none bg-primary/5">
                <CardContent className="p-8 md:p-12">
                  <Quote className="mb-6 h-12 w-12 text-primary/40" />
                  <blockquote className="mb-8 text-xl md:text-2xl">"{testimonials[current].quote}"</blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={testimonials[current].avatar || "/placeholder.svg"}
                        alt={testimonials[current].author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonials[current].author}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-6 mt-6p left-0
           right-0 flex justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => {
                setAutoplay(false)
                prev()
              }}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className={`h-2 w-2  rounded-full p-0 ${index === current ? 
                  "bg-primary" : "bg-muted"}`}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => {
                setAutoplay(false)
                next()
              }}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
