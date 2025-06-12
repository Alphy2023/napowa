// app/api/events/[eventId]/register/route.ts
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import QRCode from "qrcode"
import { EventTicketEmail } from "@/lib/mail/event-ticket"
import { prisma } from "@/lib/prisma"
import React from "react"

// Define the interface for the expected request body for event registration
interface RegisterEventRequestBody {
  firstName: string
  lastName: string
  email: string
  phone?: string
  organization?: string
  specialRequirements?: string
  memberId?: string
}

// Your createTransporter function remains the same
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

export async function POST(req: Request, { params }: { params: { eventId: string } }) {
  try {
    const eventId = params.eventId
    const { firstName, lastName, email, phone, organization, specialRequirements, memberId }: RegisterEventRequestBody =
      await req.json()

    // 1. Validate Input
    if (!firstName || !lastName || !email || !eventId) {
      return NextResponse.json(
        { message: "Missing required registration fields (firstName, lastName, email, eventId)" },
        { status: 400 },
      )
    }

    // 2. Fetch Event Details for Email
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 })
    }

    // You might want to get these from a central config or environment variables
    const companyName = process.env.COMPANY_NAME || "Your Company"
    const supportEmail = process.env.SUPPORT_EMAIL || "support@yourcompany.com"
    const logoUrl = process.env.LOGO_URL || "https://example.com/your-logo.png"
    const eventLink = `${process.env.NEXT_PUBLIC_APP_URL}/events/${event.id}`

    // 3. Generate Unique Ticket ID and QR Code Data
    const ticketId = `TICKET-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now()}`
    const qrCodeData = `${process.env.NEXT_PUBLIC_APP_URL}/api/tickets/validate?ticketId=${ticketId}&eventId=${eventId}`

    // 4. Generate QR Code Image (as a Base64 string for embedding/attachment)
    const qrCodeImageBuffer = await QRCode.toBuffer(qrCodeData, { type: "png", scale: 8 })
    const qrCodeBase64 = `data:image/png;base64,${qrCodeImageBuffer.toString("base64")}`

    // 5. Create Event Registration in Database
    const newRegistration = await prisma.eventRegistration.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        organization,
        specialRequirements,
        eventId: event.id,
        memberId,
        ticketId,
        qrCodeData,
        status: "confirmed",
      },
    })

    // 6. Render Event Ticket Email HTML using React.createElement
    const emailHtml: string = await render(
      React.createElement(EventTicketEmail, {
        attendeeName: `${firstName} ${lastName}`,
        eventName: event.name,
        eventDate: event.date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        eventTime: event.time || "See Event Page",
        eventLocation: event.location || "Online",
        ticketId: newRegistration.ticketId,
        qrCodeImageUrl: qrCodeBase64,
        eventLink: eventLink,
        companyName: companyName,
        supportEmail: supportEmail,
        logoUrl: logoUrl,
      }),
      {
        pretty: true,
      },
    )

    // 7. Initialize Nodemailer Transporter
    const transporter = createTransporter()

    // 8. Prepare and Send Email with Attachment
    const mailOptions = {
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: `Your Ticket for ${event.name}`,
      html: emailHtml,
      attachments: [
        {
          filename: `ticket-${newRegistration.ticketId}.png`,
          content: qrCodeImageBuffer,
          contentType: "image/png",
          cid: "qrcode_ticket",
        },
      ],
      text: `Hello ${firstName} ${lastName},\n\nThank you for registering for ${event.name}!\n\nYour Ticket ID is: ${newRegistration.ticketId}\n\nDate: ${event.date.toLocaleDateString()}\nTime: ${event.time || "N/A"}\nLocation: ${event.location || "N/A"}\n\nPlease present your QR code at the entrance. You can find more details here: ${eventLink}\n\nBest regards,\nThe ${companyName} Team.`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      {
        message: "Event registration successful! Ticket sent to your email.",
        registrationId: newRegistration.id,
        ticketId: newRegistration.ticketId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error during event registration or email sending:", error)
    return NextResponse.json(
      { message: "Internal Server Error: Failed to register for event or send ticket." },
      { status: 500 },
    )
  }
}
