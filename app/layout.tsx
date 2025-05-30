import React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

import { AppProvider } from "@/providers/app.provider"


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

//   React.useEffect(() => {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("/sw.js")
//   }
// }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-backgroundp font-sans antialiased", fontSans.variable)}>
        <AppProvider>
              {children}
        </AppProvider>
      </body>
    </html>
  )
}
