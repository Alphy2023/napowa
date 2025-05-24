import type { Metadata } from "next"
import GalleryClientPage from "./GalleryClientPage"

export const metadata: Metadata = {
  title: "Gallery | NAPOWA",
  description: "View photos from NAPOWA's events, programs, and activities across Kenya.",
}

export default function GalleryPage() {
  return <GalleryClientPage />
}
