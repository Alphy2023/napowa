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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import {
  Camera,
  Save,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Plus,
  Trash,
  Edit,
  Eye,
  Download,
  Upload,
} from "lucide-react"
import ScrollableTablist from "@/components/scrollable-tablist"
import { LandingPageSettings } from "@/components/dashboard/settings/landing-page-settings"

type TabItem = {
  id:string;
  title:string;
}

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("profile")

  // Profile settings
  const [firstName, setFirstName] = useState("Jane")
  const [lastName, setLastName] = useState("Muthoni")
  const [email, setEmail] = useState("jane.muthoni@example.com")
  const [phone, setPhone] = useState("+254 712 345 678")
  const [bio, setBio] = useState("NAPOWA Administrator and Community Coordinator")
  const [location, setLocation] = useState("Nairobi")
  const [avatar, setAvatar] = useState("/placeholder.svg?height=128&width=128")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [eventReminders, setEventReminders] = useState(true)
  const [donationReceipts, setDonationReceipts] = useState(true)
  const [newsletterSubscription, setNewsletterSubscription] = useState(true)
  const [announcementNotifications, setAnnouncementNotifications] = useState(true)

  // Account settings
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("Africa/Nairobi")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("members")
  const [showEmail, setShowEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)
  const [allowMessaging, setAllowMessaging] = useState(true)
  const [allowTagging, setAllowTagging] = useState(true)

  // Security settings
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Program management
  const [programs, setPrograms] = useState([
    {
      id: "1",
      title: "Education Scholarship Program",
      category: "Education",
      coordinator: "Jane Muthoni",
      status: "active",
      participants: 120,
      budget: 2500000,
    },
    {
      id: "2",
      title: "Health and Wellness Initiative",
      category: "Health",
      coordinator: "Mary Akinyi",
      status: "active",
      participants: 350,
      budget: 1800000,
    },
    {
      id: "3",
      title: "Skills Development Workshop",
      category: "Skills",
      coordinator: "Sarah Wanjiku",
      status: "active",
      participants: 85,
      budget: 1200000,
    },
    {
      id: "4",
      title: "Widows Support Program",
      category: "Support",
      coordinator: "Grace Otieno",
      status: "active",
      participants: 45,
      budget: 1500000,
    },
  ])
  const [newProgram, setNewProgram] = useState({
    title: "",
    category: "",
    coordinator: "",
    status: "active",
    participants: 0,
    budget: 0,
  })
  const [editingProgram, setEditingProgram] = useState(null)
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false)
  const [programDialogMode, setProgramDialogMode] = useState("add") // "add" or "edit"


  const settingTabs: TabItem[] = [
    {
      title:"Profile",
      id:"profile"
    },
    {
      title:"Account",
      id:"account"
    },
    {
      title:"Notifications",
      id:"notifications"
    },
    {
      title:"Privacy",
      id:"privacy"
    },
    {
      title:"Security",
      id:"security"
    },
    {
      title:"Programs",
      id:"programs"
    },
    {
      title:"Volunteers",
      id:"volunteers"
    },
    {
      title:"Landing page",
      id:"landing-page"
    },
  ]
  // Volunteer management
  const [volunteers, setVolunteers] = useState([
    {
      id: "1",
      firstName: "Jane",
      lastName: "Muthoni",
      email: "jane.muthoni@example.com",
      phone: "+254 712 345 678",
      location: "Nairobi",
      status: "active",
      skills: ["Event Planning", "Fundraising"],
    },
    {
      id: "2",
      firstName: "Mary",
      lastName: "Akinyi",
      email: "mary.akinyi@example.com",
      phone: "+254 723 456 789",
      location: "Mombasa",
      status: "active",
      skills: ["Teaching", "Counseling"],
    },
    {
      id: "3",
      firstName: "Sarah",
      lastName: "Wanjiku",
      email: "sarah.wanjiku@example.com",
      phone: "+254 734 567 890",
      location: "Kisumu",
      status: "inactive",
      skills: ["Nursing", "Health Education"],
    },
  ])
  const [newVolunteer, setNewVolunteer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    status: "active",
    skills: "",
  })
  const [editingVolunteer, setEditingVolunteer] = useState(null)
  const [isVolunteerDialogOpen, setIsVolunteerDialogOpen] = useState(false)
  const [volunteerDialogMode, setVolunteerDialogMode] = useState("add") // "add" or "edit"

  // Form submission handlers
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been updated successfully.",
    })
  }

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Account settings updated",
      description: "Your account settings have been updated successfully.",
    })
  }

  const handleSavePrivacy = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been updated successfully.",
    })
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your new password and confirmation match.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    })

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  // Program management handlers
  const handleAddProgram = () => {
    setProgramDialogMode("add")
    setNewProgram({
      title: "",
      category: "",
      coordinator: "",
      status: "active",
      participants: 0,
      budget: 0,
    })
    setIsProgramDialogOpen(true)
  }

  const handleEditProgram = (program) => {
    setProgramDialogMode("edit")
    setEditingProgram(program)
    setNewProgram({
      title: program.title,
      category: program.category,
      coordinator: program.coordinator,
      status: program.status,
      participants: program.participants,
      budget: program.budget,
    })
    setIsProgramDialogOpen(true)
  }

  const handleDeleteProgram = (id) => {
    setPrograms(programs.filter((program) => program.id !== id))
    toast({
      title: "Program deleted",
      description: "The program has been deleted successfully.",
    })
  }

  const handleSaveProgram = () => {
    if (!newProgram.title || !newProgram.category || !newProgram.coordinator) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (programDialogMode === "add") {
      const newId = (programs.length + 1).toString()
      setPrograms([...programs, { id: newId, ...newProgram }])
      toast({
        title: "Program added",
        description: "The program has been added successfully.",
      })
    } else {
      setPrograms(
        programs.map((program) => (program.id === editingProgram.id ? { ...program, ...newProgram } : program)),
      )
      toast({
        title: "Program updated",
        description: "The program has been updated successfully.",
      })
    }

    setIsProgramDialogOpen(false)
  }

  // Volunteer management handlers
  const handleAddVolunteer = () => {
    setVolunteerDialogMode("add")
    setNewVolunteer({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      status: "active",
      skills: "",
    })
    setIsVolunteerDialogOpen(true)
  }

  const handleEditVolunteer = (volunteer) => {
    setVolunteerDialogMode("edit")
    setEditingVolunteer(volunteer)
    setNewVolunteer({
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      email: volunteer.email,
      phone: volunteer.phone,
      location: volunteer.location,
      status: volunteer.status,
      skills: volunteer.skills.join(", "),
    })
    setIsVolunteerDialogOpen(true)
  }

  const handleDeleteVolunteer = (id) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id))
    toast({
      title: "Volunteer deleted",
      description: "The volunteer has been deleted successfully.",
    })
  }

  const handleSaveVolunteer = () => {
    if (!newVolunteer.firstName || !newVolunteer.lastName || !newVolunteer.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const skills = newVolunteer.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)

    if (volunteerDialogMode === "add") {
      const newId = (volunteers.length + 1).toString()
      setVolunteers([
        ...volunteers,
        {
          id: newId,
          ...newVolunteer,
          skills,
        },
      ])
      toast({
        title: "Volunteer added",
        description: "The volunteer has been added successfully.",
      })
    } else {
      setVolunteers(
        volunteers.map((volunteer) =>
          volunteer.id === editingVolunteer.id
            ? {
                ...volunteer,
                ...newVolunteer,
                skills,
              }
            : volunteer,
        ),
      )
      toast({
        title: "Volunteer updated",
        description: "The volunteer has been updated successfully.",
      })
    }

    setIsVolunteerDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <ScrollableTablist
          items={settingTabs}
          noCenter={true}
          />
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={avatar || "/placeholder.svg"} alt="Profile picture" />
                    <AvatarFallback>{firstName.charAt(0) + lastName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    placeholder="Tell us about yourself"
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" onClick={handleSaveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications and updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotifications} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                      <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="event-reminders">Event Reminders</Label>
                        <p className="text-sm text-muted-foreground">Receive reminders about upcoming events</p>
                      </div>
                      <Switch id="event-reminders" checked={eventReminders} onCheckedChange={setEventReminders} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="donation-receipts">Donation Receipts</Label>
                        <p className="text-sm text-muted-foreground">Receive receipts for your donations</p>
                      </div>
                      <Switch id="donation-receipts" checked={donationReceipts} onCheckedChange={setDonationReceipts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newsletter-subscription">Newsletter Subscription</Label>
                        <p className="text-sm text-muted-foreground">Receive our monthly newsletter</p>
                      </div>
                      <Switch
                        id="newsletter-subscription"
                        checked={newsletterSubscription}
                        onCheckedChange={setNewsletterSubscription}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="announcement-notifications">Announcements</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about important announcements
                        </p>
                      </div>
                      <Switch
                        id="announcement-notifications"
                        checked={announcementNotifications}
                        onCheckedChange={setAnnouncementNotifications}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" onClick={handleSaveNotifications}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccount} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Nairobi">East Africa Time (EAT)</SelectItem>
                          <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                          <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Connected Accounts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Facebook</p>
                          <p className="text-xs text-muted-foreground">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Twitter</p>
                          <p className="text-xs text-muted-foreground">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-xs text-muted-foreground">Not Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" onClick={handleSaveAccount}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavePrivacy} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-visibility">Profile Visibility</Label>
                    <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                      <SelectTrigger id="profile-visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can view</SelectItem>
                        <SelectItem value="members">Members Only - Only NAPOWA members can view</SelectItem>
                        <SelectItem value="private">Private - Only you and administrators can view</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-email">Show Email Address</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your email address</p>
                      </div>
                      <Switch id="show-email" checked={showEmail} onCheckedChange={setShowEmail} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-phone">Show Phone Number</Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                      </div>
                      <Switch id="show-phone" checked={showPhone} onCheckedChange={setShowPhone} />
                    </div>
                  </div>

                  <Separator />

                  <h3 className="text-lg font-medium">Interactions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-messaging">Allow Direct Messages</Label>
                        <p className="text-sm text-muted-foreground">Allow others to send you direct messages</p>
                      </div>
                      <Switch id="allow-messaging" checked={allowMessaging} onCheckedChange={setAllowMessaging} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow-tagging">Allow Tagging</Label>
                        <p className="text-sm text-muted-foreground">Allow others to tag you in posts and comments</p>
                      </div>
                      <Switch id="allow-tagging" checked={allowTagging} onCheckedChange={setAllowTagging} />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" onClick={handleSavePrivacy}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor-auth">Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor-auth" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  </div>
                  {twoFactorEnabled && (
                    <div className="rounded-md bg-muted p-4">
                      <p className="text-sm">
                        Two-factor authentication is enabled. You will receive a verification code via SMS when signing
                        in.
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit">Change Password</Button>
                  </form>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Login Sessions</h3>
                  <div className="rounded-md border">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Nairobi, Kenya • Chrome on Windows</p>
                          <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Previous Session</p>
                          <p className="text-sm text-muted-foreground">Nairobi, Kenya • Safari on iPhone</p>
                          <p className="text-xs text-muted-foreground">3 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Sign Out of All Sessions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Program Management</CardTitle>
                <CardDescription>Manage NAPOWA programs and initiatives.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleAddProgram}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Program
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Coordinator</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Budget (KES)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">{program.title}</TableCell>
                        <TableCell>{program.category}</TableCell>
                        <TableCell>{program.coordinator}</TableCell>
                        <TableCell>{program.participants}</TableCell>
                        <TableCell>{program.budget.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={program.status === "active" ? "default" : "secondary"}>
                            {program.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/dashboard/programs/${program.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditProgram(program)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteProgram(program.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Program Add/Edit Dialog */}
          <Dialog open={isProgramDialogOpen} onOpenChange={setIsProgramDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{programDialogMode === "add" ? "Add New Program" : "Edit Program"}</DialogTitle>
                <DialogDescription>
                  {programDialogMode === "add"
                    ? "Add a new program to the NAPOWA platform."
                    : "Edit the program details."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="program-title">Program Title</Label>
                  <Input
                    id="program-title"
                    value={newProgram.title}
                    onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                    placeholder="Enter program title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program-category">Category</Label>
                  <Select
                    value={newProgram.category}
                    onValueChange={(value) => setNewProgram({ ...newProgram, category: value })}
                  >
                    <SelectTrigger id="program-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Skills">Skills</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Youth">Youth</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program-coordinator">Coordinator</Label>
                  <Input
                    id="program-coordinator"
                    value={newProgram.coordinator}
                    onChange={(e) => setNewProgram({ ...newProgram, coordinator: e.target.value })}
                    placeholder="Enter coordinator name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program-participants">Participants</Label>
                    <Input
                      id="program-participants"
                      type="number"
                      value={newProgram.participants}
                      onChange={(e) =>
                        setNewProgram({ ...newProgram, participants: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="program-budget">Budget (KES)</Label>
                    <Input
                      id="program-budget"
                      type="number"
                      value={newProgram.budget}
                      onChange={(e) => setNewProgram({ ...newProgram, budget: Number.parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program-status">Status</Label>
                  <Select
                    value={newProgram.status}
                    onValueChange={(value) => setNewProgram({ ...newProgram, status: value })}
                  >
                    <SelectTrigger id="program-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsProgramDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProgram}>
                  {programDialogMode === "add" ? "Add Program" : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="volunteers" className="mt-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Volunteer Management</CardTitle>
                <CardDescription>Manage NAPOWA volunteers.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleAddVolunteer}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Volunteer
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {volunteers.map((volunteer) => (
                      <TableRow key={volunteer.id}>
                        <TableCell className="font-medium">
                          {volunteer.firstName} {volunteer.lastName}
                        </TableCell>
                        <TableCell>{volunteer.email}</TableCell>
                        <TableCell>{volunteer.phone}</TableCell>
                        <TableCell>{volunteer.location}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {volunteer.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={volunteer.status === "active" ? "default" : "secondary"}>
                            {volunteer.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/dashboard/volunteers/${volunteer.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditVolunteer(volunteer)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteVolunteer(volunteer.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Add/Edit Dialog */}
          <Dialog open={isVolunteerDialogOpen} onOpenChange={setIsVolunteerDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{volunteerDialogMode === "add" ? "Add New Volunteer" : "Edit Volunteer"}</DialogTitle>
                <DialogDescription>
                  {volunteerDialogMode === "add"
                    ? "Add a new volunteer to the NAPOWA platform."
                    : "Edit the volunteer details."}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="volunteer-first-name">First Name</Label>
                    <Input
                      id="volunteer-first-name"
                      value={newVolunteer.firstName}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, firstName: e.target.value })}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volunteer-last-name">Last Name</Label>
                    <Input
                      id="volunteer-last-name"
                      value={newVolunteer.lastName}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, lastName: e.target.value })}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volunteer-email">Email</Label>
                  <Input
                    id="volunteer-email"
                    type="email"
                    value={newVolunteer.email}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volunteer-phone">Phone</Label>
                  <Input
                    id="volunteer-phone"
                    value={newVolunteer.phone}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volunteer-location">Location</Label>
                  <Input
                    id="volunteer-location"
                    value={newVolunteer.location}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, location: e.target.value })}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volunteer-skills">Skills</Label>
                  <Textarea
                    id="volunteer-skills"
                    value={newVolunteer.skills}
                    onChange={(e) => setNewVolunteer({ ...newVolunteer, skills: e.target.value })}
                    placeholder="Enter skills (comma separated)"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter skills separated by commas (e.g., Event Planning, Fundraising, Teaching)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volunteer-status">Status</Label>
                  <Select
                    value={newVolunteer.status}
                    onValueChange={(value) => setNewVolunteer({ ...newVolunteer, status: value })}
                  >
                    <SelectTrigger id="volunteer-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsVolunteerDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveVolunteer}>
                  {volunteerDialogMode === "add" ? "Add Volunteer" : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* landing page settings */}
        <TabsContent value="landing-page" className="mt-6 space-y-6">
         <LandingPageSettings/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
