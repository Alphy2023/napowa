// app/api/send-email/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import { WelcomeEmail } from "@/lib/mail/welcome-email"
import React from "react"

// Define the interface for the expected request body
interface SendEmailRequestBody {
  to: string
  userName: string
  loginUrl: string
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
    const { to, userName, loginUrl }: SendEmailRequestBody = await req.json()

    if (!to || !userName || !loginUrl) {
      return NextResponse.json({ message: "Missing required fields (to, userName, loginUrl)" }, { status: 400 })
    }

    // Use React.createElement instead of JSX
    const emailHtml: string = await render(React.createElement(WelcomeEmail, { userName, loginUrl }), {
      pretty: true,
    })

    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM!,
      to: to,
      subject: `Welcome to Our Service, ${userName}!`,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Internal Server Error: Failed to send email." }, { status: 500 })
  }
}
