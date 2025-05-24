import type { Metadata } from "next"
import BlogClientPage from "./EventClientPage"

export const metadata: Metadata = {
  title: "Blog | NAPOWA",
  description: "Read the latest news, stories, and updates from the National Police Wives Welfare Association.",
}

export default function BlogPage() {
  return <BlogClientPage />
}
