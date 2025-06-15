import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({success:false, message: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get user security settings
    const user = await prisma.user.findUnique({
      where: { id:userId },
    })
    if (!user) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 })
    }
    const userProfile = await prisma.userSettings.findUnique({
      where: { userId },
        select: {
            twoFactorEnabled: true,
        },
    })

  

    // Mock sessions data (in a real app, this would come from a sessions table)
    const mockSessions = [
      {
        id: "current-session-id",
        device: "Windows",
        browser: "Chrome",
        location: "Nairobi, Kenya",
        lastActive: new Date().toISOString(),
        isCurrentSession: true,
      },
      {
        id: "previous-session-id",
        device: "iPhone",
        browser: "Safari",
        location: "Nairobi, Kenya",
        lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        isCurrentSession: false,
      },
    ]

    return NextResponse.json({
      twoFactorEnabled: userProfile?.twoFactorEnabled ?? false,
      sessions: mockSessions,
    })
  } catch (error) {
    console.error("Error fetching security settings:", error)
    return NextResponse.json({ error: "Failed to fetch security settings" }, { status: 500 })
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
          errors: [{ message: "You must be logged in to update security settings" }],
        },
        { status: 401 },
      )
    }

    const userId = session.user.id
    const body = await req.json()

    // Validate the request body
    if (typeof body.twoFactorEnabled !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body",
          errors: [{ message: "twoFactorEnabled must be a boolean" }],
        },
        { status: 400 },
      )
    }

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

    // Update existing profile with security settings
    const updatedProfile = await prisma.userSettings.update({
      where: { userId },
      data: {
        twoFactorEnabled: body.twoFactorEnabled,
      },
      select: {
        twoFactorEnabled: true,
      },
    })

    // Mock sessions data (in a real app, this would come from a sessions table)
    const mockSessions = [
      {
        id: "current-session-id",
        device: "Windows",
        browser: "Chrome",
        location: "Nairobi, Kenya",
        lastActive: new Date().toISOString(),
        isCurrentSession: true,
      },
      {
        id: "previous-session-id",
        device: "iPhone",
        browser: "Safari",
        location: "Nairobi, Kenya",
        lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        isCurrentSession: false,
      },
    ]

    return NextResponse.json({
      success: true,
      message: "Security settings updated successfully",
      data: {
        twoFactorEnabled: updatedProfile.twoFactorEnabled,
        sessions: mockSessions,
      },
    })
  } catch (error: any) {
    console.error("Error updating security settings:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update security settings",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
