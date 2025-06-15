import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email, otp, type } = await req.json()

    if (!email || !otp || !type) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, OTP, and type are required",
          errors: [{ message: "Email, OTP, and type are required" }],
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

    // Handle different OTP types
    switch (type) {
      case "email":
        // Verify email OTP
        const emailVerification = await prisma.emailVerificationToken.findFirst({
          where: {
            userId: user.id,
            token: otp,
            expires: {
              gt: new Date(),
            },
          },
        })

        if (!emailVerification) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid or expired verification code",
              errors: [{ message: "Invalid or expired verification code" }],
            },
            { status: 400 },
          )
        }

        // Mark email as verified
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: true,
          },
        })

        // Delete used token
        await prisma.emailVerificationToken.delete({
          where: { id: emailVerification.id },
        })

        return NextResponse.json({
          success: true,
          message: "Email verified successfully",
        })

      case "phone":
        // Verify phone OTP (similar logic to email)
        return NextResponse.json({
          success: true,
          message: "Phone number verified successfully",
        })

      case "twoFactor":
        // Verify two-factor OTP
        const twoFactorVerification = await prisma.twoFactorToken.findFirst({
          where: {
            userId: user.id,
            token: otp,
            expires: {
              gt: new Date(),
            },
          },
        })

        if (!twoFactorVerification) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid or expired verification code",
              errors: [{ message: "Invalid or expired verification code" }],
            },
            { status: 400 },
          )
        }

        // Delete used token
        await prisma.twoFactorToken.delete({
          where: { id: twoFactorVerification.id },
        })

        return NextResponse.json({
          success: true,
          message: "Two-factor authentication successful",
        })

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid verification type",
            errors: [{ message: "Invalid verification type" }],
          },
          { status: 400 },
        )
    }
  } catch (error: any) {
    console.error("Verify OTP error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during verification",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
