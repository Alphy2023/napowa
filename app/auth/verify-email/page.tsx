"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OtpInput } from "@/components/ui/otp-input"
import { useAuthCalls } from "@/hooks/useAuthCalls"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Mail, Loader2 } from "lucide-react"
import Link from "next/link"
import AuthFormWrapper from "@/components/auth/auth-form-wrapper"

export default function VerifyEmailPage() {
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const searchParams = useSearchParams()

  const { verifyOtp, resendVerificationEmail,
     isLoading, error, success } = useAuthCalls({
    redirectAfterEmailVerification: "/dashboard",
  })

  useEffect(() => {
    // Get email from URL query params
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }

    // Get token from URL query params and auto-fill OTP if present
    const tokenParam = searchParams.get("token")
    if (tokenParam) {
      setOtp(tokenParam)
    }
  }, [searchParams])

  useEffect(() => {
    // Auto-submit if OTP is filled from URL
    if (otp.length === 6 && email && searchParams.get("token")) {
      handleVerify()
    }
  }, [otp, email])

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleVerify = async () => {
    if (otp.length !== 6 || !email) return

    await verifyOtp({
      email,
      otp,
      type: "email",
    })
  }

  const handleResend = async () => {
    if (!email || isResending) return

    setIsResending(true)
    await resendVerificationEmail(email)
    setIsResending(false)
    setCountdown(30) // 30 seconds cooldown
  }

  return (
    <AuthFormWrapper pageTitle="Verify Your Email" description="Enter the verification code sent to your email">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification code to{" "}
            {email ? <span className="font-medium text-foreground">{email}</span> : "your email address"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground text-center mb-2">
              Enter the 6-digit code sent to your email
            </div>
            <div className="flex justify-center">
              <OtpInput value={otp} onChange={setOtp} length={6} disabled={isLoading} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleVerify} className="w-full" disabled={otp.length !== 6 || isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Verify Email
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Didn't receive a code?</span>{" "}
            {countdown > 0 ? (
              <span className="text-primary">Resend in {countdown}s</span>
            ) : (
              <Button variant="link" className="p-0 h-auto cursor-pointer" onClick={handleResend} disabled={isResending || !email}>
                {isResending ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Code"
                )}
              </Button>
            )}
          </div>

          <div className="text-center text-sm">
            <Link href="/auth/login" 
            className="text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthFormWrapper>
  )
}
