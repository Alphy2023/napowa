import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.programCategory.findUnique({
      where: { id: params.id },
      include: { _count: { select: { programs: true } } },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("[v0] Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const category = await prisma.programCategory.update({
      where: { id: params.id },
      data: body,
      include: { _count: { select: { programs: true } } },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error("[v0] Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.programCategory.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Category deleted" })
  } catch (error) {
    console.error("[v0] Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
