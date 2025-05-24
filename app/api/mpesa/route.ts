import { NextResponse } from "next/server"
import { createDonation } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phoneNumber, amount } = body

    // Validate input
    if (!phoneNumber || !amount) {
      return NextResponse.json({ success: false, message: "Phone number and amount are required" }, { status: 400 })
    }

    // Format phone number to ensure it starts with 254
    const formattedPhone = phoneNumber.replace(/^0/, "254").replace(/[^0-9]/g, "")

    if (formattedPhone.length !== 12 || !formattedPhone.startsWith("254")) {
      return NextResponse.json({ success: false, message: "Please enter a valid Kenyan phone number" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Call the M-Pesa API to initiate the STK push
    // 2. Store the transaction details in your database
    // 3. Return the response to the client

    // For this demo, we'll simulate a successful M-Pesa transaction
    const transactionId = `MPESA${Date.now()}`

    // Save the donation to the database
    await createDonation({
      amount: Number.parseFloat(amount),
      currency: "KES",
      paymentMethod: "mpesa",
      transactionId,
      status: "pending",
      donorPhone: formattedPhone,
    })

    return NextResponse.json({
      success: true,
      message: "M-Pesa payment request sent successfully",
      transactionId,
    })
  } catch (error) {
    console.error("M-Pesa API error:", error)
    return NextResponse.json({ success: false, message: "Failed to process M-Pesa payment" }, { status: 500 })
  }
}
