"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Award, Heart } from "lucide-react"

const stats = [
  {
    value: "300+",
    label: "Police Wives Reached",
    icon: Users,
  },
  {
    value: "10+",
    label: "Years of Service",
    icon: Calendar,
  },
  {
    value: "50+",
    label: "Successful Projects",
    icon: Award,
  },
  {
    value: "100+",
    label: "Widows Supported",
    icon: Heart,
  },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-red/5 mb-16 container">
      <motion.div style={{ opacity, y }} className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none bg-primary/5p bg-red/10">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <stat.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
