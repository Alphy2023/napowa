"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

interface EventRegistrationFormProps {
  eventId: string
  eventName: string
}

export function EventRegistrationForm({ eventId, eventName }: EventRegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    specialRequirements: "",
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          ...formData,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(`You have successfully registered for ${eventName}. We'll send confirmation details to your email.`)

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          organization: "",
          specialRequirements: "",
        })
      } else {
        throw new Error(data.message || "Registration failed")
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Registration failed. Please try again later.")
      console.error("Registration error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register for {eventName}</CardTitle>
        <CardDescription>Fill out the form below to secure your spot at this event</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && (
          <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Registration Successful!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mb-4 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Registration Failed</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization (Optional)</Label>
            <Input id="organization" name="organization" value={formData.organization} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Register Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
