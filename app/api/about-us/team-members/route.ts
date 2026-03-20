import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const teamMembers = await prisma.aboutUsTeamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, role, bio, image, email, phone, socialLinks } = body

    const teamMember = await prisma.aboutUsTeamMember.create({
      data: {
        name,
        role,
        bio,
        image,
        email,
        phone,
        socialLinks,
      },
    })

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, name, role, bio, image, email, phone, socialLinks, isActive, order } = body

    if (!id) {
      return NextResponse.json({ error: "Team member ID is required" }, { status: 400 })
    }

    const teamMember = await prisma.aboutUsTeamMember.update({
      where: { id },
      data: {
        name,
        role,
        bio,
        image,
        email,
        phone,
        socialLinks,
        isActive,
        order,
      },
    })

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Team member ID is required" }, { status: 400 })
    }

    await prisma.aboutUsTeamMember.delete({ where: { id } })
    return NextResponse.json({ message: "Team member deleted successfully" })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 })
  }
}
