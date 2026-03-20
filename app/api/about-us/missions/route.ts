import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const missions = await prisma.aboutUsMission.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(missions)
  } catch (error) {
    console.error("Error fetching missions:", error)
    return NextResponse.json({ error: "Failed to fetch missions" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, icon } = body

    const mission = await prisma.aboutUsMission.create({
      data: { title, description, icon },
    })

    return NextResponse.json(mission)
  } catch (error) {
    console.error("Error creating mission:", error)
    return NextResponse.json({ error: "Failed to create mission" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, title, description, icon, isActive, order } = body

    if (!id) {
      return NextResponse.json({ error: "Mission ID is required" }, { status: 400 })
    }

    const mission = await prisma.aboutUsMission.update({
      where: { id },
      data: { title, description, icon, isActive, order },
    })

    return NextResponse.json(mission)
  } catch (error) {
    console.error("Error updating mission:", error)
    return NextResponse.json({ error: "Failed to update mission" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Mission ID is required" }, { status: 400 })
    }

    await prisma.aboutUsMission.delete({ where: { id } })
    return NextResponse.json({ message: "Mission deleted successfully" })
  } catch (error) {
    console.error("Error deleting mission:", error)
    return NextResponse.json({ error: "Failed to delete mission" }, { status: 500 })
  }
}
