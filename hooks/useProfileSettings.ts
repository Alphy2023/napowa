"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import type {
  ProfileFormValues,
  AccountSettingsValues,
  NotificationSettingsValues,
  SecuritySettingsValues,
  PrivacySettingsValues,
  PasswordChangeValues,
  SessionData,
} from "@/schemas/profile.schema"
import type { UserProfileData } from "@/types/profile"
import type { ApiResponse } from "@/lib/api/client"

export function useProfileSettings() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [profile, setProfile] = useState<UserProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettingsValues | null>(null)
  const [securitySettings, setSecuritySettings] = useState<SecuritySettingsValues | null>(null)
  const [privacySettings, setPrivacySettings] = useState<PrivacySettingsValues | null>(null)
  const [sessions, setSessions] = useState<SessionData[]>([])

  // Fetch profile data
  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/profile")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch profile")
        }

        const data = await response.json()
        setProfile(data)
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching profile data")
        toast({
          title: "Error",
          description: err.message || "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [session, toast])

  // Fetch notification settings
  useEffect(() => {
    async function fetchNotificationSettings() {
      if (!session?.user) {
        return
      }

      try {
        const response = await fetch("/api/profile/notification-settings")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch notification settings")
        }

        const data = await response.json()
        setNotificationSettings(data)
      } catch (err: any) {
        console.error("Error fetching notification settings:", err)
        // Don't show toast for this secondary fetch
      }
    }

    fetchNotificationSettings()
  }, [session])

  // Fetch security settings
  useEffect(() => {
    async function fetchSecuritySettings() {
      if (!session?.user) {
        return
      }

      try {
        const response = await fetch("/api/profile/security-settings")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch security settings")
        }

        const data = await response.json()
        setSecuritySettings(data)
        if (data.sessions) {
          setSessions(data.sessions)
        }
      } catch (err: any) {
        console.error("Error fetching security settings:", err)
        // Don't show toast for this secondary fetch
      }
    }

    fetchSecuritySettings()
  }, [session])

  // Fetch privacy settings
  useEffect(() => {
    async function fetchPrivacySettings() {
      if (!session?.user) {
        return
      }

      try {
        const response = await fetch("/api/profile/privacy-settings")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch privacy settings")
        }

        const data = await response.json()
        setPrivacySettings(data)
      } catch (err: any) {
        console.error("Error fetching privacy settings:", err)
        // Don't show toast for this secondary fetch
      }
    }

    fetchPrivacySettings()
  }, [session])

  // Update profile
  const updateProfile = async (data: ProfileFormValues) => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsSaving(true)
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update profile")
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)

      toast({
        title: "Success",
        description: "Your profile has been updated successfully",
      })

      return updatedProfile
    } catch (err: any) {
      setError(err.message || "An error occurred while updating profile")
      toast({
        title: "Error",
        description: err.message || "Failed to update profile",
        variant: "destructive",
      })
      return null
    } finally {
      setIsSaving(false)
    }
  }

  // Update account settings
  const updateAccountSettings = async (data: AccountSettingsValues) => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your account settings",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsSaving(true)
      const response = await fetch("/api/profile/account-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update account settings")
      }

      const updatedProfile = await response.json()
      setProfile((prev) => {
        if (!prev) return updatedProfile
        return { ...prev, ...updatedProfile }
      })

      toast({
        title: "Success",
        description: "Your account settings have been updated successfully",
      })

      return updatedProfile
    } catch (err: any) {
      setError(err.message || "An error occurred while updating account settings")
      toast({
        title: "Error",
        description: err.message || "Failed to update account settings",
        variant: "destructive",
      })
      return null
    } finally {
      setIsSaving(false)
    }
  }

  // Update notification settings
  const updateNotificationSettings = async (
    data: NotificationSettingsValues,
  ): Promise<ApiResponse<NotificationSettingsValues> | null> => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your notification settings",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsSaving(true)
      const response = await fetch("/api/profile/notification-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to update notification settings")
      }

      setNotificationSettings(result.data)

      toast({
        title: "Success",
        description: result.message || "Your notification settings have been updated successfully",
      })

      return result
    } catch (err: any) {
      setError(err.message || "An error occurred while updating notification settings")
      toast({
        title: "Error",
        description: err.message || "Failed to update notification settings",
        variant: "destructive",
      })
      return {
        success: false,
        message: err.message || "Failed to update notification settings",
        errors: [{ message: err.message || "Failed to update notification settings" }],
      }
    } finally {
      setIsSaving(false)
    }
  }

  // Update security settings (2FA)
  const updateSecuritySettings = async (data: {
    twoFactorEnabled: boolean
  }): Promise<ApiResponse<SecuritySettingsValues> | null> => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your security settings",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsSaving(true)
      const response = await fetch("/api/profile/security-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to update security settings")
      }

      setSecuritySettings((prev) => {
        if (!prev) return result.data
        return { ...prev, twoFactorEnabled: result.data.twoFactorEnabled }
      })

      toast({
        title: "Success",
        description: result.message || "Your security settings have been updated successfully",
      })

      return result
    } catch (err: any) {
      setError(err.message || "An error occurred while updating security settings")
      toast({
        title: "Error",
        description: err.message || "Failed to update security settings",
        variant: "destructive",
      })
      return {
        success: false,
        message: err.message || "Failed to update security settings",
        errors: [{ message: err.message || "Failed to update security settings" }],
      }
    } finally {
      setIsSaving(false)
    }
  }

  // Update privacy settings
  const updatePrivacySettings = async (
    data: PrivacySettingsValues,
  ): Promise<ApiResponse<PrivacySettingsValues> | null> => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your privacy settings",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsSaving(true)
      const response = await fetch("/api/profile/privacy-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to update privacy settings")
      }

      setPrivacySettings(result.data)

      toast({
        title: "Success",
        description: result.message || "Your privacy settings have been updated successfully",
      })

      return result
    } catch (err: any) {
      setError(err.message || "An error occurred while updating privacy settings")
      toast({
        title: "Error",
        description: err.message || "Failed to update privacy settings",
        variant: "destructive",
      })
      return {
        success: false,
        message: err.message || "Failed to update privacy settings",
        errors: [{ message: err.message || "Failed to update privacy settings" }],
      }
    } finally {
      setIsSaving(false)
    }
  }

  // Change password
  const changePassword = async (data: PasswordChangeValues): Promise<ApiResponse<{ success: boolean }> | null> => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to change your password",
        variant: "destructive",
      })
      return null
    }

    try {
      setIsSaving(true)
      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.message || "Failed to change password")
      }

      toast({
        title: "Success",
        description: result.message || "Your password has been changed successfully",
      })

      return result
    } catch (err: any) {
      setError(err.message || "An error occurred while changing password")
      toast({
        title: "Error",
        description: err.message || "Failed to change password",
        variant: "destructive",
      })
      return {
        success: false,
        message: err.message || "Failed to change password",
        errors: [{ message: err.message || "Failed to change password" }],
      }
    } finally {
      setIsSaving(false)
    }
  }

  // Revoke session
  const revokeSession = async (sessionId: string): Promise<boolean> => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to revoke sessions",
        variant: "destructive",
      })
      return false
    }

    try {
      setIsSaving(true)
      const response = await fetch(`/api/profile/sessions/${sessionId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to revoke session")
      }

      // Update sessions list
      setSessions((prev) => prev.filter((s) => s.id !== sessionId))

      toast({
        title: "Success",
        description: "Session has been revoked successfully",
      })

      return true
    } catch (err: any) {
      setError(err.message || "An error occurred while revoking session")
      toast({
        title: "Error",
        description: err.message || "Failed to revoke session",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Revoke all sessions
  const revokeAllSessions = async (): Promise<boolean> => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to revoke all sessions",
        variant: "destructive",
      })
      return false
    }

    try {
      setIsSaving(true)
      const response = await fetch("/api/profile/sessions", {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to revoke all sessions")
      }

      // Update sessions list - keep only current session
      setSessions((prev) => prev.filter((s) => s.isCurrentSession))

      toast({
        title: "Success",
        description: "All sessions have been revoked successfully",
      })

      return true
    } catch (err: any) {
      setError(err.message || "An error occurred while revoking all sessions")
      toast({
        title: "Error",
        description: err.message || "Failed to revoke all sessions",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Connect social account
  const connectSocialAccount = async (provider: string) => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to connect social accounts",
        variant: "destructive",
      })
      return false
    }

    try {
      setIsSaving(true)
      // This would typically redirect to OAuth flow
      // For demo purposes, we'll simulate a successful connection
      const mockConnectedAccount = {
        provider,
        isConnected: true,
        accountId: `mock-${provider}-${Date.now()}`,
        username: `${session.user.name || "user"}@${provider}`,
        lastConnected: new Date().toISOString(),
      }

      // Update the profile with the new connected account
      setProfile((prev) => {
        if (!prev) return prev
        const updatedConnectedAccounts = [...(prev.connectedAccounts || [])]
        const existingIndex = updatedConnectedAccounts.findIndex((acc) => acc.provider === provider)

        if (existingIndex >= 0) {
          updatedConnectedAccounts[existingIndex] = mockConnectedAccount
        } else {
          updatedConnectedAccounts.push(mockConnectedAccount)
        }

        return {
          ...prev,
          connectedAccounts: updatedConnectedAccounts,
        }
      })

      toast({
        title: "Success",
        description: `Your ${provider} account has been connected successfully`,
      })

      return true
    } catch (err: any) {
      setError(err.message || `An error occurred while connecting ${provider}`)
      toast({
        title: "Error",
        description: err.message || `Failed to connect ${provider} account`,
        variant: "destructive",
      })
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Disconnect social account
  const disconnectSocialAccount = async (provider: string) => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to disconnect social accounts",
        variant: "destructive",
      })
      return false
    }

    try {
      setIsSaving(true)
      // For demo purposes, we'll simulate a successful disconnection
      setProfile((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          connectedAccounts: (prev.connectedAccounts || []).map((acc) =>
            acc.provider === provider ? { ...acc, isConnected: false } : acc,
          ),
        }
      })

      toast({
        title: "Success",
        description: `Your ${provider} account has been disconnected`,
      })

      return true
    } catch (err: any) {
      setError(err.message || `An error occurred while disconnecting ${provider}`)
      toast({
        title: "Error",
        description: err.message || `Failed to disconnect ${provider} account`,
        variant: "destructive",
      })
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return {
    profile,
    loading,
    error,
    isSaving,
    notificationSettings,
    securitySettings,
    privacySettings,
    sessions,
    updateProfile,
    updateAccountSettings,
    updateNotificationSettings,
    updatePrivacySettings,
    updateSecuritySettings,
    changePassword,
    revokeSession,
    revokeAllSessions,
    connectSocialAccount,
    disconnectSocialAccount,
  }
}
