"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export function MpesaIntegration() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!phoneNumber || !amount) {
      setStatus("error")
      setMessage("Please enter both phone number and amount")
      return
    }

    // Format phone number to ensure it starts with 254
    const formattedPhone = phoneNumber.replace(/^0/, "254").replace(/[^0-9]/g, "")

    if (formattedPhone.length !== 12 || !formattedPhone.startsWith("254")) {
      setStatus("error")
      setMessage("Please enter a valid Kenyan phone number")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/mpesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("M-Pesa payment request sent successfully. Please check your phone to complete the transaction.")

        // Reset form after successful submission
        setPhoneNumber("")
        setAmount("")
      } else {
        throw new Error(data.message || "Failed to process M-Pesa payment")
      }
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Failed to process M-Pesa payment. Please try again.")
      console.error("M-Pesa error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donate via M-Pesa</CardTitle>
        <CardDescription>Make a secure donation using M-Pesa mobile money</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" && (
          <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mb-4 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone-number">M-Pesa Phone Number</Label>
            <Input
              id="phone-number"
              placeholder="e.g., 0712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">Enter the phone number registered with M-Pesa</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KSh)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              min="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Donate Now"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-medium">M-PESA</span>
          </div>
          <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-medium">VISA</span>
          </div>
          <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
            <span className="text-xs font-medium">MASTERCARD</span>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Your donation is secure and encrypted. By donating, you agree to our terms and privacy policy.
        </p>
      </CardFooter>
    </Card>
  )
}
