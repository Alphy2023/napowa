"use client"
import React, { useEffect, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import { PageTitle } from "@/components/page-title"
import { useApiClient } from "@/lib/api/client"
import { ContactUsSettings } from "@/schemas/contactUs.schema" 
import { INITIAL_DEFAULT_CONTACT_SETTINGS } from "@/constants/mock-data" 
import Image from "next/image" 
import ContactUsLoading from "../loading"
import { contactUsApi } from "@/lib/api"
import { ContactUsForm } from "./contact-us-form"

export default function ContactUsClient() {
    const apiClient = useApiClient();
    const [isLoading, setIsLoading] = React.useState(true);

    // Infer the specific section types from the discriminated union
    type EmailSection = Extract<ContactUsSettings['sections'][number], { id: 'emailSection' }>
    type CallUsSection = Extract<ContactUsSettings['sections'][number], { id: 'callUsSection' }>
    type VisitUsSection = Extract<ContactUsSettings['sections'][number], { id: 'visitUsSection' }>
    
    const [contactData, setContactData] = React.useState<ContactUsSettings>(
        INITIAL_DEFAULT_CONTACT_SETTINGS
    );

    const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    try {
        const { data, message, success } = await contactUsApi.getContactSettings();

        if (success && data) {
        setContactData(data);
        } else {
        console.error("Failed to load contact settings:", message);
        }
    } catch (error) {
        console.error("Error fetching contact settings:", error);
    } finally {
        setIsLoading(false);
    }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    // Helper to find a section by its ID
    const findSection = useCallback((id: string) => {
        return contactData.sections.find(section => section?.id === id);
    }, [contactData.sections]);


    const emailSection = findSection("emailSection") as EmailSection | undefined;
    const callUsSection = findSection("callUsSection") as CallUsSection | undefined;
    const visitUsSection = findSection("visitUsSection") as VisitUsSection | undefined;

    return (
      <>
      {isLoading ? (
        <ContactUsLoading/>
      ): (

        <div className="container py-12 md:py-16">
            {/* Page Title & Description */}
            <PageTitle
                title={contactData.pageTitle || "Contact Us"}
                description={contactData.pageDescription || "Have questions or want to get involved? We'd love to hear from you."}
            />

            <div className="grid gap-8 md:grid-cols-3 mb-16">
                {/* Email Us Card */}
                {emailSection && (
                    <Card className="flex flex-col">
                        <CardHeader>
                            <Mail className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Email Us</CardTitle>
                            <CardDescription>Send us an email and we'll respond as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {emailSection?.fields?.general && (
                                <>
                                    <p className="font-medium">General Inquiries:</p>
                                    <p className="text-muted-foreground mb-2">{emailSection.fields.general}</p>
                                </>
                            )}
                            {emailSection?.fields?.membership && (
                                <>
                                    <p className="font-medium">Membership:</p>
                                    <p className="text-muted-foreground mb-2">{emailSection.fields.membership}</p>
                                </>
                            )}
                            {emailSection?.fields?.donations && (
                                <>
                                    <p className="font-medium">Donations:</p>
                                    <p className="text-muted-foreground">{emailSection.fields.donations}</p>
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Call Us Card */}
                {callUsSection && (
                    <Card className="flex flex-col">
                        <CardHeader>
                            <Phone className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Call Us</CardTitle>
                            <CardDescription>Speak directly with our team during business hours.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {callUsSection.fields.mainOffice && (
                                <>
                                    <p className="font-medium">Main Office:</p>
                                    <p className="text-muted-foreground mb-2">{callUsSection.fields.mainOffice}</p>
                                </>
                            )}
                            {callUsSection.fields.hotline && (
                                <>
                                    <p className="font-medium">Support Hotline:</p>
                                    <p className="text-muted-foreground mb-2">{callUsSection.fields.hotline}</p>
                                </>
                            )}
                            {callUsSection.fields.hours && (
                                <p className="text-sm text-muted-foreground mt-4">
                                    Our phone lines are open Monday to Friday, {callUsSection.fields.hours.start} to {callUsSection.fields.hours.end} EAT.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Visit Us Card */}
                {visitUsSection && (
                    <Card className="flex flex-col">
                        <CardHeader>
                            <MapPin className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Visit Us</CardTitle>
                            <CardDescription>Our headquarters is located in Nairobi.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {visitUsSection?.fields?.hq && (
                                <>
                                    <p className="font-medium">Headquarters:</p>
                                    <p className="text-muted-foreground">
                                        {visitUsSection.fields?.hq}
                                        <br />
                                        {visitUsSection.fields?.street}
                                        <br />
                                        {visitUsSection.fields?.city}, Kenya
                                    </p>
                                </>
                            )}
                            {visitUsSection?.fields?.officeHours && (
                                <p className="text-sm text-muted-foreground mt-4">
                                    Office hours: Monday to Friday, {visitUsSection.fields.officeHours.start} to {visitUsSection.fields.officeHours.end} EAT.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
            {/* Send Us a Message Form (remains static for now as it's not part of settings) */}
            <ContactUsForm
                visitUsSection={visitUsSection}
                showFaqs={contactData?.showFaqs}
            />

            {/* Connect With Us Section */}
            {contactData?.showConnect && contactData?.socialLinks 
            && contactData?.socialLinks?.length > 0 && (
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">Connect With Us</h2>
                    <div className="flex justify-center space-x-6">
                        {contactData?.socialLinks?.map((social) => (
                            <Button key={social?.platform} 
                            variant="outline" size="icon" className="h-12 w-12 rounded-full" asChild>
                                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                                    <span className="sr-only">{social?.platform}</span>
                                    {/* You'll need actual icons for each social media platform */}
                                    {/* For example, if you have SVG icons or use a library like Lucide React for social icons: */}
                                    {social.platform === 'facebook' && <Image src="/images/icons/facebook.png" alt="Facebook" width={24} height={24} className="h-6 w-6" />}
                                    {social.platform === 'twitter' && <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} className="h-6 w-6" />}
                                    {social.platform === 'instagram' && <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} className="h-6 w-6" />}
                                    {social.platform === 'youtube' && <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} className="h-6 w-6" />}
                                    {social.platform === 'linkedin' && <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className="h-6 w-6" />}
                                    {/* Fallback for other platforms or a generic icon */}
                                    {!['facebook', 'twitter', 'instagram', 'youtube', 'linkedin'].includes(social.platform) && (
                                        <div className="h-6 w-6 bg-foreground/80" />
                                    )}
                                </a>
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}
      </>
    );
}