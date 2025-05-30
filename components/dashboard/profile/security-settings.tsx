"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { useToast } from "@/hooks/use-toast"


export const SecuritySettings = () => {
    const { toast } = useToast()
    
    const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false)

    // Security settings
    const [currentPassword, setCurrentPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

      
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
  return (
    <div>
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
    </div>
  )
}
