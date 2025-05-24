import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { PageTitle } from "@/components/page-title"

export const metadata: Metadata = {
  title: "Contact Us | NAPOWA",
  description: "Get in touch with the National Police Wives Association of Kenya.",
}

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16">
      <PageTitle
      title="Contact Us"
      description={`Have questions or want to get involved? We'd love to hear from you.`}
      
      />
     

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card className="flex flex-col">
          <CardHeader>
            <Mail className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Email Us</CardTitle>
            <CardDescription>Send us an email and we'll respond as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="font-medium">General Inquiries:</p>
            <p className="text-muted-foreground mb-2">info@NAPOWA.org</p>

            <p className="font-medium">Membership:</p>
            <p className="text-muted-foreground mb-2">membership@NAPOWA.org</p>

            <p className="font-medium">Donations:</p>
            <p className="text-muted-foreground">donations@NAPOWA.org</p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <Phone className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Call Us</CardTitle>
            <CardDescription>Speak directly with our team during business hours.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="font-medium">Main Office:</p>
            <p className="text-muted-foreground mb-2">+254 700 123 456</p>

            <p className="font-medium">Support Hotline:</p>
            <p className="text-muted-foreground mb-2">+254 711 987 654</p>

            <p className="text-sm text-muted-foreground mt-4">
              Our phone lines are open Monday to Friday, 8:00 AM to 5:00 PM EAT.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <MapPin className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Visit Us</CardTitle>
            <CardDescription>Our headquarters is located in Nairobi.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="font-medium">Headquarters:</p>
            <p className="text-muted-foreground">
              NAPOWA House
              <br />
              Jogoo Road
              <br />
              Nairobi, Kenya
            </p>

            <p className="text-sm text-muted-foreground mt-4">
              Office hours: Monday to Friday, 8:00 AM to 5:00 PM EAT.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="Enter your first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Enter your last name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter message subject" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Enter your message" rows={5} />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            {/* This would be replaced with an actual map component */}
            <div className="w-full h-full flex items-center justify-center bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center">
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg">
                <p className="font-medium">NAPOWA Headquarters</p>
                <p className="text-sm text-muted-foreground">Jogoo Road, Nairobi</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                {
                  question: "How can I become a member of NAPOWA?",
                  answer:
                    "Membership is open to all wives and widows of police officers. Visit our membership page or contact our membership office for more information.",
                },
                {
                  question: "How can I donate to NAPOWA?",
                  answer:
                    "You can donate through our website, mobile money, or bank transfer. Visit our donation page for more details.",
                },
                {
                  question: "Does NAPOWA have branches across Kenya?",
                  answer:
                    "Yes, we have regional chapters across all 47 counties in Kenya. Contact us to find the nearest chapter to you.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Connect With Us</h2>
        <div className="flex justify-center space-x-6">
          {[
            { name: "Facebook", icon: "facebook.svg" },
            { name: "Twitter", icon: "twitter.svg" },
            { name: "Instagram", icon: "instagram.svg" },
            { name: "LinkedIn", icon: "linkedin.svg" },
            { name: "YouTube", icon: "youtube.svg" },
          ].map((social) => (
            <Button key={social.name} variant="outline" size="icon" className="h-12 w-12 rounded-full">
              <span className="sr-only">{social.name}</span>
              <div className="h-6 w-6 bg-foreground/80" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
