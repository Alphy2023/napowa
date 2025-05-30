"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


export const ProfileSettings = () => {
    const { toast } = useToast()
    const router = useRouter()
     // Profile settings
      const [firstName, setFirstName] = useState("Jane")
      const [lastName, setLastName] = useState("Muthoni")
      const [email, setEmail] = useState("jane.muthoni@example.com")
      const [phone, setPhone] = useState("+254 712 345 678")
      const [bio, setBio] = useState("NAPOWA Administrator and Community Coordinator")
      const [profileImage, setProfileImage] = useState("/placeholder.svg?height=128&width=128")
    
      // Form submission handlers
      const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault()
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
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
    <div>
        <form onSubmit={handleSaveProfile}>
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
    </div>
  )
}
