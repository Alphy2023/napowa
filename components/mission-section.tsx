"use client"

import {useState} from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { PageTitle } from "./page-title"

type Mission = {

}

export function MissionSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  const missions: Mission[] = [

  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <PageTitle
        title="Our Mission & Values"
        description={`Founded in 2014, NAPOWA is dedicated to empowering underprivileged police wives and widows through
            education, skills development, and innovative healthcare programs.`}
        />
       

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div custom={0}
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          variants={fadeIn}>
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle className="mt-4 text-center">
                   <Image src="/images/heart-led-image.png?height=80&width=80"
                  alt="Heart led" width={90} height={90}
                  className="mx-auto text-center" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-justify text-muted-foreground">
                  With our hearts, we reach and search out for the underprivileged Police Wives
                  and young windows who need the most help. We have found these to be windows,
                  abused Police Wives suffering from domestic violence, single mothers and young
                  windows that have found themeselves on the streets. In the lat 10 years, we have
                  reached <strong>over 300 Police Wives</strong>.
                </p>
                
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle className="mt-4 text-center">
                   <Image src="/images/mind-led-image.png?height=80&width=80"
                  alt="Mind led" width={90} height={90}
                  className="mx-auto text-center" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-justify text-muted-foreground">
                  We believe taht educating the mindset and advocating for the correct mind
                  set is key to empowering underprivileged Police Wives and younf widows.
                  We design, devlop and deliver programmes that reshape the mindset, enabling
                  underprivileged Police Wives and young widows to belive in potentials within 
                  them, the power to speak, the power to do great things, the power
                  to be a significant and positively contributory citizen.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Card className="h-full">
              <CardHeader className="text-center">
                  <CardTitle className="mt-4 text-center">
                   <Image src="/images/hand-led-image.png?height=80&width=80"
                  alt="Hand led" width={90} height={90}
                  className="mx-auto text-center" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-justify text-muted-foreground">
                  We believe that every hand must be empowered to generate income.
                   We train police wives and young widows on how to 
                  identify their strengths, a trade, a skill or education and how to ensure
                  that their hands thrive for good.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ExpandableCardContent({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  const firstPeriodIndex = text.indexOf(".") + 1
  const visibleText = firstPeriodIndex > 0 ? text.slice(0, firstPeriodIndex) : text
  const hiddenText = firstPeriodIndex > 0 ? text.slice(firstPeriodIndex) : ""

  return (
    <div className="relative">
      <p className="text-center text-muted-foreground transition-all duration-300">
        {visibleText}
        {!expanded && hiddenText && (
          <span className="blur-sm select-none text-muted-foreground"> {hiddenText}</span>
        )}
        {expanded && <span>{hiddenText}</span>}
      </p>
      {hiddenText && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute right-2 top-2 text-muted-foreground hover:text-primary transition"
          aria-label="Toggle content"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      )}
    </div>
  )
}