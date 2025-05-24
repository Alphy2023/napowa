"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, Phone, MapPin, Shield, CalendarIcon, Edit, Trash, UserPlus, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample member data
const memberData = {
  id: "1",
  firstName: "Jane",
  lastName: "Muthoni",
  email: "jane.muthoni@example.com",
  phone: "+254 712 345 678",
  location: "Nairobi",
  status: "active",
  role: "Member",
  joinDate: "2022-03-15",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Jane is a dedicated member of NAPOWA with a background in community organizing and event planning. She has been actively involved in various initiatives to support police wives and their families.",
  address: {
    street: "123 Kimathi Street",
    city: "Nairobi",
    county: "Nairobi County",
    postalCode: "00100",
  },
  emergencyContact: {
    name: "John Muthoni",
    relationship: "Husband",
    phone: "+254 723 456 789",
  },
  skills: ["Event Planning", "Fundraising", "Community Outreach"],
  committees: ["Events Committee", "Welfare Committee"],
  contributions: [
    { type: "Volunteer Hours", amount: "120 hours", date: "2023-01-15" },
    { type: "Donation", amount: "KES 5,000", date: "2023-03-22" },
  ],
  events: [
    { name: "Annual General Meeting", role: "Participant", date: "2023-04-10" },
    { name: "Skills Workshop", role: "Organizer", date: "2023-02-15" },
  ],
}

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")

  // Form state
  const [firstName, setFirstName] = useState(memberData.firstName)
  const [lastName, setLastName] = useState(memberData.lastName)
  const [email, setEmail] = useState(memberData.email)
  const [phone, setPhone] = useState(memberData.phone)
  const [location, setLocation] = useState(memberData.location)
  const [status, setStatus] = useState(memberData.status)
  const [role, setRole] = useState(memberData.role)
  const [bio, setBio] = useState(memberData.bio)
  const [street, setStreet] = useState(memberData.address.street)
  const [city, setCity] = useState(memberData.address.city)
  const [county, setCounty] = useState(memberData.address.county)
  const [postalCode, setPostalCode] = useState(memberData.address.postalCode)
  const [emergencyName, setEmergencyName] = useState(memberData.emergencyContact.name)
  const [emergencyRelationship, setEmergencyRelationship] = useState(memberData.emergencyContact.relationship)
  const [emergencyPhone, setEmergencyPhone] = useState(memberData.emergencyContact.phone)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Member profile has been updated successfully.",
    })
  }

  const handleDeleteMember = () => {
    // In a real implementation, you would show a confirmation dialog
    toast({
      title: "Member deleted",
      description: "The member has been deleted successfully.",
    })
    router.push("/dashboard/members")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Member Details</h2>
          <p className="text-muted-foreground">View and manage member information.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Members
          </Button>
          <Button variant="destructive" onClick={handleDeleteMember}>
            <Trash className="mr-2 h-4 w-4" />
            Delete Member
          </Button>
          <Button asChild>
            <a href={`/dashboard/members/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Member
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Member sidebar */}
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={memberData.avatar || "/placeholder.svg"}
                  alt={`${memberData.firstName} ${memberData.lastName}`}
                />
                <AvatarFallback>
                  {memberData.firstName.charAt(0)}
                  {memberData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-2xl font-bold">
                {memberData.firstName} {memberData.lastName}
              </h3>
              <Badge variant={memberData.status === "active" ? "default" : "secondary"} className="mt-2">
                {memberData.status === "active" ? "Active" : "Inactive"}
              </Badge>
              <p className="mt-1 text-sm text-muted-foreground">{memberData.role}</p>

              <Separator className="my-4" />

              <div className="w-full space-y-3 text-left">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{memberData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{memberData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{memberData.location}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined {new Date(memberData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="w-full">
                <h4 className="mb-2 text-sm font-medium">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {memberData.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              <div className="w-full">
                <h4 className="mb-2 text-sm font-medium">Committees</h4>
                <div className="flex flex-wrap gap-1">
                  {memberData.committees.map((committee) => (
                    <Badge key={committee} variant="outline">
                      {committee}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 w-full">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Member Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Member details */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>View and edit member's personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Member">Member</SelectItem>
                          <SelectItem value="Volunteer">Volunteer</SelectItem>
                          <SelectItem value="Widow">Widow</SelectItem>
                          <SelectItem value="Committee Member">Committee Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="join-date">Join Date</Label>
                      <Input id="join-date" type="date" value={memberData.joinDate} readOnly />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Member's residential address details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="county">County</Label>
                      <Input id="county" value={county} onChange={(e) => setCounty(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input id="postal-code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>Contact information in case of emergency.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-name">Name</Label>
                      <Input
                        id="emergency-name"
                        value={emergencyName}
                        onChange={(e) => setEmergencyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-relationship">Relationship</Label>
                      <Input
                        id="emergency-relationship"
                        value={emergencyRelationship}
                        onChange={(e) => setEmergencyRelationship(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-phone">Phone</Label>
                      <Input
                        id="emergency-phone"
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="contributions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Contributions</CardTitle>
                  <CardDescription>Record of all contributions made by this member.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {memberData.contributions.map((contribution, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{contribution.type}</h3>
                            <p className="text-sm text-muted-foreground">
                              {contribution.amount} • {new Date(contribution.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add New Contribution
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Participation</CardTitle>
                  <CardDescription>Events this member has participated in.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {memberData.events.map((event, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{event.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                              <Shield className="mr-1 h-3 w-3" />
                              <span>{event.role}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Event
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button>
                      <Calendar className="mr-2 h-4 w-4" />
                      Register for Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Member Notes</CardTitle>
                  <CardDescription>Private notes about this member.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Add notes about this member here..." className="min-h-[200px]" />

                  <div className="mt-6 flex justify-end">
                    <Button>Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
