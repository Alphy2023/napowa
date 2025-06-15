"use client"
import { FIELDTYPES } from "@/lib/utils"
import { InputField } from "../InputField"
import type { UseFormReturn } from "react-hook-form"
import type { ForgotPasswordPayload } from "@/schemas/auth.schema"
import { useAuthForm } from "@/contexts/auth-form-context"

interface ForgotPasswordFormProps {
  form: UseFormReturn<ForgotPasswordPayload>
  loading: boolean
}

export const ForgotPasswordForm = ({ form, loading = false }: ForgotPasswordFormProps) => {
  const { formStep } = useAuthForm()

  return (
    <>
      {formStep === 0 && (
        <div className="space-y-2">
          <InputField
            fieldType={FIELDTYPES.INPUT}
            form={form}
            type="email"
            name="email"
            disabled={loading}
            id="email"
            label="Email"
            placeholder="e.g. name@example.com"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Enter the email address associated with your account, 
            and we'll send you instructions to reset your password.
          </p>
        </div>
      )}
    </>
  )
}
