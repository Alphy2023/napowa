"use client"

import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const schema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  eventReminders: z.boolean(),
  donationReceipts: z.boolean(),
  newsletterSubscription: z.boolean(),
  announcementNotifications: z.boolean(),
})

type NotificationSettingsForm = z.infer<typeof schema>

export const NotificationSettings = () => {
  const { toast } = useToast()
  const form = useForm<NotificationSettingsForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: false,
      eventReminders: true,
      donationReceipts: true,
      newsletterSubscription: true,
      announcementNotifications: true,
    },
  })

  const { register, handleSubmit, watch, setValue } = form
  const watchPush = watch("pushNotifications")

  useEffect(() => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js")
    }
    }, [])
  useEffect(() => {
    if (watchPush) {
      registerPushNotifications().catch(() =>
        toast({ title: "Error", description: "Push registration failed" })
      )
    }
  }, [watchPush])

  const onSubmit = async (values: NotificationSettingsForm) => {
    const res = await fetch("/api/settings/notifications", {
      method: "POST",
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      return toast({
        title: "Error",
        description: "Failed to save notification settings",
        variant: "destructive",
      })
    }

    toast({
      title: "Success",
      description: "Notification settings updated",
    })
  }
   

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications and updates.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Channels</h3>
            {[
              ["Email Notifications", "Receive notifications via email", "emailNotifications"],
              ["SMS Notifications", "Receive notifications via SMS", "smsNotifications"],
              ["Push Notifications", "Receive push notifications on your device", "pushNotifications"],
            ].map(([label, desc, key]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={watch(key as keyof NotificationSettingsForm)}
                  onCheckedChange={(v) => setValue(key as any, v)}
                />
              </div>
            ))}

            <Separator />
            <h3 className="text-lg font-medium">Notification Types</h3>
            {[
              ["Event Reminders", "Receive reminders about upcoming events", "eventReminders"],
              ["Donation Receipts", "Receive receipts for your donations", "donationReceipts"],
              ["Newsletter Subscription", "Receive our monthly newsletter", "newsletterSubscription"],
              ["Announcements", "Receive notifications about important announcements", "announcementNotifications"],
            ].map(([label, desc, key]) => (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{label}</Label>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={watch(key as keyof NotificationSettingsForm)}
                  onCheckedChange={(v) => setValue(key as any, v)}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Preferences
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

// ---- Web Push Registration ----
const registerPushNotifications = async () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error("Push not supported")
  }

  const registration = await navigator.serviceWorker.register("/sw.js")

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
    ),
  })

  await fetch("/api/push/save-subscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  })
}

// ---- VAPID Key Helper ----
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
