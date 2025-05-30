"use client"

import React, { useCallback, useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { useForm, Controller, useFieldArray, Path } from "react-hook-form" 
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import TimeRange from 'react-time-range'

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa"
import { CustomAlert } from "@/components/CustomAlert"
import { ContactUsSettings } from "@prisma/client"
import { ApiResponse, useApiClient } from "@/lib/api/client"
import { ContactUsSettingsSchema, initialSections} from "@/schemas/contactUs.schema"
import { contactUsApi } from "@/lib/api"


const socialPlatforms = [
  { label: "Facebook", value: "facebook", icon: <FaFacebook /> },
  { label: "Twitter", value: "twitter", icon: <FaTwitter /> },
  { label: "Instagram", value: "instagram", icon: <FaInstagram /> },
  { label: "YouTube", value: "youtube", icon: <FaYoutube /> },
  { label: "LinkedIn", value: "linkedin", icon: <FaLinkedin /> },
]

// Which keys are time fields
const timeKeys = ["hours", "officeHours"]


export const ContactUsPageSettings: React.FC = () => {
  const [error,setError] = React.useState<string>("");
  const { toast } = useToast()

  const form = useForm<ContactUsSettings>({
    resolver: zodResolver(ContactUsSettingsSchema),
    defaultValues: {
      pageTitle: "Contact Us",
      pageDescription: "Have questions or want to get involved? We'd love to hear from you.",
      showFaqs: false,
      showConnect: false,
      socialLinks: [],
      sections: initialSections.map((section) => {
        const fields: Record<string, string | { start: string; end: string }> = {};
        section.fields.forEach(f => {
          if (timeKeys.includes(f.key)) {
            fields[f.key] = { start: "", end: "" };
          } else {
            fields[f.key] = "";
          }
        });
        return {
          id: section.id,
          fields: fields,
        };
      }),
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors,isSubmitting:loading },
    getValues,
    setValue,
  } = form

  // Manage socialLinks array
  const { fields: socialFields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  })
  const [isLoading,setIsLoading] = useState<boolean>(false)


  const onSubmit = async (data: ContactUsSettings) => {
      setError("")
    const res: ApiResponse<ContactUsSettings> = await contactUsApi.createOrUpdateContactSettings(data);
     
    if (!res?.success) {
        toast({
          title: "Error occurred.",
          description: res?.message || res?.errors?.[0]?.message || "Something went wrong.",
        });
        setError(res?.message || res?.errors?.[0]?.message || "Something went wrong.");
        return;
      }
     reset(res?.data || undefined); // Pass undefined if null
      toast({
        title: "Successful.",
        description: res?.message,
      });
       
      
  }

  const showConnect = watch("showConnect");

  const fetchSettings = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, message, success } = await contactUsApi.getContactSettings();

      if (success && data) {
        reset(data);
      } else {
        console.error("Failed to load contact settings:", message);
      }
    } catch (error) {
      console.error("Error fetching contact settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(()=>{
    fetchSettings()
  },[fetchSettings])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us Page</CardTitle>
            <CardDescription>
              Manage how your Contact Us page looks and feels.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Page Title */}
            <FormField
              control={control}
              name="pageTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Page Description */}
            <FormField
              control={control}
              name="pageDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Use initialSections directly here */}
            {initialSections.map((section, secIdx) => (
              <section id={section.id} key={section.id}>
                <Card className="my-4">
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.fields.map((f) => {
                      // Correctly type the paths using Path<FormSchema>
                      const pathStart: Path<ContactUsSettings> = `sections.${secIdx}.fields.${f.key}.start` as Path<ContactUsSettings>;
                      const pathEnd: Path<ContactUsSettings> = `sections.${secIdx}.fields.${f.key}.end` as Path<ContactUsSettings>;
                      const isTime = timeKeys.includes(f.key)

                      if (!isTime) {
                        return (
                          <FormField
                            key={f.key}
                            control={control}
                            // Type the name explicitly using Path<ContactUsSettings>
                            name={`sections.${secIdx}.fields.${f.key}` as Path<ContactUsSettings>}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{f.label}</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    value={field.value as string || ""}
                                    placeholder={f?.placeholder}
                                    type={section.id === "emailSection" ? "email" : (section.id === "callUsSection" ? "tel" : "text")}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )
                      }
                      // <FormField
                      //   control={control}
                      //   name={`sections.${index}.fields.${timeKey}`}
                      //   render={({ field }) => (
                      //     <TimeRange
                      //       startMoment={field.value.start}
                      //       endMoment={field.value.end}
                      //       onStartTimeChange={(start) => setValue(`sections.${index}.fields.${timeKey}.start`, start)}
                      //       onEndTimeChange={(end) => setValue(`sections.${index}.fields.${timeKey}.end`, end)}
                      //     />
                      //   )}
                      // />

                      // Time fields
                      // Use the typed path directly with watch
                      const startVal = watch(pathStart);
                      // compute min for end: start + 1 minute
                      const minEnd = React.useMemo(() => {
                        if (!startVal) return ""
                        const [h, m] = (startVal as string).split(":").map(Number) // Cast startVal to string
                        let mm = m + 1
                        let hh = h
                        if (mm === 60) {
                          hh = (hh + 1) % 24
                          mm = 0
                        }
                        return `${hh.toString().padStart(2, "0")}:${mm
                          .toString()
                          .padStart(2, "0")}`
                      }, [startVal])

                      return (
                        <div key={f.key} className="grid grid-cols-2 gap-4">
                          {/* Start */}
                          <FormField
                            control={control}
                            name={pathStart} // Use the typed path
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{f.label} Start</FormLabel>
                                <FormControl>
                                  <Input
                                    type="time"
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e)
                                      const curEnd = getValues(pathEnd); // Use the typed path
                                      if (curEnd && e.target.value >= curEnd) {
                                        setValue(pathEnd, { start: "", end: "" }); // Correctly set value for time object
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* End */}
                          <FormField
                            control={control}
                            name={pathEnd} // Use the typed path
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{f.label} End</FormLabel>
                                <FormControl>
                                  <Input
                                    type="time"
                                    {...field}
                                    min={minEnd || undefined}
                                    disabled={!startVal}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </section>
            ))}

            {/* Show FAQs */}
            <FormField
              control={control}
              name="showFaqs"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Frequently Asked Questions</Label>
                    <p className="text-sm text-muted-foreground">
                      Show FAQs on this page
                    </p>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />

            {/* Show Connect */}
            <FormField
              control={control}
              name="showConnect"
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Connect with Us</Label>
                    <p className="text-sm text-muted-foreground">
                      Show social platforms on this page
                    </p>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />

            {/* Dynamic Social Links */}
            {showConnect && (
              <div className="space-y-4">
                <FormLabel>Social Links</FormLabel>
                {socialFields.map((f, idx) => (
                  <div key={f.id} className="grid grid-cols-2 gap-4 items-end">
                    {/* Platform */}
                    <FormField
                      control={control}
                      name={`socialLinks.${idx}.platform`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Platform</FormLabel>
                          <FormControl>
                            <select
                              className="w-full border rounded px-2 py-1"
                              {...field}
                            >
                              <option value="">Select platform</option>
                              {socialPlatforms.map((p) => (
                                <option key={p.value} value={p.value}>
                                  {p.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* URL */}
                    <FormField
                      control={control}
                      name={`socialLinks.${idx}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Link URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://..." />
                          </FormControl>
                          <FormDescription>Must be a valid URL.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Remove button */}
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => remove(idx)}
                      className="col-span-2 text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ platform: "", url: "" })}
                >
                  + Add Another Social Link
                </Button>
              </div>
            )}
             {error && (
                <CustomAlert variant={"destructive"} text={error}/>
              )}
            
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit"
            loading={loading}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}