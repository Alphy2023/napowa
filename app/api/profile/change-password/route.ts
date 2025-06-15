import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { passwordChangeSchema } from "@/schemas/profile.schema"
import { compare, hash } from "bcryptjs"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          errors: [{ message: "You must be logged in to change your password" }],
        },
        { status: 401 },
      )
    }

    const userId = session.user.id
    const body = await req.json()

    // Validate the request body
    try {
      passwordChangeSchema.parse(body)
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors.map((e: any) => ({ message: `${e.path.join(".")}: ${e.message}` })),
        },
        { status: 400 },
      )
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    })

    if (!user || !user.password) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found or password not set",
          errors: [{ message: "User not found or password not set" }],
        },
        { status: 404 },
      )
    }

    // Verify current password
    const isPasswordValid = await compare(body.currentPassword, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect",
          errors: [{ message: "Current password is incorrect" }],
        },
        { status: 400 },
      )
    }

    // Hash new password
    const hashedPassword = await hash(body.newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
      data: { success: true },
    })
  } catch (error: any) {
    console.error("Error changing password:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to change password",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
