import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import { EventReminderEmail } from "@/lib/mail/event-reminder"
import React from "react"

interface SendEventReminderRequestBody {
  to: string
  userName?: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventDescription: string
  eventLink: string
  companyName: string
  supportEmail: string
  logoUrl: string
  organizer?: string
}

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
    const {
      to,
      userName,
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
      eventLink,
      companyName,
      supportEmail,
      logoUrl,
      organizer,
    }: SendEventReminderRequestBody = await req.json()

    if (
      !to ||
      !eventName ||
      !eventDate ||
      !eventTime ||
      !eventLocation ||
      !eventDescription ||
      !eventLink ||
      !companyName ||
      !supportEmail ||
      !logoUrl
    ) {
      return NextResponse.json({ message: "Missing required fields for event reminder email" }, { status: 400 })
    }

    // Use React.createElement instead of JSX
    const emailHtml: string = await render(
      React.createElement(EventReminderEmail, {
        userName,
        eventName,
        eventDate,
        eventTime,
        eventLocation,
        eventDescription,
        eventLink,
        companyName,
        supportEmail,
        logoUrl,
        organizer,
      }),
      {
        pretty: true,
      },
    )

    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM!,
      to: to,
      subject: `${companyName} - Upcoming Event: ${eventName}`,
      html: emailHtml,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Event reminder email sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending event reminder email:", error)
    return NextResponse.json(
      { message: "Internal Server Error: Failed to send event reminder email." },
      { status: 500 },
    )
  }
}
