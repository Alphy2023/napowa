import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import { VerificationEmail } from "@/lib/mail/verification-email"
import React from "react"
import { generateOTP } from "@/utils/generate-otp"

// Define the interface for the expected request body
interface SendVerificationEmailRequestBody {
  email: string
  userName?: string
}

// Define a Transporter for Nodemailer
const createTransporter = () => {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.EMAIL_FROM
  ) {
    console.error("Missing SMTP environment variables! Please check your .env.local file.")
    throw new Error("SMTP configuration is incomplete. Cannot create email transporter.")
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(req: Request) {
  try {
    const { email, userName }: SendVerificationEmailRequestBody = await req.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Generate OTP
    const otp = generateOTP(6)

    // Store OTP in database or cache with expiration (implementation depends on your storage solution)
    // For example, you might use Redis, a database table, etc.
    // await storeOTP(email, otp, 30 * 60) // Store for 30 minutes

    // Create verification URL with OTP as token
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const verificationUrl = `${baseUrl}/auth/verify-email?email=${encodeURIComponent(email)}&token=${otp}`

    // Use React.createElement instead of JSX
    const emailHtml: string = await render(
      React.createElement(VerificationEmail, {
        userName: userName || email.split("@")[0],
        verificationUrl,
        otp,
      }),
      { pretty: true },
    )

    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: `Verify Your Email Address`,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      {
        success: true,
        message: "Verification email sent successfully!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error: Failed to send verification email.",
      },
      { status: 500 },
    )
  }
}
