"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ForgotPasswordPayload, forgotPasswordSchema }
 from "@/schemas/auth.schema"
import AuthFormWrapper from "@/components/auth/auth-form-wrapper"
import { AuthCard } from "@/components/auth/auth-card"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { useAuthForm } from "@/contexts/auth-form-context"
import { useAuthCalls } from "@/hooks/useAuthCalls"
import { CustomAlert } from "@/components/CustomAlert"

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string>("")
  const { setTotalSteps, resetFields } = useAuthForm()
  const { forgotPassword, isLoading, success } = useAuthCalls()

  const form = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ForgotPasswordPayload) => {
    setError("")
    const result = await forgotPassword(values.email)

    if (!result.success) {
      setError(result.message || "Failed to send reset link. Please try again.")
    }
  }

  useEffect(() => {
    resetFields()
    setTotalSteps(1)
  }, [setTotalSteps, resetFields])

  return (
    <AuthFormWrapper 
    pageTitle="Forgot Password"
     description="Reset your password to regain access to your account">
      <AuthCard
        authType="forgot-password"
        form={form}
        btnTitle="Send reset instructions"
        onSubmit={onSubmit}
        cardTitle="Forgot Password?"
        cardDescription="Enter your email address to proceed."
        loading={isLoading}
      >
        {error && <CustomAlert variant="destructive" text={error} />}
        {success && <CustomAlert variant="default" text={success} />}

        <ForgotPasswordForm form={form} loading={isLoading} />
      </AuthCard>
    </AuthFormWrapper>
  )
}
