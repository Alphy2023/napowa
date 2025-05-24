import { HeroSection } from "@/components/hero-section"
import { MissionSection } from "@/components/mission-section"
import { ProgramsSection } from "@/components/programs-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DonateSection } from "@/components/donate-section"
import { GalleryPreview } from "@/components/gallery-preview"

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <MissionSection />
      <StatsSection />
      <ProgramsSection />
      <GalleryPreview />
      <TestimonialsSection />
      <DonateSection />
    </main>
  )
}
