"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/hooks/use-toast"
import {
  Save,
 
} from "lucide-react"


export const PrivacySettings = () => {
    const { toast } = useToast()

    // Privacy settings
    const [profileVisibility, setProfileVisibility] = useState("members")
    const [showEmail, setShowEmail] = useState(false)
    const [showPhone, setShowPhone] = useState(false)
    const [allowMessaging, setAllowMessaging] = useState(true)
    const [allowTagging, setAllowTagging] = useState(true)

    const handleSavePrivacy = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been updated successfully.",
    })
    }
  return (
    <div>
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
    </div>
  )
}
