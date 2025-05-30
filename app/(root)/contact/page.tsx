import type { Metadata } from "next"
import ContactUsClient from "./_components/contactUs-client"


export const metadata: Metadata = {
  title: "Contact Us | NAPOWA",
  description: "Get in touch with the National Police Wives Association of Kenya.",
}

export default function ContactPage() {
   
  return (
    <div className="md:container py-12 md:py-16 w-full ">
      <ContactUsClient/>
    </div>
  )
}
