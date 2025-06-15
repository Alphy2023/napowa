import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
          errors: [{ message: "User not found" }],
        },
        { status: 404 },
      )
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already verified",
          errors: [{ message: "Email is already verified" }],
        },
        { status: 400 },
      )
    }

    // Generate verification token (6-digit code)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

    // Set token expiry (1 hour)
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000)

    // Save token to database
    await prisma.emailVerificationToken.upsert({
      where: { userId: user.id },
      update: {
        token: verificationCode,
        expires: tokenExpiry,
      },
      create: {
        userId: user.id,
        token: verificationCode,
        expires: tokenExpiry,
      },
    })

    // In a real app, send email with verification code
    // For demo purposes, we'll just log it
    console.log(`Verification code for ${email}: ${verificationCode}`)

    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully",
    })
  } catch (error: any) {
    console.error("Resend verification error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while sending verification email",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
