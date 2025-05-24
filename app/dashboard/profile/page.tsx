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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")

  // Profile state
  const [firstName, setFirstName] = useState("Jenetrix")
  const [lastName, setLastName] = useState("Otieno")
  const [email, setEmail] = useState("admin@NAPOWA.org")
  const [phone, setPhone] = useState("+254 712 345 678")
  const [bio, setBio] = useState(
    "NAPOWA administrator and community organizer with over 10 years of experience working with women's empowerment initiatives.",
  )
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=128&width=128")

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("Africa/Nairobi")

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  const handleSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real implementation, you would upload the file to a server
      // and get back a URL to display the image
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile & Settings</h2>
        <p className="text-muted-foreground">Manage your account information and preferences.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <form onSubmit={handleProfileUpdate}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profileImage || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback>JO</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center space-y-1">
                      <Label htmlFor="profile-image" className="cursor-pointer text-sm font-medium text-primary">
                        Change photo
                      </Label>
                      <input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>

                  <div className="grid flex-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile. This will be displayed publicly.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter your city" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Input id="county" placeholder="Enter your county" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postal-code">Postal Code</Label>
                    <Input id="postal-code" placeholder="Enter your postal code" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <form onSubmit={handleSettingsUpdate}>
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>Manage your account preferences and settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications about important updates
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">Use dark theme for the dashboard</p>
                      </div>
                      <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Regional Settings</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
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
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Save Settings</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Set Up</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sessions</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Active Sessions</Label>
                      <p className="text-sm text-muted-foreground">Manage your active sessions across devices</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
