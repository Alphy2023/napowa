import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { AuthContextProvider } from "@/contexts/auth-context"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "NAPOWA - National Police Wives Welfare Association",
  description: "Empowering police wives, widows and their families across Kenya",
  generator: 'NAPOWA'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-backgroundp font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
