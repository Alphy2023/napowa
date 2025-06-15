"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import AuthFormWrapper from "@/components/auth/auth-form-wrapper"
import { Card, CardContent, CardDescription, CardFooter,
CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuthCalls } from "@/hooks/useAuthCalls"
import { CustomAlert } from "@/components/CustomAlert"
import Link from "next/link"
import { Mail, ArrowRight, Loader2 } from "lucide-react"


export default function EmailSentPage() {
  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const { resendVerificationEmail, error, success } = useAuthCalls()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const nameParam = searchParams.get("name")
    if (emailParam) {
      setEmail(emailParam)
    }
    if (nameParam) {
      setFirstName(nameParam)
    }
  }, [searchParams])

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleResendEmail = async () => {
    if (!email || isResending) return

    setIsResending(true)
    await resendVerificationEmail(email, firstName)
    setIsResending(false)
    setCountdown(30) // 30 seconds cooldown
  }

  return (
    <AuthFormWrapper pageTitle="Email Sent" description="Check your inbox to verify your email address">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription className="pt-2">
            We've sent a verification code to{" "}
            {email ? <span className="font-medium text-foreground">{email}</span> : "your email address"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <CustomAlert variant="destructive" text={error} />}
          {success && <CustomAlert variant="default" text={success} />}

          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Please check your inbox and enter the verification code on the next screen.
            </p>
            <p className="text-sm text-muted-foreground">If you don't see the email, check your spam folder.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href={`/auth/verify-email?email=${encodeURIComponent(email || "")}`}>
              Enter Verification Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Didn't receive an email?</span>{" "}
            {countdown > 0 ? (
              <span className="text-primary">Resend in {countdown}s</span>
            ) : (
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={handleResendEmail}
                disabled={isResending || !email}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend Email"
                )}
              </Button>
            )}
          </div>

          <div className="text-center text-sm">
            <Link href="/auth/login" className="text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthFormWrapper>
  )
}
