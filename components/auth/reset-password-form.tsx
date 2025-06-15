"use client"
import { FIELDTYPES } from "@/lib/utils"
import { InputField } from "../InputField"
import type { UseFormReturn } from "react-hook-form"
import type { ResetPasswordPayload } from "@/schemas/auth.schema"
import { useAuthForm } from "@/contexts/auth-form-context"

interface ResetPasswordFormProps {
  form: UseFormReturn<ResetPasswordPayload>
  loading: boolean
}

export const ResetPasswordForm = ({ form, loading = false }: ResetPasswordFormProps) => {
  const { formStep } = useAuthForm()

  return (
    <>
      {formStep === 0 && (
        <div className="space-y-4">
          <InputField
            fieldType={FIELDTYPES.INPUT}
            form={form}
            type="password"
            name="password"
            disabled={loading}
            id="password"
            label="New Password"
            placeholder="************"
          />
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside pl-2 space-y-0.5">
              <li>At least 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>
          <InputField
            fieldType={FIELDTYPES.INPUT}
            form={form}
            type="password"
            name="confirmPassword"
            disabled={loading}
            id="confirmPassword"
            label="Confirm Password"
            placeholder="************"
          />
        </div>
      )}
    </>
  )
}
