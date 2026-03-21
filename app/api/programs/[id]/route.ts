import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const program = await prisma.program.findUnique({
      where: { id: params.id },
      include: { category: true, createdBy: true },
    })

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    // Increment views
    await prisma.program.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(program)
  } catch (error) {
    console.error("[v0] Error fetching program:", error)
    return NextResponse.json({ error: "Failed to fetch program" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const program = await prisma.program.update({
      where: { id: params.id },
      data: body,
      include: { category: true, createdBy: true },
    })

    return NextResponse.json(program)
  } catch (error) {
    console.error("[v0] Error updating program:", error)
    return NextResponse.json({ error: "Failed to update program" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.program.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Program deleted" })
  } catch (error) {
    console.error("[v0] Error deleting program:", error)
    return NextResponse.json({ error: "Failed to delete program" }, { status: 500 })
  }
}
