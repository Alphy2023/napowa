"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Heart, BookOpen, Users } from "lucide-react"
import { PageTitle } from "./page-title"

const programs = [
  {
    title: "Skills Development",
    description: "Training in soap making, candle production, fashion design, and other vocational skills.",
    icon: Briefcase,
    image: "/placeholder.svg?height=300&width=400",
    link: "/programs/skills-development",
  },
  {
    title: "Health & Rights Advocacy",
    description: "Access to sexual and reproductive health counseling, information, and services.",
    icon: Heart,
    image: "/placeholder.svg?height=300&width=400",
    link: "/programs/health-advocacy",
  },
  {
    title: "Woman of Purpose",
    description: "Annual empowerment event focused on training and equipping police wives with life skills.",
    icon: BookOpen,
    image: "/placeholder.svg?height=300&width=400",
    link: "/programs/woman-of-purpose",
  },
  {
    title: "Crisis Support",
    description: "Immediate and emergency help for police families facing difficult situations.",
    icon: Users,
    image: "/placeholder.svg?height=300&width=400",
    link: "/programs/crisis-support",
  },
]

export function ProgramsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <PageTitle
          title="Our Programs"
          description={`NAPOWA runs various programs aimed at empowering police wives and widows to become economically and socially
            independent.`}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <program.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{program.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{program.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={program.link}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant={"transparent"}>
            <Link href="/programs">View All Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
