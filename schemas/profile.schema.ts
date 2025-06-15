import { z } from "zod"

// Schema for the profile image data from Cloudinary
export const profileImageSchema = z.object({
  url: z.string().url(),
  public_id: z.string(),
  asset_id: z.string(),
  version: z.number(),
  format: z.string(),
  width: z.number(),
  height: z.number(),
  bytes: z.number(),
  original_filename: z.string(),
})

// Schema for education entry
export const educationEntrySchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().optional(),
  field: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
})

// Schema for employment entry
export const employmentEntrySchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  location: z.string().optional(),
})

// Schema for connected account
export const connectedAccountSchema = z.object({
  provider: z.string(),
  isConnected: z.boolean().default(false),
  accountId: z.string().optional(),
  username: z.string().optional(),
  lastConnected: z.string().optional(),
})

// Schema for notification settings
export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
  eventReminders: z.boolean().default(true),
  donationReceipts: z.boolean().default(true),
  newsletterSubscription: z.boolean().default(true),
  announcementNotifications: z.boolean().default(true),
})

// Schema for session data
export const sessionSchema = z.object({
  id: z.string(),
  device: z.string(),
  browser: z.string(),
  location: z.string(),
  ip: z.string().optional(),
  lastActive: z.string(),
  isCurrentSession: z.boolean().default(false),
})

// Schema for security settings
export const securitySettingsSchema = z.object({
  twoFactorEnabled: z.boolean().default(false),
  sessions: z.array(sessionSchema).optional(),
})

// Schema for privacy settings
export const privacySettingsSchema = z.object({
  profileVisibility: z.enum(["public", "members", "private"]).default("members"),
  showEmail: z.boolean().default(false),
  showPhone: z.boolean().default(false),
  allowMessaging: z.boolean().default(true),
  allowTagging: z.boolean().default(true),
})

// Schema for password change
export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Schema for the profile form
export const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  profileImage: profileImageSchema.nullable().optional(),
  address: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  county: z.string().nullable().optional(),
  postalCode: z.string().nullable().optional(),
  skills: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]),
  education: z.array(educationEntrySchema).default([]),
  employment: z.array(employmentEntrySchema).default([]),
})

// Schema for account settings
export const accountSettingsSchema = z.object({
  language: z.string().default("en"),
  timezone: z.string().default("UTC"),
  connectedAccounts: z.array(connectedAccountSchema).default([]),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
export type EducationEntry = z.infer<typeof educationEntrySchema>
export type EmploymentEntry = z.infer<typeof employmentEntrySchema>
export type ConnectedAccount = z.infer<typeof connectedAccountSchema>
export type AccountSettingsValues = z.infer<typeof accountSettingsSchema>
export type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>
export type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>
export type PrivacySettingsValues = z.infer<typeof privacySettingsSchema>
export type PasswordChangeValues = z.infer<typeof passwordChangeSchema>
export type SessionData = z.infer<typeof sessionSchema>
