"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save, Facebook, Twitter, Linkedin, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useProfileSettings } from "@/hooks/useProfileSettings"
import { accountSettingsSchema, type AccountSettingsValues } from "@/schemas/profile.schema"
import type { ConnectedAccount } from "@/types/profile"

export const AccountSettings = () => {
  const { toast } = useToast()
  const { profile, loading, error, isSaving, 
    updateAccountSettings, connectSocialAccount, 
    disconnectSocialAccount } =
    useProfileSettings()
  const [isConnecting, setIsConnecting] = useState<Record<string, boolean>>({})

  // Initialize form with react-hook-form and zod validation
  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<AccountSettingsValues>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      language: "en",
      timezone: "UTC",
      connectedAccounts: [],
      emailNotifications: true,
      pushNotifications: true,
    },
  })

  // Watch form values
  const language = watch("language")
  const timezone = watch("timezone")
  const emailNotifications = watch("emailNotifications")
  const pushNotifications = watch("pushNotifications")

  // Update form values when profile data is loaded
  useEffect(() => {
    if (profile) {
      reset({
        language: profile.language || "en",
        timezone: profile.timezone || "UTC",
        connectedAccounts: profile.connectedAccounts || [],
        emailNotifications: profile.emailNotifications !== undefined ? profile.emailNotifications : true,
        pushNotifications: profile.pushNotifications !== undefined ? profile.pushNotifications : true,
      })
    }
  }, [profile, reset])

  // Handle form submission
  const onSubmit = async (data: AccountSettingsValues) => {
    const result = await updateAccountSettings(data)
    if (result) {
      // Reset form dirty state
      reset(data)
    }
  }

  // Handle social account connection
  const handleConnectAccount = async (provider: string) => {
    setIsConnecting((prev) => ({ ...prev, [provider]: true }))
    try {
      const isConnected = await connectSocialAccount(provider)
      if (isConnected) {
        // Update the form state with the new connected account
        const currentAccounts = watch("connectedAccounts") || []
        const existingIndex = currentAccounts.findIndex((acc) => acc.provider === provider)

        if (existingIndex >= 0) {
          const updatedAccounts = [...currentAccounts]
          updatedAccounts[existingIndex] = {
            ...updatedAccounts[existingIndex],
            isConnected: true,
            lastConnected: new Date().toISOString(),
          }
          setValue("connectedAccounts", updatedAccounts, { shouldDirty: true })
        } else {
          const newAccount: ConnectedAccount = {
            provider,
            isConnected: true,
            accountId: `${provider}-${Date.now()}`,
            lastConnected: new Date().toISOString(),
          }
          setValue("connectedAccounts", [...currentAccounts, newAccount], { shouldDirty: true })
        }
      }
    } finally {
      setIsConnecting((prev) => ({ ...prev, [provider]: false }))
    }
  }

  // Handle social account disconnection
  const handleDisconnectAccount = async (provider: string) => {
    setIsConnecting((prev) => ({ ...prev, [provider]: true }))
    try {
      const isDisconnected = await disconnectSocialAccount(provider)
      if (isDisconnected) {
        // Update the form state
        const currentAccounts = watch("connectedAccounts") || []
        const updatedAccounts = currentAccounts.map((acc) =>
          acc.provider === provider ? { ...acc, isConnected: false } : acc,
        )
        setValue("connectedAccounts", updatedAccounts, { shouldDirty: true })
      }
    } finally {
      setIsConnecting((prev) => ({ ...prev, [provider]: false }))
    }
  }

  // Check if a social account is connected
  const isAccountConnected = (provider: string): boolean => {
    const accounts = watch("connectedAccounts") || []
    return accounts.some((acc) => acc.provider === provider && acc.isConnected)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading account settings...</span>
      </div>
    )
  }

  if (error && !profile) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
        <h3 className="text-lg font-semibold mb-2">Failed to load account settings</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={language}
                    onValueChange={(value) => setValue("language", value, { shouldDirty: true })}
                  >
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
                  <Select
                    value={timezone}
                    onValueChange={(value) => setValue("timezone", value, { shouldDirty: true })}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Nairobi">East Africa Time (EAT)</SelectItem>
                      <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="text-base">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications about account activity</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={(checked) => setValue("emailNotifications", checked, { shouldDirty: true })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications" className="text-base">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={pushNotifications}
                    onCheckedChange={(checked) => setValue("pushNotifications", checked, { shouldDirty: true })}
                  />
                </div>
              </div>

              <Separator />

              <h3 className="text-lg font-medium">Connected Accounts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Facebook className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-xs text-muted-foreground">
                        {isAccountConnected("facebook") ? "Connected" : "Not Connected"}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={isAccountConnected("facebook") ? "destructive" : "outline"}
                    size="sm"
                    onClick={() =>
                      isAccountConnected("facebook")
                        ? handleDisconnectAccount("facebook")
                        : handleConnectAccount("facebook")
                    }
                    disabled={isConnecting["facebook"]}
                  >
                    {isConnecting["facebook"] ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : isAccountConnected("facebook") ? (
                      "Disconnect"
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Twitter className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-xs text-muted-foreground">
                        {isAccountConnected("twitter") ? "Connected" : "Not Connected"}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={isAccountConnected("twitter") ? "destructive" : "outline"}
                    size="sm"
                    onClick={() =>
                      isAccountConnected("twitter")
                        ? handleDisconnectAccount("twitter")
                        : handleConnectAccount("twitter")
                    }
                    disabled={isConnecting["twitter"]}
                  >
                    {isConnecting["twitter"] ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : isAccountConnected("twitter") ? (
                      "Disconnect"
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-xs text-muted-foreground">
                        {isAccountConnected("linkedin") ? "Connected" : "Not Connected"}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant={isAccountConnected("linkedin") ? "destructive" : "outline"}
                    size="sm"
                    onClick={() =>
                      isAccountConnected("linkedin")
                        ? handleDisconnectAccount("linkedin")
                        : handleConnectAccount("linkedin")
                    }
                    disabled={isConnecting["linkedin"]}
                  >
                    {isConnecting["linkedin"] ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : isAccountConnected("linkedin") ? (
                      "Disconnect"
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              {isDirty && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  You have unsaved changes
                </p>
              )}
            </div>
            <Button type="submit" disabled={isSaving || !isDirty}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
