"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type ResetPasswordPayload, resetPasswordSchema } from "@/schemas/auth.schema"
import { useSearchParams } from "next/navigation"
import AuthFormWrapper from "@/components/auth/auth-form-wrapper"
import { AuthCard } from "@/components/auth/auth-card"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { useAuthForm } from "@/contexts/auth-form-context"
import { useAuthCalls } from "@/hooks/useAuthCalls"
import { CustomAlert } from "@/components/CustomAlert"

export default function ResetPasswordPage() {
  const [error, setError] = useState<string>("")
  const { setTotalSteps, resetFields } = useAuthForm()
  const { resetPassword, isLoading, success } = useAuthCalls({
    redirectAfterPasswordReset: "/auth/login",
  })
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const form = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: ResetPasswordPayload) => {
    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.")
      return
    }

    setError("")
    const result = await resetPassword({
      token,
      password: values.password,
      confirmPassword: values.confirmPassword,
    })

    if (!result.success) {
      setError(result.message || "Failed to reset password. Please try again.")
    }
  }

  useEffect(() => {
    resetFields()
    setTotalSteps(1)

    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset link.")
    }
  }, [setTotalSteps, resetFields, token])

  return (
    <AuthFormWrapper 
    pageTitle="Reset Password" 
    description="Create a new password for your account">
      <AuthCard
        authType="reset-password"
        form={form}
        onSubmit={onSubmit}
        cardTitle="Reset Password"
        btnTitle="Reset Password"
        cardDescription="Create a new password for your account"
        loading={isLoading}
      >
        {error && <CustomAlert variant="destructive" text={error} />}
        {success && <CustomAlert variant="default" text={success} />}

        {!token ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              Invalid or expired reset token. Please request a new password reset link.
            </p>
            <a href="/auth/forgot-password" className="text-primary hover:underline font-medium">
              Request new reset link
            </a>
          </div>
        ) : (
          <ResetPasswordForm form={form} loading={isLoading} />
        )}
      </AuthCard>
    </AuthFormWrapper>
  )
}
