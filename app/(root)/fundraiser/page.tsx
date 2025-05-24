import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Heart, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Fundraiser | NAPOWA",
  description: "Support our fundraising campaigns to help police wives and widows across Kenya.",
}

export default function FundraiserPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Support Our Cause</h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          Your contribution helps us empower police wives and widows across Kenya through education, healthcare, and
          economic opportunities.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center mb-12">
          <Button asChild size="lg">
            <Link href="#current-campaigns">Current Campaigns</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#ways-to-give">Ways to Give</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card className="flex flex-col">
          <CardHeader>
            <DollarSign className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Financial Impact</CardTitle>
            <CardDescription>Your donations directly fund our programs and initiatives.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p>
              90% of all donations go directly to program costs, ensuring maximum impact for the communities we serve.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <Users className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Community Reach</CardTitle>
            <CardDescription>We've supported over 5,000 police wives and widows since our founding.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p>Your support helps us expand our reach to more communities across all 47 counties in Kenya.</p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <Heart className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Sustainable Change</CardTitle>
            <CardDescription>We focus on long-term empowerment, not just immediate relief.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p>
              Our programs are designed to create lasting change through skills development and economic opportunities.
            </p>
          </CardContent>
        </Card>
      </div>

      <div id="current-campaigns" className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Current Fundraising Campaigns</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Education Scholarship Fund",
              description:
                "Help provide educational opportunities for children of police officers who have died in the line of duty.",
              goal: 500000,
              raised: 325000,
              image: "/placeholder.svg?height=200&width=400",
              daysLeft: 45,
            },
            {
              title: "Women's Business Startup Grants",
              description:
                "Support economic empowerment by funding small business startups for police wives and widows.",
              goal: 750000,
              raised: 420000,
              image: "/placeholder.svg?height=200&width=400",
              daysLeft: 30,
            },
            {
              title: "Healthcare Access Program",
              description: "Provide essential healthcare services and support for police families across Kenya.",
              goal: 1000000,
              raised: 650000,
              image: "/placeholder.svg?height=200&width=400",
              daysLeft: 60,
            },
          ].map((campaign, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image src={campaign.image || "/placeholder.svg"} alt={campaign.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{campaign.title}</CardTitle>
                <CardDescription>{campaign.daysLeft} days left</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="mb-4">{campaign.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Raised: KSh {campaign.raised.toLocaleString()}</span>
                    <span>Goal: KSh {campaign.goal.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Donate Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div id="ways-to-give" className="mx-auto max-w-4xl mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Ways to Give</h2>

        <Tabs defaultValue="one-time">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="one-time">One-Time Donation</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Giving</TabsTrigger>
            <TabsTrigger value="corporate">Corporate Partnerships</TabsTrigger>
          </TabsList>

          <TabsContent value="one-time" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Make a One-Time Donation</CardTitle>
                <CardDescription>
                  Your contribution of any amount makes a difference in the lives of police wives and widows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[1000, 2500, 5000, 10000, 25000, 50000].map((amount) => (
                    <Button key={amount} variant="outline" className="h-16">
                      KSh {amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="custom-amount" className="text-sm font-medium">
                      Custom Amount (KSh)
                    </label>
                    <input
                      id="custom-amount"
                      type="number"
                      placeholder="Enter amount"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <Button className="w-full">Donate Now</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Become a Monthly Supporter</CardTitle>
                <CardDescription>
                  Join our community of monthly donors and help provide sustainable support for our programs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[500, 1000, 2500, 5000, 7500, 10000].map((amount) => (
                    <Button key={amount} variant="outline" className="h-16">
                      KSh {amount.toLocaleString()}/mo
                    </Button>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="custom-monthly" className="text-sm font-medium">
                      Custom Monthly Amount (KSh)
                    </label>
                    <input
                      id="custom-monthly"
                      type="number"
                      placeholder="Enter amount"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <Button className="w-full">Become a Monthly Donor</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="corporate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Partnerships</CardTitle>
                <CardDescription>
                  Partner with NAPOWA to make a significant impact while meeting your corporate social responsibility
                  goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  We offer various partnership opportunities for businesses of all sizes. Our corporate partners receive
                  recognition, employee engagement opportunities, and the satisfaction of making a meaningful
                  difference.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="company-name" className="text-sm font-medium">
                      Company Name
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      placeholder="Enter company name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-person" className="text-sm font-medium">
                      Contact Person
                    </label>
                    <input
                      id="contact-person"
                      type="text"
                      placeholder="Enter name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="Enter email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>
                  <Button className="w-full">Request Partnership Information</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mx-auto max-w-4xl bg-muted p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Other Ways to Support</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>In-Kind Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>We accept donations of goods and services that support our programs, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Office supplies and equipment</li>
                <li>Educational materials</li>
                <li>Professional services</li>
                <li>Event space</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Us About In-Kind Donations
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legacy Giving</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Make a lasting impact by including NAPOWA in your estate planning. Legacy gifts help ensure our work
                continues for generations to come.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Learn About Legacy Giving
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
