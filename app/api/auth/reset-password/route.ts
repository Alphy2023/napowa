import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import crypto from "crypto"
import { z } from "zod"
import { resetPasswordRequestSchema } from "@/schemas/auth.schema"



export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate request body
    const validationResult = resetPasswordRequestSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((error) => ({
        message: `${error.path.join(".")}: ${error.message}`,
      }))

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 },
      )
    }

    const { token, password } = validationResult.data

    // Hash the token to compare with stored hash
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

    // Find valid token
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: hashedToken,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!resetToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
          errors: [{ message: "Invalid or expired token" }],
        },
        { status: 400 },
      )
    }

    // Hash new password
    const hashedPassword = await hash(password, 10)

    // Update user password
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: {
        password: hashedPassword,
      },
    })

    // Delete used token
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    })

    return NextResponse.json({
      success: true,
      message: "Password reset successful. You can now log in with your new password.",
    })
  } catch (error: any) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while resetting your password",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
