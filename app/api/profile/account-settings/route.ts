import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { accountSettingsSchema } from "@/schemas/profile.schema"

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const body = await req.json()

    // Validate the request body
    const validatedData = accountSettingsSchema.parse(body)

    // Check if profile exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId },
    })

    if (!existingProfile) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 })
    }

    // Update existing profile with account settings
    const updatedProfile = await prisma.userProfile.update({
      where: { userId },
      data: {
        language: validatedData.language,
        timezone: validatedData.timezone,
        connectedAccounts: validatedData.connectedAccounts,
        emailNotifications: validatedData.emailNotifications,
        pushNotifications: validatedData.pushNotifications,
      },
    })

    return NextResponse.json({
      language: updatedProfile.language,
      timezone: updatedProfile.timezone,
      connectedAccounts: updatedProfile.connectedAccounts,
      emailNotifications: updatedProfile.emailNotifications,
      pushNotifications: updatedProfile.pushNotifications,
    })
  } catch (error: any) {
    console.error("Error updating account settings:", error)
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to update account settings" }, { status: 500 })
  }
}
