"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { NotificationSettingsForm, NotificationSettingsSchema } from "@/schemas/notificationSettings.schema"
import { CustomAlert } from "@/components/CustomAlert"
import { ApiResponse } from "@/lib/api/client"
import { notificationApi } from "@/lib/api"
import { FIELDTYPES } from "@/lib/utils"
import { InputField } from "@/components/InputField"
import { Form } from "@/components/ui/form"



export const NotificationSettings = () => {
  const { toast } = useToast()
  const [error,setError] = React.useState<string>("");
  

  const form = useForm<NotificationSettingsForm>({
    resolver: zodResolver(NotificationSettingsSchema),
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

  const { handleSubmit, watch, setValue,
    formState: { isSubmitting:loading },
    reset,
   } = form

  const onSubmit = async (values: NotificationSettingsForm) => {
   
    const res: ApiResponse<NotificationSettingsForm> = await notificationApi.createOrUpdateNotificationSettings(values);
         
    if (!res?.success) {
        toast({
            title: "Error occurred.",
            description: res?.message || res?.errors?.[0]?.message || "Something went wrong.",
        });
        setError(res?.message || res?.errors?.[0]?.message || "Something went wrong.");
        return;
        }
        reset(res?.data || undefined); 
        toast({
        title: "Successful.",
        description: res?.message,
        });
           
  }


  // React.useEffect(()=>{

  // },[])
   

  

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
                  disabled={loading}
                  // id={key}
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
                  disabled={loading}
                  // id={key}
                  label={label}
                  description={desc}
                />
              ))}
            </div>

            {error && (
                  <CustomAlert variant={"destructive"} text={error}/>
              )}
                        
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit"
            loading={loading}>
              
              {loading? "Saving..." : (
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


