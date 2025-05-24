import { AuthFormProvider } from "@/contexts/auth-form-context"
import type React from "react"


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthFormProvider>
        {children}
    </AuthFormProvider>
  )
}
