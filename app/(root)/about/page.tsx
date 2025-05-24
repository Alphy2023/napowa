import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Brain, HandMetal, Award, Clock, Users } from "lucide-react"
import { HeroContent } from "@/components/hero-content"
import { WelcomeNote } from "@/components/about/welcome-note"

export const metadata: Metadata = {
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
          description={` Founded in 2014, the National Police Wives 
            Welfare Association is dedicated to empowering police wives and
              widows across Kenya through education, 
              skills development, and innovative healthcare programs.`}
        />

      <WelcomeNote/>
      {/* Our Story Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The National Police Wives Welfare Association (NAPOWA) was established in 2014 as a response to the
                  growing needs of police wives and widows across Kenya. Our founder, Jenetrix Otieno, recognized the
                  unique challenges faced by women in police families and envisioned an organization that would provide
                  support, empowerment, and community.
                </p>
                <p>
                  What began as a small support group in Nairobi has grown into a nationwide organization with chapters
                  in multiple counties. Through dedication and perseverance, NAPOWA has developed comprehensive programs
                  that address the economic, social, and emotional needs of our members.
                </p>
                <p>
                  Today, NAPOWA stands as a beacon of hope and empowerment for police wives and widows, offering skills
                  training, health advocacy, crisis support, and community building initiatives that have transformed
                  thousands of lives across Kenya.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="NAPOWA members at a community event"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="w-full bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Mission & Values</h2>
            <p className="text-muted-foreground">
              Our mission is to empower underprivileged police wives and widows through education, skills development,
              and innovative healthcare programs, enabling them to become economically and socially independent.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Heart className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Heart Led</h3>
                <p className="text-center text-muted-foreground">
                  With our hearts, we reach out to underprivileged police wives and widows who need the most help,
                  including those suffering from domestic violence and single mothers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Brain className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Mind Led</h3>
                <p className="text-center text-muted-foreground">
                  We design programs that reshape mindsets, enabling police wives and widows to believe in their
                  potential and become significant contributors to society.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <HandMetal className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Hand Led</h3>
                <p className="text-center text-muted-foreground">
                  We believe every hand must be empowered to generate income. We train police wives and widows to
                  identify their strengths and develop skills for economic independence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Achievements</h2>
            <p className="text-muted-foreground">
              Since our founding, NAPOWA has made significant strides in empowering police wives and widows across
              Kenya.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">300+ Members</h3>
                <p className="text-muted-foreground">
                  We've built a community of over 300 police wives and widows across Kenya, providing support and
                  resources.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">50+ Successful Projects</h3>
                <p className="text-muted-foreground">
                  We've implemented over 50 successful projects, from skills training workshops to health advocacy
                  campaigns.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">10+ Years of Service</h3>
                <p className="text-muted-foreground">
                  For over a decade, we've been dedicated to improving the lives of police families across Kenya.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">100+ Widows Supported</h3>
                <p className="text-muted-foreground">
                  We've provided critical support to over 100 police widows, helping them rebuild their lives after
                  loss.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">20+ Training Programs</h3>
                <p className="text-muted-foreground">
                  We've developed and implemented over 20 training programs focused on skills development and economic
                  empowerment.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-primary/10 p-3">
                <HandMetal className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">5 County Chapters</h3>
                <p className="text-muted-foreground">
                  We've established chapters in 5 counties across Kenya, expanding our reach and impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-muted/50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Leadership Team</h2>
            <p className="text-muted-foreground">
              Meet the dedicated individuals who lead NAPOWA's mission to empower police wives and widows across Kenya.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Jenetrix Otieno",
                role: "Founder & Executive Director",
                bio: "Jenetrix founded NAPOWA in 2014 with a vision to empower police wives and widows across Kenya.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Mary Akinyi",
                role: "Programs Director",
                bio: "Mary oversees all NAPOWA programs, ensuring they effectively meet the needs of our members.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sarah Wanjiku",
                role: "Finance Director",
                bio: "Sarah manages NAPOWA's finances, ensuring resources are used effectively to support our mission.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Grace Otieno",
                role: "Outreach Coordinator",
                bio: "Grace coordinates NAPOWA's outreach efforts, expanding our reach to more police wives and widows.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Faith Kamau",
                role: "Training Coordinator",
                bio: "Faith develops and implements NAPOWA's skills training programs, empowering members economically.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Hope Njeri",
                role: "Widows Support Coordinator",
                bio: "Hope leads NAPOWA's initiatives specifically focused on supporting police widows.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                    <p className="mb-3 text-sm text-primary">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Join Our Mission</h2>
            <p className="mb-8 text-muted-foreground">
              Whether you're a police wife, widow, or someone who wants to support our cause, there are many ways to get
              involved with NAPOWA.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
