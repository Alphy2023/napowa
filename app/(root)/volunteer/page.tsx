import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Users, ArrowRight, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Volunteer | NAPOWA",
  description: "Join NAPOWA as a volunteer and make a difference in the lives of police officers' wives and widows.",
}

export default function VolunteerPage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">Volunteer with NAPOWA</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Join our community of dedicated volunteers and help make a difference in the lives of police officers'
              wives and widows across Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#opportunities">View Opportunities</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#apply">Apply Now</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="w-full py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Why Volunteer with NAPOWA?</h2>
            <p className="mb-12 text-xl text-muted-foreground">
              Volunteering with NAPOWA offers a unique opportunity to support a vital community while developing your
              skills and making lasting connections.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Make an Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Directly support police families facing unique challenges and help build stronger communities.</p>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Develop Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Gain valuable experience, develop new skills, and enhance your resume while making a difference.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Build Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Meet like-minded individuals and build meaningful relationships with people who share your values.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section id="opportunities" className="w-full bg-muted/50 py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Volunteer Opportunities</h2>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All Opportunities</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="skills">Skills-Based</TabsTrigger>
                <TabsTrigger value="mentoring">Mentoring</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Event Support Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Support</CardTitle>
                    <CardDescription>Help organize and run NAPOWA events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Event volunteers"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Flexible hours, 5-10 hours/month</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Various locations</span>
                        </div>
                      </div>
                      <p>
                        Assist with event planning, setup, registration, and coordination for workshops, fundraisers,
                        and community gatherings.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Event Planning</Badge>
                        <Badge variant="outline">Logistics</Badge>
                        <Badge variant="outline">Customer Service</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Skills Training Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Training</CardTitle>
                    <CardDescription>Share your expertise with our members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Skills training"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-8 hours/month, scheduled sessions</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Training centers or virtual</span>
                        </div>
                      </div>
                      <p>
                        Conduct workshops and training sessions in areas like financial literacy, entrepreneurship,
                        computer skills, or crafts.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Teaching</Badge>
                        <Badge variant="outline">Mentoring</Badge>
                        <Badge variant="outline">Subject Expertise</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Widow Support Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Widow Support</CardTitle>
                    <CardDescription>Provide companionship and assistance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Widow support"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-6 hours/month, flexible schedule</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Home visits or community centers</span>
                        </div>
                      </div>
                      <p>
                        Provide emotional support, practical assistance, and companionship to police widows, helping
                        them navigate challenges.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Emotional Support</Badge>
                        <Badge variant="outline">Practical Help</Badge>
                        <Badge variant="outline">Companionship</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Administrative Support Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Administrative Support</CardTitle>
                    <CardDescription>Help with office and administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Administrative support"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-12 hours/week, regular schedule</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>NAPOWA offices</span>
                        </div>
                      </div>
                      <p>
                        Assist with data entry, filing, correspondence, phone calls, and other administrative tasks to
                        support NAPOWA operations.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Organization</Badge>
                        <Badge variant="outline">Communication</Badge>
                        <Badge variant="outline">Computer Skills</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Fundraising Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Fundraising</CardTitle>
                    <CardDescription>Help raise funds for NAPOWA programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Fundraising"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Varies by campaign, flexible</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Various locations or remote</span>
                        </div>
                      </div>
                      <p>
                        Assist with fundraising campaigns, donor outreach, grant writing, and organizing fundraising
                        events to support our programs.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Fundraising</Badge>
                        <Badge variant="outline">Communication</Badge>
                        <Badge variant="outline">Networking</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Mentorship Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mentorship</CardTitle>
                    <CardDescription>Mentor police wives and widows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Mentorship"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-8 hours/month, scheduled meetings</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>In-person or virtual</span>
                        </div>
                      </div>
                      <p>
                        Provide guidance, support, and mentorship to police wives and widows in areas of personal
                        development and career growth.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Mentoring</Badge>
                        <Badge variant="outline">Coaching</Badge>
                        <Badge variant="outline">Leadership</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Event Support Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Event Support</CardTitle>
                    <CardDescription>Help organize and run NAPOWA events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Event volunteers"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Flexible hours, 5-10 hours/month</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Various locations</span>
                        </div>
                      </div>
                      <p>
                        Assist with event planning, setup, registration, and coordination for workshops, fundraisers,
                        and community gatherings.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Event Planning</Badge>
                        <Badge variant="outline">Logistics</Badge>
                        <Badge variant="outline">Customer Service</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Fundraising Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Fundraising</CardTitle>
                    <CardDescription>Help raise funds for NAPOWA programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Fundraising"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Varies by campaign, flexible</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Various locations or remote</span>
                        </div>
                      </div>
                      <p>
                        Assist with fundraising campaigns, donor outreach, grant writing, and organizing fundraising
                        events to support our programs.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Fundraising</Badge>
                        <Badge variant="outline">Communication</Badge>
                        <Badge variant="outline">Networking</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Skills Training Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Training</CardTitle>
                    <CardDescription>Share your expertise with our members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Skills training"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-8 hours/month, scheduled sessions</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Training centers or virtual</span>
                        </div>
                      </div>
                      <p>
                        Conduct workshops and training sessions in areas like financial literacy, entrepreneurship,
                        computer skills, or crafts.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Teaching</Badge>
                        <Badge variant="outline">Mentoring</Badge>
                        <Badge variant="outline">Subject Expertise</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Administrative Support Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Administrative Support</CardTitle>
                    <CardDescription>Help with office and administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Administrative support"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-12 hours/week, regular schedule</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>NAPOWA offices</span>
                        </div>
                      </div>
                      <p>
                        Assist with data entry, filing, correspondence, phone calls, and other administrative tasks to
                        support NAPOWA operations.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Organization</Badge>
                        <Badge variant="outline">Communication</Badge>
                        <Badge variant="outline">Computer Skills</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="mentoring">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Mentorship Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mentorship</CardTitle>
                    <CardDescription>Mentor police wives and widows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Mentorship"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-8 hours/month, scheduled meetings</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>In-person or virtual</span>
                        </div>
                      </div>
                      <p>
                        Provide guidance, support, and mentorship to police wives and widows in areas of personal
                        development and career growth.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Mentoring</Badge>
                        <Badge variant="outline">Coaching</Badge>
                        <Badge variant="outline">Leadership</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>

                {/* Widow Support Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Widow Support</CardTitle>
                    <CardDescription>Provide companionship and assistance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src="/placeholder.svg?height=400&width=600"
                          alt="Widow support"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>4-6 hours/month, flexible schedule</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>Home visits or community centers</span>
                        </div>
                      </div>
                      <p>
                        Provide emotional support, practical assistance, and companionship to police widows, helping
                        them navigate challenges.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Emotional Support</Badge>
                        <Badge variant="outline">Practical Help</Badge>
                        <Badge variant="outline">Companionship</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href="#apply">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Volunteer Process Section */}
      <section className="w-full py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">How to Become a Volunteer</h2>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Apply</h3>
              <p className="text-muted-foreground">
                Complete our volunteer application form with your interests and availability.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Interview</h3>
              <p className="text-muted-foreground">
                Meet with our volunteer coordinator to discuss opportunities that match your skills.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Get Started</h3>
              <p className="text-muted-foreground">
                Attend orientation, receive training, and begin making a difference with NAPOWA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application Section */}
      <section id="apply" className="w-full bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight">Volunteer Application</h2>
            <p className="mb-8 text-center text-muted-foreground">
              Ready to make a difference? Fill out the form below to start your volunteer journey with NAPOWA.
            </p>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="interests" className="text-sm font-medium">
                      Areas of Interest
                    </label>
                    <select
                      id="interests"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Select an area</option>
                      <option value="event-support">Event Support</option>
                      <option value="skills-training">Skills Training</option>
                      <option value="widow-support">Widow Support</option>
                      <option value="administrative">Administrative Support</option>
                      <option value="fundraising">Fundraising</option>
                      <option value="mentorship">Mentorship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="availability" className="text-sm font-medium">
                      Availability
                    </label>
                    <select
                      id="availability"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium">
                      Relevant Experience
                    </label>
                    <textarea
                      id="experience"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      rows={4}
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="motivation" className="text-sm font-medium">
                      Why do you want to volunteer with NAPOWA?
                    </label>
                    <textarea
                      id="motivation"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      rows={4}
                      required
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to NAPOWA's volunteer terms and conditions
                    </label>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Volunteer Testimonials</h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-lg">
                  "Volunteering with NAPOWA has been one of the most rewarding experiences of my life. I've met
                  incredible women and gained skills I never thought I'd have."
                </blockquote>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image src="/placeholder.svg?height=100&width=100" alt="Sarah K." width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-semibold">Sarah K.</p>
                    <p className="text-sm text-muted-foreground">Event Support Volunteer, 2 years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-lg">
                  "As a skills trainer, I thought I was the one giving, but I've received so much more in return. The
                  gratitude and progress of the women I work with is incredibly fulfilling."
                </blockquote>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image src="/placeholder.svg?height=100&width=100" alt="David M." width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-semibold">David M.</p>
                    <p className="text-sm text-muted-foreground">Skills Training Volunteer, 3 years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-lg">
                  "Supporting police widows has changed my perspective on life. The strength these women show is
                  inspiring, and being able to help them through difficult times is a privilege."
                </blockquote>
                <div className="mt-6 flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-muted">
                    <Image src="/placeholder.svg?height=100&width=100" alt="Grace O." width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-semibold">Grace O.</p>
                    <p className="text-sm text-muted-foreground">Widow Support Volunteer, 4 years</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-muted/50 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <details className="group rounded-lg border bg-background p-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  Do I need special qualifications to volunteer?
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Most volunteer roles don't require special qualifications, just a willingness to help and learn. For
                  skills training or mentorship roles, relevant experience is beneficial but not always required as we
                  provide training.
                </p>
              </details>

              <details className="group rounded-lg border bg-background p-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  How much time do I need to commit?
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Time commitments vary by role. Some opportunities require as little as 4 hours per month, while others
                  might need more regular involvement. We work with your schedule to find a commitment that works for
                  you.
                </p>
              </details>

              <details className="group rounded-lg border bg-background p-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  Can I volunteer if I'm not related to a police officer?
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  While NAPOWA serves police families, our volunteers come from all backgrounds. Your skills,
                  compassion, and dedication are what matter most.
                </p>
              </details>

              <details className="group rounded-lg border bg-background p-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  Is there an age requirement for volunteering?
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Volunteers must be at least 18 years old for most roles. However, we do have special youth volunteer
                  opportunities for those aged 16-17 with parental consent.
                </p>
              </details>

              <details className="group rounded-lg border bg-background p-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  Will I receive training as a volunteer?
                  <svg
                    className="h-5 w-5 transition-transform group-open:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Yes, all volunteers receive orientation and role-specific training. For specialized roles, we provide
                  more extensive training to ensure you're well-prepared to make a positive impact.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-16 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Ready to Make a Difference?</h2>
            <p className="mb-8 text-xl">
              Join our community of volunteers today and help support police wives and widows across Kenya.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="#apply">Apply to Volunteer</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
