"use client"

import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, AlertCircle } from "lucide-react"
import { useProfileSettings } from "@/hooks/useProfileSettings"
import { passwordChangeSchema, type PasswordChangeValues } from "@/schemas/profile.schema"
import { formatDistanceToNow } from "date-fns"

export const SecuritySettings = () => {
  const {
    securitySettings,
    sessions,
    loading,
    isSaving,
    updateSecuritySettings,
    changePassword,
    revokeSession,
    revokeAllSessions,
  } = useProfileSettings()

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isRevokingSession, setIsRevokingSession] = useState<Record<string, boolean>>({})
  const [isRevokingAll, setIsRevokingAll] = useState(false)

  // Password change form
  const passwordForm = useForm<PasswordChangeValues>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Update two-factor state when security settings are loaded
  useEffect(() => {
    if (securitySettings) {
      setTwoFactorEnabled(securitySettings.twoFactorEnabled)
    }
  }, [securitySettings])

  // Handle two-factor toggle
  const handleTwoFactorToggle = async (checked: boolean) => {
    setTwoFactorEnabled(checked)
    await updateSecuritySettings({ twoFactorEnabled: checked })
  }

  // Handle password change
  const handlePasswordChange = async (data: PasswordChangeValues) => {
    const result = await changePassword(data)

    if (result?.success) {
      passwordForm.reset()
    }
  }

  // Handle session revocation
  const handleRevokeSession = async (sessionId: string) => {
    setIsRevokingSession((prev) => ({ ...prev, [sessionId]: true }))
    try {
      await revokeSession(sessionId)
    } finally {
      setIsRevokingSession((prev) => ({ ...prev, [sessionId]: false }))
    }
  }

  // Handle revoking all sessions
  const handleRevokeAllSessions = async () => {
    setIsRevokingAll(true)
    try {
      await revokeAllSessions()
    } finally {
      setIsRevokingAll(false)
    }
  }

  // Format date for display
  const formatSessionDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (e) {
      return dateString
    }
  }

  if (loading && !securitySettings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading security settings...</span>
        </CardContent>
      </Card>
    )
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
                <Switch
                  id="two-factor-auth"
                  checked={twoFactorEnabled}
                  onCheckedChange={handleTwoFactorToggle}
                  disabled={isSaving}
                />
              </div>
              {twoFactorEnabled && (
                <div className="rounded-md bg-muted p-4">
                  <p className="text-sm">
                    Two-factor authentication is enabled. You will receive a verification code via SMS when signing in.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your current password"
                            {...field}
                            disabled={isSaving}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your new password" {...field} disabled={isSaving} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your new password"
                            {...field}
                            disabled={isSaving}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Changing Password...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Login Sessions</h3>
              <div className="rounded-md border">
                {sessions.map((session) => (
                  <React.Fragment key={session.id}>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {session.isCurrentSession ? "Current Session" : "Previous Session"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {session.location} • {session.browser} on {session.device}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Started {formatSessionDate(session.lastActive)}
                          </p>
                        </div>
                        {session.isCurrentSession ? (
                          <Badge>Active</Badge>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevokeSession(session.id)}
                            disabled={isRevokingSession[session.id]}
                          >
                            {isRevokingSession[session.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : "Revoke"}
                          </Button>
                        )}
                      </div>
                    </div>
                    {session !== sessions[sessions.length - 1] && <Separator />}
                  </React.Fragment>
                ))}
              </div>
              <Button variant="outline" className="w-full" onClick={handleRevokeAllSessions} disabled={isRevokingAll}>
                {isRevokingAll ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Out...
                  </>
                ) : (
                  "Sign Out of All Sessions"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <div className="text-sm text-muted-foreground">
            <AlertCircle className="inline h-4 w-4 mr-1" />
            For security reasons, some actions may require re-authentication
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
