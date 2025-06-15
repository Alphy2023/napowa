import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { privacySettingsSchema } from "@/schemas/profile.schema"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get user privacy settings
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        profileVisibility: true,
        showEmail: true,
        showPhone: true,
        allowMessaging: true,
        allowTagging: true,
      },
    })

    if (!userProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Return default values for any missing settings
    return NextResponse.json({
      profileVisibility: userProfile.profileVisibility || "members",
      showEmail: userProfile.showEmail ?? false,
      showPhone: userProfile.showPhone ?? false,
      allowMessaging: userProfile.allowMessaging ?? true,
      allowTagging: userProfile.allowTagging ?? true,
    })
  } catch (error) {
    console.error("Error fetching privacy settings:", error)
    return NextResponse.json({ error: "Failed to fetch privacy settings" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          errors: [{ message: "You must be logged in to update privacy settings" }],
        },
        { status: 401 },
      )
    }

    const userId = session.user.id
    const body = await req.json()

    // Validate the request body
    const validatedData = privacySettingsSchema.parse(body)

    // Check if profile exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId },
    })

    if (!existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
          errors: [{ message: "User profile not found" }],
        },
        { status: 404 },
      )
    }

    // Update existing profile with privacy settings
    const updatedProfile = await prisma.userProfile.update({
      where: { userId },
      data: {
        profileVisibility: validatedData.profileVisibility,
        showEmail: validatedData.showEmail,
        showPhone: validatedData.showPhone,
        allowMessaging: validatedData.allowMessaging,
        allowTagging: validatedData.allowTagging,
      },
      select: {
        profileVisibility: true,
        showEmail: true,
        showPhone: true,
        allowMessaging: true,
        allowTagging: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Privacy settings updated successfully",
      data: updatedProfile,
    })
  } catch (error: any) {
    console.error("Error updating privacy settings:", error)
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.errors.map((e: any) => ({ message: `${e.path.join(".")}: ${e.message}` })),
        },
        { status: 400 },
      )
    }
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update privacy settings",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
