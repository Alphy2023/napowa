import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const welcomeNote = await prisma.aboutUsWelcomeNote.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(welcomeNote || null)
  } catch (error) {
    console.error("Error fetching welcome note:", error)
    return NextResponse.json({ error: "Failed to fetch welcome note" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, content, image } = body

    const welcomeNote = await prisma.aboutUsWelcomeNote.create({
      data: {
        title,
        description,
        content,
        image,
      },
    })

    return NextResponse.json(welcomeNote)
  } catch (error) {
    console.error("Error creating welcome note:", error)
    return NextResponse.json({ error: "Failed to create welcome note" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, title, description, content, image, isActive } = body

    if (!id) {
      return NextResponse.json({ error: "Welcome note ID is required" }, { status: 400 })
    }

    const welcomeNote = await prisma.aboutUsWelcomeNote.update({
      where: { id },
      data: {
        title,
        description,
        content,
        image,
        isActive,
      },
    })

    return NextResponse.json(welcomeNote)
  } catch (error) {
    console.error("Error updating welcome note:", error)
    return NextResponse.json({ error: "Failed to update welcome note" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Welcome note ID is required" }, { status: 400 })
    }

    await prisma.aboutUsWelcomeNote.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Welcome note deleted successfully" })
  } catch (error) {
    console.error("Error deleting welcome note:", error)
    return NextResponse.json({ error: "Failed to delete welcome note" }, { status: 500 })
  }
}
