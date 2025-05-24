"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, User } from "lucide-react"

export default function AddMemberPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Member",
    status: "active",
    location: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    joinDate: new Date().toISOString().split("T")[0],
    bio: "",
    skills: [],
    receiveEmails: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Member added successfully",
        description: "The new member has been added to the system.",
      })
      router.push("/dashboard/members")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/members">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add New Member</h2>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Enter the member's personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="relative h-24 w-24 rounded-full border-2 border-dashed border-muted-foreground/25 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload photo</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Upload a profile photo</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
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
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => handleSelectChange("location", value)}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nairobi">Nairobi</SelectItem>
                      <SelectItem value="Mombasa">Mombasa</SelectItem>
                      <SelectItem value="Kisumu">Kisumu</SelectItem>
                      <SelectItem value="Nakuru">Nakuru</SelectItem>
                      <SelectItem value="Eldoret">Eldoret</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Membership Details</CardTitle>
                  <CardDescription>Set the member's role and status.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Member">Member</SelectItem>
                        <SelectItem value="Volunteer">Volunteer</SelectItem>
                        <SelectItem value="Widow">Widow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <RadioGroup
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange("status", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="active" />
                        <Label htmlFor="active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inactive" id="inactive" />
                        <Label htmlFor="inactive">Inactive</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      name="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Brief description about the member"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>Add emergency contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Set communication preferences for this member.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="receiveEmails"
                  checked={formData.receiveEmails}
                  onCheckedChange={(checked) => handleCheckboxChange("receiveEmails", checked as boolean)}
                />
                <Label htmlFor="receiveEmails">Receive email notifications about events and updates</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/members">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding Member..." : "Add Member"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  )
}
