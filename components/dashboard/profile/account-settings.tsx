"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import {
  Save,
 
} from "lucide-react"

export const AccountSettings = () => {
    const [language, setLanguage] = React.useState<string>("en")
    const [timezone, setTimezone] = React.useState("Africa/Nairobi")


    const handleSaveAccount = ()=>{
        
    }
  return (
    <div>
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
            Save changes
        </Button>
        </CardFooter>
    </Card>
    </div>
  )
}
