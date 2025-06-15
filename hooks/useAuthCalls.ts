"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signOut } from "next-auth/react"
import { useToast } from "@/hooks/use-toast"
import { authApi } from "@/lib/api"
import type { ForgotPasswordPayload, ResetPasswordRequestPayload, SignupPayload } from "@/schemas/auth.schema"
import { ApiResponse } from "@/types/analytics"
import { AuthApiResponse } from "@/types/auth.types"

interface UseAuthCallsOptions {
  redirectAfterLogin?: string
  redirectAfterSignup?: string
  redirectAfterLogout?: string
  redirectAfterPasswordReset?: string
  redirectAfterEmailVerification?: string
}

export function useAuthCalls(options: UseAuthCallsOptions = {}) {
  const {
    redirectAfterLogin = "/dashboard",
    redirectAfterSignup = "/auth/verify-email",
    redirectAfterLogout = "/",
    redirectAfterPasswordReset = "/auth/login",
    redirectAfterEmailVerification = "/dashboard",
  } = options

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [requiresTwoFactor, setRequiresTwoFactor] = useState<boolean>(false)
  const [twoFactorEmail, setTwoFactorEmail] = useState<string>("")
  const [twoFactorPassword, setTwoFactorPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  /**
   * Handles user login with credentials
   */
  const login = async (credentials: { email: string; password: string; rememberMe?: boolean }) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    setRequiresTwoFactor(false)

    try {
      // First try to use NextAuth signIn
      const result = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      })

      // If NextAuth signIn fails or returns an error
      if (!result?.ok) {
        // Try our custom login API as fallback
        const apiResponse = await authApi.login(credentials)

        // Check if two-factor auth is required
        if (apiResponse.success && apiResponse?.data?.requiresTwoFactor) {
          setRequiresTwoFactor(true)
          setTwoFactorEmail(credentials.email)
          setTwoFactorPassword(credentials.password)
          setSuccess("Please enter your two-factor authentication code")
          setIsLoading(false)
          return apiResponse
        }

        if (!apiResponse.success) {
          setError(apiResponse.message || "Login failed")
          toast({
            title: "Login Failed",
            description: apiResponse.message || "Invalid credentials",
            variant: "destructive",
          })
          setIsLoading(false)
          return apiResponse
        }

        // If custom login succeeds, redirect
        setSuccess("Login successful")
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        })
        router.push(redirectAfterLogin)
        setIsLoading(false)
        return apiResponse
      }

      // If NextAuth signIn succeeds
      setSuccess("Login successful")
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      })
      router.push(redirectAfterLogin)
      setIsLoading(false)

      return {
        success: true,
        message: "Login successful",
      }
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during login"
      setError(errorMessage)
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false)

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }
  }

  /**
   * Handles user signup
   */
  const signup = async (userData: SignupPayload) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await authApi.signup(userData)

      if (!response.success) {
        setError(response.message || "Signup failed")
        toast({
          title: "Signup Failed",
          description: response.message || "Please check your information and try again",
          variant: "destructive",
        })
        setIsLoading(false)
        return response
      }

      setSuccess("Signup successful")
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. Please verify your email.",
      })

      // Send verification email with OTP
      await sendVerificationEmail(userData.email, userData.firstName)

      router.push(redirectAfterSignup)
      setIsLoading(false)
      return response
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during signup"
      setError(errorMessage)
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false)

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }
  }

  /**
   * Sends verification email with OTP
   */
  const sendVerificationEmail = async (email: string, firstName?: string) => {
    try {
      const response = await authApi.sendVerificationEmail({ email, firstName })

      if (!response.success) {
        toast({
          title: "Warning",
          description: "Account created but we couldn't send the verification email. Please try again later.",
          variant: "destructive",
        })
        return response
      }

      return response
    } catch (err: any) {
      console.error("Error sending verification email:", err)
      return {
        success: false,
        message: err.message || "Failed to send verification email",
      }
    }
  }

  /**
   * Handles forgot password request
   */
  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response: ApiResponse<ForgotPasswordPayload> = await authApi.forgotPassword({ email })

      if (!response.success) {
        setError(response?.message)
        setTimeout(() => {
          setError(null)
        }, 5000);
        // || "Failed to process forgot password request"
        // toast({
        //   title: "Request Failed",
        //   description: response.message || "Please check your email and try again",
        //   variant: "destructive",
        // })
        setIsLoading(false)
        return response
      }

      setSuccess("Password reset email sent")
      toast({
        title: "Email Sent",
        description: response.message,
      })
      setIsLoading(false)
      return response
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while processing your request"
      setError(errorMessage)
      toast({
        title: "Request Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false)

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }
  }

  /**
   * Handles password reset
   */
  const resetPassword = async (data: ResetPasswordRequestPayload) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
     
      const response = await authApi.resetPassword(data)

      if (!response.success) {
        setError(response.message)
        // toast({
        //   title: "Reset Failed",
        //   description: response.message,
        //   variant: "destructive",
        // })
        setIsLoading(false)
        return response
      }

      setSuccess("Password reset successful")
      toast({
        title: "Password Reset",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      })
      router.push(redirectAfterPasswordReset)
      setIsLoading(false)
      return response
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while resetting your password"
      setError(errorMessage)
      // toast({
      //   title: "Reset Failed",
      //   description: errorMessage,
      //   variant: "destructive",
      // })
      setIsLoading(false)

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }
  }

  /**
   * Handles OTP verification
   */
  const verifyOtp = async (data: { email: string; otp: string; type: "email" | "phone" | "twoFactor" }) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await authApi.verifyOtp(data)

      if (!response.success) {
        setError(response.message || "Failed to verify OTP")
        toast({
          title: "Verification Failed",
          description: response.message || "Invalid or expired code",
          variant: "destructive",
        })
        setIsLoading(false)
        return response
      }

      setSuccess("OTP verified successfully")
      toast({
        title: "Verification Successful",
        description: data.type === "email" ? "Your email has been verified successfully." : "Verification successful.",
      })

      // If this was email verification, redirect to dashboard
      if (data.type === "email") {
        router.push(redirectAfterEmailVerification)
      }

      setIsLoading(false)
      return response
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during verification"
      setError(errorMessage)
      toast({
        title: "Verification Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false)

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }
  }

  /**
   * Handles two-factor authentication
   */
  const twoFactorAuth = async (code: string) => {
    if (!twoFactorEmail || !twoFactorPassword) {
      const errorMessage = "Missing email or password for two-factor authentication"
      setError(errorMessage)
      toast({
        title: "Authentication Failed",
        description: errorMessage,
        variant: "destructive",
      })

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const data = {
        email: twoFactorEmail,
        password: twoFactorPassword,
        code,
      }

      const response = await authApi.twoFactorAuth(data)

      if (!response.success) {
        setError(response.message || "Two-factor authentication failed")
        toast({
          title: "Authentication Failed",
          description: response.message || "Invalid code",
          variant: "destructive",
        })
        setIsLoading(false)
        return response
      }

      // Reset two-factor state
      setRequiresTwoFactor(false)
      setTwoFactorEmail("")
      setTwoFactorPassword("")

      setSuccess("Two-factor authentication successful")
      toast({
        title: "Authentication Successful",
        description: "You have been logged in successfully",
      })
      router.push(redirectAfterLogin)
      setIsLoading(false)
      return response
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred during two-factor authentication"
      setError(errorMessage)
      toast({
        title: "Authentication Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false)

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }
  }

  /**
   * Handles user logout
   */
  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut({ redirect: false })
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      })
      router.push(redirectAfterLogout)
    } catch (err: any) {
      toast({
        title: "Logout Failed",
        description: err.message || "An error occurred during logout",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Resends verification email with OTP
   */
  const resendVerificationEmail = async (email: string, firstName?: string) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await authApi.sendVerificationEmail({ email, firstName })

      if (!response.success) {
        setError(response.message || "Failed to resend verification email")
        toast({
          title: "Request Failed",
          description: response.message || "Please try again later",
          variant: "destructive",
        })
        setIsLoading(false)
        return response
      }

      setSuccess("Verification email sent")
      toast({
        title: "Email Sent",
        description: "A new verification email has been sent to your email address",
      })
      setIsLoading(false)
      return response
    } catch (err: any) {
      const errorMessage = err.message || "An error occurred while sending verification email"
      setError(errorMessage)
      toast({
        title: "Request Failed",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false)

      return {
        success: false,
        message: errorMessage,
        errors: [{ message: errorMessage }],
      }
    }
  }

  return {
    login,
    signup,
    forgotPassword,
    resetPassword,
    verifyOtp,
    twoFactorAuth,
    logout,
    sendVerificationEmail,
    resendVerificationEmail,
    isLoading,
    error,
    success,
    requiresTwoFactor,
    clearError: () => setError(null),
    clearSuccess: () => setSuccess(null),
  }
}
