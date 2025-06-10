"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactUsApi } from "@/lib/api"
import { InputField } from "@/components/InputField"
import { FIELDTYPES } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContactFormPayload, contactFormSchema } from "@/schemas/contactUs.schema"
import { ContactUsSettings } from "@/schemas/contactUs.schema" 
import { Form } from "@/components/ui/form"
import { ApiResponse } from "@/lib/api/client"


interface ContactUsFormProps{
    visitUsSection?:Extract<ContactUsSettings['sections'][number], { id: 'visitUsSection' }>
    showFaqs:boolean;
}
export const ContactUsForm = ({visitUsSection,showFaqs=false}:ContactUsFormProps) => {
    const [error,setError] = React.useState<string>("");
    const { toast } = useToast()

    const form = useForm<ContactFormPayload>({
        resolver: zodResolver(contactFormSchema),
        mode: "onTouched",
        defaultValues: {
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    const {
    formState: { isSubmitting:loading },
    reset,
   } = form;

   const onSubmit = async (values:ContactFormPayload)=>{
    // console.log(values)
    const res: ApiResponse<ContactFormPayload> = await contactUsApi.createEnquiry(values);
    if (!res?.success) {
        toast({
            title: "Error occurred.",
            description: res?.message || res?.errors?.[0]?.message || "Something went wrong.",
        });
        setError(res?.message || res?.errors?.[0]?.message || "Something went wrong.");
        return; 
    }
     toast({
            title: "Message sent",
            description: res?.message
        });
    reset()
    window.scrollTo(0,0)
   }
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <Form {...form}>
                <form className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <InputField
                            fieldType={FIELDTYPES.INPUT}
                            form={form}
                            type="text"
                            name="firstname"
                            disabled={loading}
                            id="firstname"
                            label="First name"
                            placeholder="Enter your first name"
                        />
                        <InputField
                            fieldType={FIELDTYPES.INPUT}
                            form={form}
                            type="text"
                            name="lastname"
                            disabled={loading}
                            id="lastname"
                            label="Last name"
                            placeholder="Enter your last name"
                        />
                       
                       
                    </div>

                  
                    <InputField
                        fieldType={FIELDTYPES.INPUT}
                        form={form}
                        type="email"
                        name="email"
                        disabled={loading}
                        id="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <InputField
                        fieldType={FIELDTYPES.INPUT}
                        form={form}
                        type="text"
                        name="phone"
                        disabled={loading}
                        id="phone"
                        label="Phone Number"
                        placeholder="eg, +2547 xxxx xxxx"
                    />
                    <InputField
                        fieldType={FIELDTYPES.INPUT}
                        form={form}
                        type="text"
                        name="subject"
                        disabled={loading}
                        id="subject"
                        label="Subject"
                        placeholder="Enter subject"
                    />
                    <InputField
                        fieldType={FIELDTYPES.TEXTAREA}
                        form={form}
                        type="text"
                        name="message"
                        disabled={loading}
                        id="message"
                        label="Message"
                        placeholder="Enter your message"
                    />

                    <Button type="submit" className="w-full"
                    loading={loading}>
                        {loading ? "Sending please wait...." : "Send Message"}
                    </Button>
                </form>
            </Form>
        </div>

        <div>
            {/* Location Section */}
            {visitUsSection && (
                <>
                    <h2 className="text-2xl font-bold mb-6">Our Location</h2>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                    <div className="w-full h-full flex items-center justify-center bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center">
                    <iframe
                        title="Google Map"
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(`${visitUsSection.fields.hq} ${visitUsSection.fields.street} ${visitUsSection.fields.city}`)}&output=embed`}
                    />
                    </div>

                    {/* Floating label on top of the map */}
                    <div className="absolute top-4 left-4 z-10 p-4 rounded-lg bg-white/70 backdrop-blur-sm shadow-md">
                    <p className="font-medium">{visitUsSection?.fields?.hq}</p>
                    <p className="text-sm text-muted-foreground">
                        {visitUsSection?.fields?.street}, {visitUsSection?.fields?.city}
                    </p>
                    </div>
                </div>

                </>
            )}

            {/* FAQ Section */}
            {showFaqs && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                        {/* Currently using static data, but you could fetch this too if it were dynamic */}
                        {[
                            {
                                question: "How can I become a member of NAPOWA?",
                                answer: "Membership is open to all wives and widows of police officers. Visit our membership page or contact our membership office for more information.",
                            },
                            {
                                question: "How can I donate to NAPOWA?",
                                answer: "You can donate through our website, mobile money, or bank transfer. Visit our donation page for more details.",
                            },
                            {
                                question: "Does NAPOWA have branches across Kenya?",
                                answer: "Yes, we have regional chapters across all 47 counties in Kenya. Contact us to find the nearest chapter to you.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="border-b pb-4">
                                <h4 className="font-medium mb-2">{faq.question}</h4>
                                <p className="text-muted-foreground">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}
