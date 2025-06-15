import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"
import nodemailer from "nodemailer"
import { render } from "@react-email/render"
import React from "react"
import { ForgotPasswordEmail } from "@/lib/mail/forgot-password-email"
import { sendEmail } from "@/lib/mail/send-email"


export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
          errors: [{ message: "Email is required" }],
        },
        { status: 400 },
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include:{
        profile:true
      }
    })

    // For security reasons, always return success even if user doesn't exist
    if (!user) {
      return NextResponse.json({
        success: true, // Changed to true for security reasons
        message: "If your email is registered, you will receive a password reset link shortly.",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    // Set token expiry (1 hour)
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000)

    // Find existing token
    const existingToken = await prisma.passwordResetToken.findFirst({
      where: { userId: user.id },
    })

    if (existingToken) {
      // Update existing token
      await prisma.passwordResetToken.update({
        where: { id: existingToken.id },
        data: {
          token: hashedToken,
          expiresAt: tokenExpiry,
        },
      })
    } else {
      // Create new token
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: hashedToken,
          expiresAt: tokenExpiry,
        },
      })
    }

    // Generate reset URL
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`

    // Send email with reset link
    try {
      // Render the email HTML
      const emailHtml = await render(
        React.createElement(ForgotPasswordEmail, {
          userName: user?.profile?.firstName || user.profile?.lastName || "User",
          resetPasswordLink,
          expirationMinutes: 60,
        }),
        { pretty: true },
      )
      const subject:string =`Password Reset Request - ${process.env.COMPANY_NAME || "Our Service"}`;
      
      await sendEmail(
        {emailHtml,subject,to:user?.email}
      )

      // await transporter.sendMail(mailOptions)
      console.log(`Password reset email sent to ${user.email}`)
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError)
      // Continue execution - we don't want to expose email sending errors to the client
    }

    // Log for development purposes
    console.log(`Reset token for ${email}: ${resetToken}`)
    console.log(`Reset link: ${resetPasswordLink}`)

    return NextResponse.json({
      success: true,
      message: "If your email is registered, you will receive a password reset link shortly.",
    })
  } catch (error: any) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
