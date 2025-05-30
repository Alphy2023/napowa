import { z } from "zod"


export const NotificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  eventReminders: z.boolean(),
  donationReceipts: z.boolean(),
  newsletterSubscription: z.boolean(),
  announcementNotifications: z.boolean(),
})

export type NotificationSettingsForm = z.infer<typeof NotificationSettingsSchema>