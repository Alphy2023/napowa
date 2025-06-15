import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { profileFormSchema } from "@/schemas/profile.schema"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get user profile
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    })

    // Get user email from User model
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    })

    if (!userProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...userProfile,
      email: user?.email,
    })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const body = await req.json()

    // Validate the request body
    const validatedData = profileFormSchema.parse(body)

    // Check if profile exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId },
    })

    if (!existingProfile) {
      // Create new profile if it doesn't exist
      const newProfile = await prisma.userProfile.create({
        data: {
          userId,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          phone: validatedData.phone,
          bio: validatedData.bio,
          profileImage: validatedData.profileImage,
          address: validatedData.address,
          city: validatedData.city,
          county: validatedData.county,
          postalCode: validatedData.postalCode,
        },
      })

      return NextResponse.json(newProfile)
    }

    // Update existing profile
    const updatedProfile = await prisma.userProfile.update({
      where: { userId },
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone,
        bio: validatedData.bio,
        profileImage: validatedData.profileImage,
        address: validatedData.address,
        city: validatedData.city,
        county: validatedData.county,
        postalCode: validatedData.postalCode,
      },
    })

    return NextResponse.json(updatedProfile)
  } catch (error: any) {
    console.error("Error updating profile:", error)
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
