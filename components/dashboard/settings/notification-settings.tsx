"use client"

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2, AlertCircle } from "lucide-react"
import { CustomAlert } from "@/components/CustomAlert"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/InputField"
import { FIELDTYPES } from "@/lib/utils"
import { useProfileSettings } from "@/hooks/useProfileSettings"
import { notificationSettingsSchema, type NotificationSettingsValues } from "@/schemas/profile.schema"

export const NotificationSettings = () => {
  const [error, setError] = React.useState<string>("")
  const { notificationSettings, loading, isSaving,
     updateNotificationSettings } = useProfileSettings()

  const form = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
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

  const { handleSubmit, reset } = form

  // Update form values when notification settings are loaded
  useEffect(() => {
    if (notificationSettings) {
      reset(notificationSettings)
    }
  }, [notificationSettings, reset])

  const onSubmit = async (values: NotificationSettingsValues) => {
    setError("")
    const res = await updateNotificationSettings(values)

    if (!res?.success) {
      setError(res?.message || res?.errors?.[0]?.message || "Something went wrong.")
      return
    }

    // Reset form with the returned data to ensure it reflects the server state
    if (res.data) {
      reset(res.data)
    }
  }

  if (loading && !notificationSettings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications and updates.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading notification settings...</span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications and updates.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Channels</h3>
              {[
                ["Email Notifications", "Receive notifications via email", "emailNotifications"],
                ["SMS Notifications", "Receive notifications via SMS", "smsNotifications"],
                ["Push Notifications", "Receive push notifications on your device", "pushNotifications"],
              ].map(([label, desc, key]) => (
                <InputField
                  key={key}
                  fieldType={FIELDTYPES.SWITCH}
                  form={form}
                  hidePLabel={true}
                  name={key}
                  disabled={isSaving}
                  label={label}
                  description={desc}
                />
              ))}

              <Separator />
              <h3 className="text-lg font-medium">Notification Types</h3>
              {[
                ["Event Reminders", "Receive reminders about upcoming events", "eventReminders"],
                ["Donation Receipts", "Receive receipts for your donations", "donationReceipts"],
                ["Newsletter Subscription", "Receive our monthly newsletter", "newsletterSubscription"],
                ["Announcements", "Receive notifications about important announcements", "announcementNotifications"],
              ].map(([label, desc, key]) => (
                <InputField
                  key={key}
                  fieldType={FIELDTYPES.SWITCH}
                  form={form}
                  hidePLabel={true}
                  name={key}
                  disabled={isSaving}
                  label={label}
                  description={desc}
                />
              ))}
            </div>

            {error && <CustomAlert variant={"destructive"} text={error} />}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {form.formState.isDirty && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  You have unsaved changes
                </p>
              )}
            </div>
            <Button type="submit" loading={isSaving} disabled={!form.formState.isDirty}>
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
