'use client'

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { AuthContextProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"


export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <AuthContextProvider>
          <Toaster />
          {children}
        </AuthContextProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
