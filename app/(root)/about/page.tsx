import type { Metadata } from "next"
import dynamic from "next/dynamic"
import type { Metadata as NextMetadata } from "next"
import { HeroContent } from "@/components/hero-content"
import { DynamicAboutContent } from "@/components/about/dynamic-about-content"

export const metadata: NextMetadata = {
  title: "About Us | NAPOWA",
  description:
    "Learn about the National Police Wives Welfare Association and our mission to empower police wives and widows across Kenya.",
}

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <HeroContent
        title="About Us"
        description={`Founded in 2014, the National Police Wives 
            Welfare Association is dedicated to empowering police wives and
              widows across Kenya through education, 
              skills development, and innovative healthcare programs.`}
      />

      {/* Dynamic About Content */}
      <DynamicAboutContent />
    </main>
  )
}
