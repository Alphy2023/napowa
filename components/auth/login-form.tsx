"use client"

import type React from "react"
import Link from "next/link"
import { FIELDTYPES } from "@/lib/utils"
import { InputField } from "../InputField"
import { UseFormReturn } from "react-hook-form"
import { LoginPayload} from "@/schemas/auth.schema"
import { useAuthForm } from "@/contexts/auth-form-context"

interface LoginFormProps{
  form: UseFormReturn<LoginPayload>,
  loading:boolean;
}
export const LoginForm = ({ form,loading=false}: LoginFormProps) => {
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
          </div>

      )}

      {formStep === 1 && (
      <div className="space-y-4">
            <div className="space-y-2">
            
                <div className="relative space-y-2">
                  <InputField
                  fieldType={FIELDTYPES.INPUT}
                  form={form}
                  type="password"
                  name="password"
                  disabled={loading}
                  id="password"
                  label="Password"
                  placeholder="************"
                />
                <div className="flex items-center justify-end">
                <Link href="/auth/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
                  Forgot password?
                </Link>
              </div>
                  
              </div>
            </div>
      </div>
      )}

    </>
  )
}
