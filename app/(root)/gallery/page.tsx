import type { Metadata } from "next"
// import GalleryClientPage from "./GalleryClientPage"
import GalleryManager from "@/components/dashboard/gallery/gallery-manager"
import { HeroContent } from "@/components/hero-content"

export const metadata: Metadata = {
  title: "Gallery | NAPOWA",
  description: "View photos from NAPOWA's events, programs, and activities across Kenya.",
}

export default function GalleryPage() {
  return  (
     <main className="flex flex-col items-center">
          {/* Hero Section */}
          <HeroContent
          title="Gallery"
          description={`Explore photos from our programs, events, and activities across Kenya.`}
          
          />
    
          {/* Gallery Section */}
          <section className="w-full py-16 md:py-24">
            {/* <div className="container"> */}
              <GalleryManager cardHref="/gallery" />
            {/* </div> */}
          </section>
      </main>
  )
  
}
