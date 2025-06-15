"use client"

import type React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { OtpVerificationPayload } from "@/schemas/auth.schema"
import { useAuthForm } from "@/contexts/auth-form-context"
import { useEffect, useState } from "react"

interface OtpVerificationFormProps {
  form: UseFormReturn<OtpVerificationPayload>
  loading: boolean
}

export const OtpVerificationForm = ({ form, loading = false }: OtpVerificationFormProps) => {
  const { formStep } = useAuthForm()
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])

  // Update the form value when OTP changes
  useEffect(() => {
    const otpString = otpValues.join("")
    form.setValue("otp", otpString)
  }, [otpValues, form])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (!/^\d*$/.test(value)) {
      return
    }

    const newOtp = [...otpValues]
    newOtp[index] = value
    setOtpValues(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        const newOtp = [...otpValues]
        newOtp[index - 1] = ""
        setOtpValues(newOtp)
        const prevInput = document.getElementById(`otp-input-${index - 1}`)
        if (prevInput) {
          prevInput.focus()
        }
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (!/^\d+$/.test(pastedData)) {
      return
    }

    const digits = pastedData.slice(0, 6).split("")
    const newOtp = [...otpValues]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })

    setOtpValues(newOtp)

    // Focus the next empty input or the last input
    for (let i = digits.length; i < 6; i++) {
      const nextInput = document.getElementById(`otp-input-${i}`)
      if (nextInput) {
        nextInput.focus()
        break
      }
    }
  }

  return (
    <>
      {formStep === 0 && (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Enter the 6-digit verification code sent to your email</p>
          </div>
          <div className="flex justify-center space-x-2">
            {otpValues.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus={index === 0}
                disabled={loading}
              />
            ))}
          </div>
          {form.formState.errors.otp && (
            <p className="text-sm text-destructive text-center">{form.formState.errors.otp.message}</p>
          )}
        </div>
      )}
    </>
  )
}
