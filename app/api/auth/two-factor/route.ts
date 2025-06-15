import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { email, password, code } = await req.json()

    if (!email || !password || !code) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, password, and code are required",
          errors: [{ message: "Email, password, and code are required" }],
        },
        { status: 400 },
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      //  select: {
      //     email: true,
      //     role: true,
      //     password: true,
      //   },
        include:{
          profile:{
            
            select: {
              id: true,
              isEmailVerified: true,
            
            firstName: true,
            lastName: true,
            
            // twoFactorEnabled: true,
          },
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
          errors: [{ message: "Invalid credentials" }],
        },
        { status: 401 },
      )
    }

    // Verify password
    const passwordValid = await compare(password, user.password!)

    if (!passwordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
          errors: [{ message: "Invalid credentials" }],
        },
        { status: 401 },
      )
    }

    // Verify two-factor code
    const twoFactorToken = await prisma.twofactorOtp.findFirst({
      where: {
        userId: user.id,
        otp: code,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!twoFactorToken) {
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
    await prisma.twofactorOtp.delete({
      where: { id: twoFactorToken.id },
    })

    // Return user data (excluding password)
    const { password: _, ...userData } = user

    return NextResponse.json({
      success: true,
      message: "Two-factor authentication successful",
      data: userData,
    })
  } catch (error: any) {
    console.error("Two-factor authentication error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during two-factor authentication",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
