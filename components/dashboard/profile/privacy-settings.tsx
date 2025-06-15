"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2, AlertCircle } from "lucide-react"
import { useProfileSettings } from "@/hooks/useProfileSettings"
import { privacySettingsSchema, type PrivacySettingsValues } from "@/schemas/profile.schema"

export const PrivacySettings = () => {
  const { privacySettings, loading, isSaving, updatePrivacySettings } = useProfileSettings()
  const [error, setError] = useState<string | null>(null)

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<PrivacySettingsValues>({
    resolver: zodResolver(privacySettingsSchema),
    defaultValues: {
      profileVisibility: "members",
      showEmail: false,
      showPhone: false,
      allowMessaging: true,
      allowTagging: true,
    },
  })

  // Update form values when privacy settings are loaded
  useEffect(() => {
    if (privacySettings) {
      reset({
        profileVisibility: privacySettings.profileVisibility,
        showEmail: privacySettings.showEmail,
        showPhone: privacySettings.showPhone,
        allowMessaging: privacySettings.allowMessaging,
        allowTagging: privacySettings.allowTagging,
      })
    }
  }, [privacySettings, reset])

  // Watch form values
  const profileVisibility = watch("profileVisibility")
  const showEmail = watch("showEmail")
  const showPhone = watch("showPhone")
  const allowMessaging = watch("allowMessaging")
  const allowTagging = watch("allowTagging")

  // Handle form submission
  const onSubmit = async (data: PrivacySettingsValues) => {
    setError(null)
    const result = await updatePrivacySettings(data)

    if (!result?.success) {
      setError(result?.message || "Failed to update privacy settings")
    }
  }

  if (loading && !privacySettings) {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Manage your privacy preferences.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading privacy settings...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Manage your privacy preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <Select
                  value={profileVisibility}
                  onValueChange={(value) =>
                    setValue("profileVisibility", value as "public" | "members" | "private", { shouldDirty: true })
                  }
                  disabled={isSaving}
                >
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
                  <Switch
                    id="show-email"
                    checked={showEmail}
                    onCheckedChange={(checked) => setValue("showEmail", checked, { shouldDirty: true })}
                    disabled={isSaving}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-phone">Show Phone Number</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your phone number</p>
                  </div>
                  <Switch
                    id="show-phone"
                    checked={showPhone}
                    onCheckedChange={(checked) => setValue("showPhone", checked, { shouldDirty: true })}
                    disabled={isSaving}
                  />
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
                  <Switch
                    id="allow-messaging"
                    checked={allowMessaging}
                    onCheckedChange={(checked) => setValue("allowMessaging", checked, { shouldDirty: true })}
                    disabled={isSaving}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-tagging">Allow Tagging</Label>
                    <p className="text-sm text-muted-foreground">Allow others to tag you in posts and comments</p>
                  </div>
                  <Switch
                    id="allow-tagging"
                    checked={allowTagging}
                    onCheckedChange={(checked) => setValue("allowTagging", checked, { shouldDirty: true })}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                <p className="text-destructive font-medium flex items-center justify-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              </div>
            )}
          </form>
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
          <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isSaving || !isDirty}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
