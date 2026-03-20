import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const achievements = await prisma.aboutUsAchievement.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(achievements)
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, icon, metric } = body

    const achievement = await prisma.aboutUsAchievement.create({
      data: { title, description, icon, metric },
    })

    return NextResponse.json(achievement)
  } catch (error) {
    console.error("Error creating achievement:", error)
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, title, description, icon, metric, isActive, order } = body

    if (!id) {
      return NextResponse.json({ error: "Achievement ID is required" }, { status: 400 })
    }

    const achievement = await prisma.aboutUsAchievement.update({
      where: { id },
      data: { title, description, icon, metric, isActive, order },
    })

    return NextResponse.json(achievement)
  } catch (error) {
    console.error("Error updating achievement:", error)
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Achievement ID is required" }, { status: 400 })
    }

    await prisma.aboutUsAchievement.delete({ where: { id } })
    return NextResponse.json({ message: "Achievement deleted successfully" })
  } catch (error) {
    console.error("Error deleting achievement:", error)
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 })
  }
}
