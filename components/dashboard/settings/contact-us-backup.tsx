"use client"

import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from "@/components/ui/form"
import {
  useForm,
  Controller,
  useFieldArray
} from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Helper: ensure end > start (HH:mm strings)
const isEndTimeGreater = (start: string, end: string) => {
  if (!start || !end) return true
  return start < end
}

// Social platforms (label, value, icon)
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin
} from "react-icons/fa"
const socialPlatforms = [
  { label: "Facebook", value: "facebook", icon: <FaFacebook /> },
  { label: "Twitter", value: "twitter", icon: <FaTwitter /> },
  { label: "Instagram", value: "instagram", icon: <FaInstagram /> },
  { label: "YouTube", value: "youtube", icon: <FaYoutube /> },
  { label: "LinkedIn", value: "linkedin", icon: <FaLinkedin /> }
]

// Section definition
type SectionType = {
  id: "emailSection" | "callUsSection" | "visitUsSection"
  title: string
  description?: string
  fields: { label: string; key: string, placeholder?:string}[]
}

// Which keys are time fields
const timeKeys = ["hours", "officeHours"]

// Zod schemas
const socialLinkSchema = z.object({
  platform: z.enum(socialPlatforms.map(p => p.value) as [string, ...string[]], {
    required_error: "Platform required"
  }),
  url: z.string().url("Must be a valid URL"),
})

const fieldValueSchema = z.union([
  z.string().min(1, "Required"),
  z.object({
      start: z.string().min(1, "Start time required"),
      end: z.string().min(1, "End time required")
    })
    .refine((d) => isEndTimeGreater(d.start, d.end), {
      message: "End time must be after start time",
      path: ["end"]
    })
])

const formSchema = z.object({
  pageTitle: z.string().min(1, "Title required"),
  pageDescription: z.string().min(1, "Description required"),
  showFaqs: z.boolean(),
  showConnect: z.boolean(),
  socialLinks: z.array(socialLinkSchema).optional(),
  sections: z.array(
    z.object({
      id: z.enum(["emailSection", "callUsSection", "visitUsSection"]),
      fields: z.record(fieldValueSchema)
    })
  )
})

type FormSchema = z.infer<typeof formSchema>

// Initial sections data
const initialSections: SectionType[] = [
  {
    id: "emailSection",
    title: "Email Us",
    description: "Send us an email and we'll respond as soon as possible.",
    fields: [
      { label: "General Inquiries", key: "general", 
        placeholder:"info@napowa.org",},
      { label: "Membership", key: "membership",placeholder:"membership@napowa.org" },
      { label: "Donations", key: "donations",placeholder:"donation@napowa.org" }
    ]
  },
  {
    id: "callUsSection",
    title: "Call Us",
    description: "Speak directly with our team during business hours.",
    fields: [
      { label: "Main Office", key: "mainOffice", placeholder:"+254 700 111 000" },
      { label: "Support Hotline", key: "hotline", placeholder:"+254 700 101 001"},
      { label: "Operating Hours", key: "hours" }
    ]
  },
  {
    id: "visitUsSection",
    title: "Visit Us",
    description: "Our headquarters is located in Nairobi.",
    fields: [
      { label: "Headquarters Name", key: "hq",placeholder:"NAPOWA House" },
      { label: "Street Address", key: "street", placeholder:"Jogoo Road"},
      { label: "City", key: "city",placeholder:"Nairobi, Kenya" },
      { label: "Office Hours", key: "officeHours" }
    ]
  }
]

// Sortable wrapper
const SortableSection: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

export const ContactUsPageSettings: React.FC = () => {
  const [sections, setSections] = useState(initialSections)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageTitle: "Contact Us",
      pageDescription:
        "Have questions or want to get involved? We'd love to hear from you.",
      showFaqs: false,
      showConnect: false,
      socialLinks: [],
      sections: initialSections.map((section) => ({
        id: section.id,
        fields: section.fields.reduce((acc, f) => {
          acc[f.key] = timeKeys.includes(f.key)
            ? { start: "", end: "" }
            : ""
          return acc
        }, {} as Record<string, string | { start: string; end: string }>)
      }))
    }
  })

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue
  } = form

  // Manage socialLinks array
  const { fields: socialFields, append, remove } = useFieldArray({
    control,
    name: "socialLinks"
  })

  // DnD-kit sensors
  const sensors = useSensors(useSensor(PointerSensor))

  const onDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id)
      const newIndex = sections.findIndex((s) => s.id === over?.id)
      const newSecs = arrayMove(sections, oldIndex, newIndex)
      setSections(newSecs)
      // reorder form.sections accordingly
      const vals = getValues("sections")
      const newVals = newSecs.map((s) => vals.find((v) => v.id === s.id)!)
      setValue("sections", newVals)
    }
  }

  const onSubmit = (data: FormSchema) => {
    console.log("FORM DATA:", data)
  }

  const showConnect = watch("showConnect")

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

            {/* Sections Drag & Drop */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {sections.map((section, secIdx) => (
                  <SortableSection id={section.id} key={section.id}>
                    <Card className="my-4">
                      <CardHeader>
                        <CardTitle>{section.title}</CardTitle>
                        <CardDescription>
                          {section.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {section.fields.map((f) => {
                          const pathStart = `sections.${secIdx}.fields.${f.key}.start` as const
                          const pathEnd = `sections.${secIdx}.fields.${f.key}.end` as const
                          const isTime = timeKeys.includes(f.key)

                          if (!isTime) {
                            return (
                              <FormField
                                key={f.key}
                                control={control}
                                name={`sections.${secIdx}.fields.${f.key}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{f.label}</FormLabel>
                                    <FormControl>
                                      <Input {...field} 
                                        placeholder={f?.placeholder}

                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )
                          }

                          // Time fields
                          const startVal = watch(pathStart)
                          // compute min for end: start + 1 minute
                          const minEnd = React.useMemo(() => {
                            if (!startVal) return ""
                            const [h, m] = startVal.split(":").map(Number)
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
                            <div
                              key={f.key}
                              className="grid grid-cols-2 gap-4"
                            >
                              {/* Start */}
                              <FormField
                                control={control}
                                name={pathStart}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{f.label} Start</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="time"
                                        {...field}
                                        onChange={(e) => {
                                          field.onChange(e)
                                          // clear end if invalid
                                          const curEnd = getValues(pathEnd)
                                          if (curEnd && e.target.value >= curEnd) {
                                            setValue(pathEnd, "")
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
                                name={pathEnd}
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
                  </SortableSection>
                ))}
              </SortableContext>
            </DndContext>

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
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
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
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />

            {/* Dynamic Social Links */}
            {showConnect && (
              <div className="space-y-4">
                <FormLabel>Social Links</FormLabel>
                {socialFields.map((f, idx) => (
                  <div
                    key={f.id}
                    className="grid grid-cols-2 gap-4 items-end"
                  >
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
                          <FormDescription>
                            Must be a valid URL.
                          </FormDescription>
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
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
