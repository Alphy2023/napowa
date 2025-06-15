"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface OtpInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (value: string) => void
  length?: number
  disabled?: boolean
}

export function OtpInput({ value, onChange, length = 6, disabled = false, className, ...props }: OtpInputProps) {
  const [hasFocus, setHasFocus] = React.useState(false)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const focusInput = (index: number) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      // Move focus to previous input on backspace if current input is empty
      focusInput(index - 1)
    } else if (e.key === "ArrowLeft" && index > 0) {
      // Move focus to previous input on left arrow
      focusInput(index - 1)
    } else if (e.key === "ArrowRight" && index < length - 1) {
      // Move focus to next input on right arrow
      focusInput(index + 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value

    // Only allow digits
    if (!/^\d*$/.test(newValue)) {
      return
    }

    // Handle paste
    if (newValue.length > 1) {
      // If pasting multiple characters, distribute them across inputs
      const pastedValue = newValue.slice(0, length - index)
      const newOtp = value.slice(0, index) + pastedValue + value.slice(index + pastedValue.length)
      onChange(newOtp.slice(0, length))

      // Focus on the next empty input or the last input
      const nextIndex = Math.min(index + pastedValue.length, length - 1)
      focusInput(nextIndex)
      return
    }

    // Handle single character input
    const newOtp = value.slice(0, index) + newValue + value.slice(index + 1)
    onChange(newOtp)

    // Auto-focus next input if a digit was entered
    if (newValue && index < length - 1) {
      focusInput(index + 1)
    }
  }

  const handleFocus = () => {
    setHasFocus(true)
  }

  const handleBlur = () => {
    setHasFocus(false)
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Only allow digits
    if (!/^\d*$/.test(pastedData)) {
      return
    }

    const newValue = pastedData.slice(0, length)
    onChange(newValue.padEnd(length, value.slice(newValue.length)))

    // Focus on the next empty input or the last input
    const nextIndex = Math.min(newValue.length, length - 1)
    focusInput(nextIndex)
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        hasFocus && "ring-2 ring-offset-2 ring-offset-background ring-ring rounded-sm",
        className,
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className={cn(
            "h-12 w-12 text-center text-lg font-semibold",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "border-2",
          )}
          {...props}
        />
      ))}
    </div>
  )
}
