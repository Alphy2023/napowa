import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notificationSettingsSchema } from "@/schemas/profile.schema"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get user notification settings
    const userProfile = await prisma.userSettings.findUnique({
      where: { userId },
      select: {
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
        eventReminders: true,
        donationReceipts: true,
        newsletterSubscription: true,
        announcementNotifications: true,
      },
    })

    if (!userProfile) {
      return NextResponse.json({success:false, message: "Profile not found" }, { status: 404 })
    }

    // Return default values for any missing settings
    return NextResponse.json({
      emailNotifications: userProfile.emailNotifications ?? true,
      smsNotifications: userProfile.smsNotifications ?? false,
      pushNotifications: userProfile.pushNotifications ?? false,
      eventReminders: userProfile.eventReminders ?? true,
      donationReceipts: userProfile.donationReceipts ?? true,
      newsletterSubscription: userProfile.newsletterSubscription ?? true,
      announcementNotifications: userProfile.announcementNotifications ?? true,
    })
  } catch (error) {
    console.error("Error fetching notification settings:", error)
    return NextResponse.json({ error: "Failed to fetch notification settings" }, { status: 500 })
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
          errors: [{ message: "You must be logged in to update notification settings" }],
        },
        { status: 401 },
      )
    }

    const userId = session.user.id
    const body = await req.json()

    // Validate the request body
    const validatedData = notificationSettingsSchema.parse(body)

    // Check if profile exists
    const existingProfile = await prisma.user.findFirst({
      where: { id:userId },
    })

    if (!existingProfile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found.",
          errors: [{ message: "User profile not found" }],
        },
        { status: 404 },
      )
    }
    const existingSetting = await prisma.userSettings.findUnique({
      where: { userId },
    })
    let updatedProfile;
    if(!existingSetting){
    // create new profile with notification settings
      updatedProfile = await prisma.userSettings.create({
      data: {
        userId,
        emailNotifications: validatedData.emailNotifications,
        smsNotifications: validatedData.smsNotifications,
        pushNotifications: validatedData.pushNotifications,
        eventReminders: validatedData.eventReminders,
        donationReceipts: validatedData.donationReceipts,
        newsletterSubscription: validatedData.newsletterSubscription,
        announcementNotifications: validatedData.announcementNotifications,
      },
      select: {
        emailNotifications: true,
        smsNotifications: true,
        pushNotifications: true,
        eventReminders: true,
        donationReceipts: true,
        newsletterSubscription: true,
        announcementNotifications: true,
      },
    })
    }
    else{
    // Update existing profile with notification settings

      updatedProfile = await prisma.userSettings.update({
        where: { userId },
        data: {
          emailNotifications: validatedData.emailNotifications,
          smsNotifications: validatedData.smsNotifications,
          pushNotifications: validatedData.pushNotifications,
          eventReminders: validatedData.eventReminders,
          donationReceipts: validatedData.donationReceipts,
          newsletterSubscription: validatedData.newsletterSubscription,
          announcementNotifications: validatedData.announcementNotifications,
        },
        select: {
          emailNotifications: true,
          smsNotifications: true,
          pushNotifications: true,
          eventReminders: true,
          donationReceipts: true,
          newsletterSubscription: true,
          announcementNotifications: true,
        },
      })
    }
  

  

    return NextResponse.json({
      success: true,
      message: "Notification settings updated successfully",
      data: updatedProfile,
    })
  } catch (error: any) {
    console.error("Error updating notification settings:", error)
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
        message: "Failed to update notification settings",
        errors: [{ message: error.message || "An unexpected error occurred" }],
      },
      { status: 500 },
    )
  }
}
