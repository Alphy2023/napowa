import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Handshake, Building, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Partner With Us | NAPOWA",
  description: "Explore partnership opportunities with NAPOWA to support police wives and widows across Kenya.",
}

export default function PartnerPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Partner With NAPOWA</h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          Join forces with us to create meaningful impact for police wives and widows across Kenya through strategic
          partnerships.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <Card className="flex flex-col">
          <CardHeader>
            <Building className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Corporate Partnerships</CardTitle>
            <CardDescription>Align your business with our mission and values.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p>
              Partner with NAPOWA to fulfill your corporate social responsibility goals while making a meaningful
              difference in communities across Kenya.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <Globe className="h-10 w-10 text-primary mb-2" />
            <CardTitle>NGO Collaborations</CardTitle>
            <CardDescription>Join forces with like-minded organizations.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p>
              We believe in the power of collaboration. Partner with us to amplify our collective impact through joint
              programs and initiatives.
            </p>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <Handshake className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Government Partnerships</CardTitle>
            <CardDescription>Work with us on policy and program implementation.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p>
              We collaborate with government agencies to develop and implement policies and programs that support police
              families across Kenya.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto max-w-4xl mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Partnership Opportunities</h2>

        <Tabs defaultValue="corporate">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="corporate">Corporate</TabsTrigger>
            <TabsTrigger value="ngo">NGOs</TabsTrigger>
            <TabsTrigger value="government">Government</TabsTrigger>
          </TabsList>

          <TabsContent value="corporate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Corporate Partnership Opportunities</CardTitle>
                <CardDescription>Explore ways your business can partner with NAPOWA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">Financial Support</h3>
                    <p>
                      Provide funding for specific programs or general operations to help us expand our reach and
                      impact.
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Program sponsorship</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Event sponsorship</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Matching gift programs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">In-Kind Support</h3>
                    <p>Donate products, services, or expertise to help us operate more efficiently and effectively.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Pro bono professional services</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Product donations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Technology and equipment</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Employee Engagement</h3>
                    <p>Engage your employees in meaningful volunteer opportunities that support our mission.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Volunteer days</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Skills-based volunteering</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Mentorship programs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Explore Corporate Partnerships</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="ngo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NGO Collaboration Opportunities</CardTitle>
                <CardDescription>Partner with us to amplify our collective impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">Joint Programs</h3>
                    <p>
                      Develop and implement programs together to leverage our complementary strengths and resources.
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Co-designed initiatives</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Shared resources and expertise</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Collaborative impact measurement</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">Knowledge Sharing</h3>
                    <p>
                      Exchange knowledge, best practices, and lessons learned to strengthen our respective
                      organizations.
                    </p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Joint research initiatives</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Training and capacity building</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Community of practice</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Advocacy</h3>
                    <p>Join forces to advocate for policies and practices that support police families and widows.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Joint policy recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Collaborative campaigns</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Stakeholder engagement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Explore NGO Collaborations</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="government" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Government Partnership Opportunities</CardTitle>
                <CardDescription>Collaborate with us on policy and program implementation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">Policy Development</h3>
                    <p>Work with us to develop policies that support the welfare of police families across Kenya.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Policy research and analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Stakeholder consultations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Policy recommendations</span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-2">Program Implementation</h3>
                    <p>Partner with government agencies to implement programs that benefit police wives and widows.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Joint program design</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Resource mobilization</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Monitoring and evaluation</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Capacity Building</h3>
                    <p>Strengthen the capacity of government agencies to better serve police families.</p>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Training and workshops</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Technical assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>Knowledge exchange</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Explore Government Partnerships</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mx-auto max-w-4xl bg-muted p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Partner With Us</h2>

        <form className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization Name</Label>
              <Input id="organization" placeholder="Enter your organization name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization-type">Organization Type</Label>
              <select id="organization-type" className="w-full rounded-md border border-input bg-background px-3 py-2">
                <option value="">Select organization type</option>
                <option value="corporate">Corporate</option>
                <option value="ngo">NGO</option>
                <option value="government">Government</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Contact Person</Label>
              <Input id="contact-name" placeholder="Enter contact person's name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Enter position/title" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="partnership-type">Partnership Interest</Label>
            <select id="partnership-type" className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option value="">Select partnership type</option>
              <option value="financial">Financial Support</option>
              <option value="in-kind">In-Kind Support</option>
              <option value="program">Joint Program</option>
              <option value="advocacy">Advocacy</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Partnership Proposal</Label>
            <Textarea
              id="message"
              placeholder="Please describe how you would like to partner with NAPOWA and what you hope to achieve through this partnership"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Partnership Inquiry
          </Button>
        </form>
      </div>

      <div className="mx-auto max-w-4xl mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Current Partners</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
            <div key={partner} className="flex items-center justify-center p-4 bg-background rounded-lg border">
              <Image
                src={`/placeholder.svg?height=80&width=160`}
                alt={`Partner ${partner}`}
                width={160}
                height={80}
                className="max-h-16 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
