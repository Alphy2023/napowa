import { Prisma } from '@prisma/client';
import { z } from 'zod';
import {phoneFieldSchema,emailFieldSchema} from "./custom.schema"

type SectionType = {
  id: "emailSection" | "callUsSection" | "visitUsSection"
  title: string
  description?: string
  fields: { label: string; key: string; placeholder?: string }[]
}
// Helper: ensure end > start (HH:mm strings)
const isEndTimeGreater = (start: string, end: string) => {
  if (!start || !end) return true;
  return start < end;
};

export const contactFormSchema = z.object({
  firstname: z.string().min(2, "First name is required."),
  lastname: z.string().min(2, "Last name is required."),
  email: emailFieldSchema,
  phone: phoneFieldSchema,
  subject: z.string().min(2, "Subject is required."),
  message: z.string().min(2, "Message is required."),
})

export type ContactFormPayload = z.infer<typeof contactFormSchema>

const timeRangeSchema = z.object({
  start: z.string().min(1, "Start time required"),
  end: z.string().min(1, "End time required"),
}).refine((d) => isEndTimeGreater(d.start, d.end), {
  message: "End time must be after start time",
  path: ["end"],
});

export const socialLinkSchema = z.object({
  platform: z.enum(["facebook", "twitter", "instagram", "youtube", "linkedin"], {
    required_error: "Platform required",
  }),
  url: z.string().url("Must be a valid URL"),
});

// Define individual field schemas for each section's specific needs
export const emailSectionFieldsSchema = z.object({
  general: emailFieldSchema,
  membership: emailFieldSchema,
  donations: emailFieldSchema,
});

export const callUsSectionFieldsSchema = z.object({
  mainOffice: phoneFieldSchema,
  hotline: phoneFieldSchema,
  hours: timeRangeSchema,
});

export const visitUsSectionFieldsSchema = z.object({
  hq: z.string().min(1, "Required"),
  street: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  officeHours: timeRangeSchema,
});

export const ContactUsSettingsSchema = z.object({
  pageTitle: z.string().min(1, "Title required"),
  pageDescription: z.string().min(1, "Description required"),
  showFaqs: z.boolean(),
  showConnect: z.boolean(),
  socialLinks: z.array(socialLinkSchema).optional(),
  sections: z.array(
    z.discriminatedUnion("id", [
      z.object({
        id: z.literal("emailSection"),
        fields: emailSectionFieldsSchema,
      }),
      z.object({
        id: z.literal("callUsSection"),
        fields: callUsSectionFieldsSchema,
      }),
      z.object({
        id: z.literal("visitUsSection"),
        fields: visitUsSectionFieldsSchema,
      }),
    ])
  ),
});

export type ContactUsSettings = z.infer<typeof ContactUsSettingsSchema>;

export type PrismaContactUsSettingsInput = {
  pageTitle: string;
  pageDescription: string;
  showFaqs: boolean;
  showConnect: boolean;
  socialLinks?: any; 
  sections: any; 
};
export type PrismaContactUsSettingsOutput = {
  id: string; // From @id @default(cuid())
  pageTitle: string;
  pageDescription: string;
  showFaqs: boolean;
  showConnect: boolean;
  socialLinks: Prisma.JsonValue | null; // Can be null if optional
  sections: Prisma.JsonValue;
  createdAt: Date; // Dates from Prisma are Date objects
  updatedAt: Date;
};


export const initialSections: SectionType[] = [
  {
    id: "emailSection",
    title: "Email Us",
    description: "Send us an email and we'll respond as soon as possible.",
    fields: [
      { label: "General Inquiries", key: "general", placeholder: "info@napowa.org" },
      { label: "Membership", key: "membership", placeholder: "membership@napowa.org" },
      { label: "Donations", key: "donations", placeholder: "donation@napowa.org" },
    ],
  },
  {
    id: "callUsSection",
    title: "Call Us",
    description: "Speak directly with our team during business hours.",
    fields: [
      { label: "Main Office", key: "mainOffice", placeholder: "+254 700 111 000" },
      { label: "Support Hotline", key: "hotline", placeholder: "+254 700 101 001" },
      { label: "Operating Hours", key: "hours" },
    ],
  },
  {
    id: "visitUsSection",
    title: "Visit Us",
    description: "Our headquarters is located in Nairobi.",
    fields: [
      { label: "Headquarters Name", key: "hq", placeholder: "NAPOWA House" },
      { label: "Street Address", key: "street", placeholder: "Jogoo Road" },
      { label: "City", key: "city", placeholder: "Nairobi, Kenya" },
      { label: "Office Hours", key: "officeHours" },
    ],
  },
]