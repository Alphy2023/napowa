import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const stories = await prisma.aboutUsStory.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(stories)
  } catch (error) {
    console.error("Error fetching stories:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, content, image } = body

    const story = await prisma.aboutUsStory.create({
      data: { title, description, content, image },
    })

    return NextResponse.json(story)
  } catch (error) {
    console.error("Error creating story:", error)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, title, description, content, image, isActive, order } = body

    if (!id) {
      return NextResponse.json({ error: "Story ID is required" }, { status: 400 })
    }

    const story = await prisma.aboutUsStory.update({
      where: { id },
      data: { title, description, content, image, isActive, order },
    })

    return NextResponse.json(story)
  } catch (error) {
    console.error("Error updating story:", error)
    return NextResponse.json({ error: "Failed to update story" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Story ID is required" }, { status: 400 })
    }

    await prisma.aboutUsStory.delete({ where: { id } })
    return NextResponse.json({ message: "Story deleted successfully" })
  } catch (error) {
    console.error("Error deleting story:", error)
    return NextResponse.json({ error: "Failed to delete story" }, { status: 500 })
  }
}
