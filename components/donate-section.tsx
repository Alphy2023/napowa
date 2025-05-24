"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Landmark, Phone } from "lucide-react"
// import { PageTitle } from "./page-title"

export function DonateSection() {
  return (
    <div className="bg-[url('/images/landing-image-2.jpg')] 
      bg-fixed bg-cover bg-center container">
      <section className="py-16 md:py-24 bg-black/60 
        backdrop-brightness-75">
        <div className="">
          {/* <PageTitle
          title="Support Our Cause"
          description={`Your donation helps us empower more police 
              wives and widows across Kenya. Every contribution makes a
              difference.`}
          /> */}
          <div className="mx-auto mb-12 max-w-3xl text-center text-white">
            <h2 className="mb-4 text-3xl font-bold
             tracking-tight md:text-4xl">Support Our Cause</h2>
            <p className="text-white/80">
              Your donation helps us empower more police 
              wives and widows across Kenya. Every contribution makes a
              difference.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Donate Today</CardTitle>
                <CardDescription className="text-center">Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mpesa" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="mpesa">
                      <Phone className="mr-2 h-4 w-4" />
                      M-Pesa
                    </TabsTrigger>
                    <TabsTrigger value="bank">
                      <Landmark className="mr-2 h-4 w-4" />
                      Bank Transfer
                    </TabsTrigger>
                    <TabsTrigger value="card">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Card Payment
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="mpesa" className="mt-4">
                    <div className="space-y-4 text-center">
                      <p>Donate via M-Pesa using our Till Number:</p>
                      <div className="mx-auto w-fit rounded-md bg-muted p-4">
                        <p className="text-xl font-bold">Till Number: 123456</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Go to M-Pesa &gt; Lipa na M-Pesa &gt; Buy Goods and Services &gt; Enter Till Number &gt; Enter
                        Amount &gt; Enter PIN
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="bank" className="mt-4">
                    <div className="space-y-4 text-center">
                      <p>Make a bank transfer to our account:</p>
                      <div className="mx-auto w-fit rounded-md bg-muted p-4 text-left">
                        <p>
                          <strong>Account Name:</strong> National Police Wives Welfare Association
                        </p>
                        <p>
                          <strong>Bank:</strong> Cooperative Bank
                        </p>
                        <p>
                          <strong>Account Number:</strong> 01234567890
                        </p>
                        <p>
                          <strong>Branch:</strong> Main Branch, Nairobi
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="card" className="mt-4">
                    <div className="space-y-4 text-center">
                      <p>Make a secure online donation using your credit or debit card:</p>
                      <Button asChild size="lg" className="w-full">
                        <Link href="/donate">Proceed to Secure Payment</Link>
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to our secure payment gateway.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  For other donation options or to discuss corporate partnerships, please contact us at{" "}
                  <a href="mailto:donations@NAPOWA.org" className="text-primary hover:underline">
                    donations@NAPOWA.org
                  </a>
                </p>
                <Button asChild variant="transparent" className="w-full">
                  <Link href="/donate">Learn More About Donations</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
