import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Heart, BookOpen, Users, Landmark, GraduationCap, ShieldCheck } from "lucide-react"
import { PageTitle } from "@/components/page-title"
import ScrollableTablist from "@/components/scrollable-tablist"
import { HeroContent } from "@/components/hero-content"

export const metadata: Metadata = {
  title: "Our Programs | NAPOWA",
  description:
    "Explore the various programs offered by the National Police Wives Welfare Association to empower police wives and widows across Kenya.",
}

const programs = [
  {
    id: "skills-development",
    title: "Skills Development",
    description:
      "Our skills development program provides training in various vocational skills to help police wives and widows become economically independent.",
    icon: Briefcase,
    image: "/images/programs/program-image-1.png?height=400&width=600",
    activities: [
      "Soap and detergent making workshops",
      "Fashion design and tailoring classes",
      "Candle production training",
      "Beadwork and jewelry making",
      "Food processing and preservation",
      "Computer literacy courses",
    ],
    impact:
      "Over 200 women have completed our skills training programs, with 70% reporting increased income through their new skills.",
  },
  {
    id: "health-advocacy",
    title: "Health & Rights Advocacy",
    description:
      "Our health advocacy program focuses on providing access to sexual and reproductive health information, counseling, and services for police wives and widows.",
    icon: Heart,
    image: "/placeholder.svg?height=400&width=600",
    activities: [
      "Health awareness workshops",
      "Access to reproductive health services",
      "Mental health support and counseling",
      "Rights awareness training",
      "Domestic violence prevention",
      "Support groups for health challenges",
    ],
    impact:
      "We've reached over 300 women with critical health information and services, improving health outcomes for police families.",
  },
  {
    id: "woman-of-purpose",
    title: "Woman of Purpose",
    description:
      "Our annual Woman of Purpose event is a transformative gathering focused on empowering police wives and widows with life skills, inspiration, and community.",
    icon: BookOpen,
    image: "/placeholder.svg?height=400&width=600",
    activities: [
      "Inspirational speakers and testimonials",
      "Leadership development workshops",
      "Networking opportunities",
      "Recognition of achievements",
      "Goal setting and vision boarding",
      "Community building activities",
    ],
    impact:
      "Each year, over 100 women attend our Woman of Purpose event, with 90% reporting increased confidence and motivation.",
  },
  {
    id: "crisis-support",
    title: "Crisis Support",
    description:
      "Our crisis support program provides immediate assistance to police families facing difficult situations, including bereavement, illness, or financial emergencies.",
    icon: Users,
    image: "/placeholder.svg?height=400&width=600",
    activities: [
      "Emergency financial assistance",
      "Bereavement support for widows",
      "Counseling services",
      "Referrals to specialized services",
      "Temporary housing assistance",
      "Children's education support",
    ],
    impact:
      "We've provided critical support to over 100 families in crisis, helping them navigate challenging times with dignity and hope.",
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy",
    description:
      "Our financial literacy program equips police wives and widows with essential knowledge and skills to manage their finances effectively and build sustainable livelihoods.",
    icon: Landmark,
    image: "/placeholder.svg?height=400&width=600",
    activities: [
      "Basic budgeting workshops",
      "Savings and investment training",
      "Microfinance opportunities",
      "Business planning and management",
      "Debt management strategies",
      "Financial goal setting",
    ],
    impact:
      "Over 150 women have completed our financial literacy program, with many starting successful savings groups and small businesses.",
  },
  {
    id: "education-support",
    title: "Education Support",
    description:
      "Our education support program focuses on providing educational opportunities for police wives, widows, and their children to build brighter futures.",
    icon: GraduationCap,
    image: "/placeholder.svg?height=400&width=600",
    activities: [
      "Scholarships for continuing education",
      "School supplies for children",
      "Adult literacy classes",
      "Mentorship programs",
      "Career guidance",
      "Educational workshops",
    ],
    impact:
      "We've supported the education of over 50 women and 100 children, opening doors to new opportunities and breaking cycles of poverty.",
  },
  {
    id: "advocacy",
    title: "Policy Advocacy",
    description:
      "Our advocacy program works to influence policies and practices that affect police families, ensuring their needs and concerns are addressed at institutional levels.",
    icon: ShieldCheck,
    image: "/placeholder.svg?height=400&width=600",
    activities: [
      "Engagement with police leadership",
      "Policy research and recommendations",
      "Awareness campaigns",
      "Representation in relevant forums",
      "Collaboration with other advocacy groups",
      "Documentation of issues affecting police families",
    ],
    impact:
      "Our advocacy efforts have contributed to several policy improvements benefiting police families across Kenya.",
  },
]

export default function ProgramsPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      
       <HeroContent
          title="Our Programs"
          description={` NAPOWA runs various programs aimed at empowering police wives and widows to become economically and
            socially independent.`}
            />
             
      {/* <section className="w-full bg-gradient-to-b from-primary/10 to-background py-20 md:py-28">
        <div className="container">
          <PageTitle
          title="Our Programs"
          description={` NAPOWA runs various programs aimed at empowering police wives and widows to become economically and
              socially independent.`}
          />
      
        </div>
      </section> */}

      {/* Programs Overview Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Our Approach</h2>
            <p className="text-muted-foreground">
              Our programs are designed to address the unique challenges faced by police wives and widows, focusing on
              economic empowerment, health and wellbeing, and community support.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Briefcase className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Economic Empowerment</h3>
                <p className="text-center text-muted-foreground">
                  We provide skills training, financial literacy, and entrepreneurship support to help police wives and
                  widows achieve economic independence.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Heart className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Health & Wellbeing</h3>
                <p className="text-center text-muted-foreground">
                  We promote physical and mental health through education, advocacy, and access to essential health
                  services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Users className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Community Support</h3>
                <p className="text-center text-muted-foreground">
                  We build strong communities through networking, mentorship, and crisis support for police families.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Detail Section */}
      <section className="w-full bg-muted/50 py-16 md:py-24">
        <div className="container">
          <PageTitle
            title="Explore Our Programs"
            description={`  Learn more about the specific programs we
               offer to empower police wives and widows across Kenya.`}
          />

          <Tabs defaultValue="skills-development" className="w-full">
           <ScrollableTablist
           items={
            programs?.map(({id,title})=>({id,title}))
           }
           />

            {programs.map((program) => (
              <TabsContent key={program.id} value={program.id}>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[400px]">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        <program.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">{program.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{program.description}</p>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Key Activities:</h4>
                      <ul className="ml-6 list-disc space-y-1 text-muted-foreground">
                        {program.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Impact:</h4>
                      <p className="text-muted-foreground">{program.impact}</p>
                    </div>

                    <Button asChild variant="transparent">
                      <Link href={`/programs/${program.id}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container">
          <PageTitle
          title="Success Stories"
          description={`Hear from the women whose lives have been
          transformed through our programs.`}
          />
        

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Jane Muthoni",
                program: "Skills Development",
                story:
                  "After my husband passed away, I didn't know how I would support my children. Through NAPOWA's soap making training, I started my own business and now I can provide for my family.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Mary Akinyi",
                program: "Financial Literacy",
                story:
                  "The financial literacy program taught me how to budget, save, and invest. I've started a savings group with other police wives, and we're all seeing improvements in our financial situations.",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sarah Wanjiku",
                program: "Woman of Purpose",
                story:
                  "Attending the Woman of Purpose event changed my perspective on what I could achieve. The inspiration and skills I gained helped me start a tailoring business that now employs three other women.",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((story, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image src={story.image || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-sm text-primary">{story.program} Program</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">"{story.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="w-full bg-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xlp text-center">
            <PageTitle
              title="Get Involved"
              description={`There are many ways to support our programs
                and help us empower more police wives and widows across Kenya.`}
            />
          
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Donate</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Your financial support helps us expand our programs and reach more women in need.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild>
                    <Link href="/donate">Donate Now</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Volunteer</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Share your skills and time to help us implement our programs effectively.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link href="/volunteer">Volunteer</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Partner</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Collaborate with us as an organization to create greater impact together.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link href="/partner">Partner With Us</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Join</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    If you're a police wife or widow, become a member and access our programs.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="outline">
                    <Link href="/auth/signup">Signup</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
