import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const values = await prisma.aboutUsValue.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })
    return NextResponse.json(values)
  } catch (error) {
    console.error("Error fetching values:", error)
    return NextResponse.json({ error: "Failed to fetch values" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, icon } = body

    const value = await prisma.aboutUsValue.create({
      data: { title, description, icon },
    })

    return NextResponse.json(value)
  } catch (error) {
    console.error("Error creating value:", error)
    return NextResponse.json({ error: "Failed to create value" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, title, description, icon, isActive, order } = body

    if (!id) {
      return NextResponse.json({ error: "Value ID is required" }, { status: 400 })
    }

    const value = await prisma.aboutUsValue.update({
      where: { id },
      data: { title, description, icon, isActive, order },
    })

    return NextResponse.json(value)
  } catch (error) {
    console.error("Error updating value:", error)
    return NextResponse.json({ error: "Failed to update value" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Value ID is required" }, { status: 400 })
    }

    await prisma.aboutUsValue.delete({ where: { id } })
    return NextResponse.json({ message: "Value deleted successfully" })
  } catch (error) {
    console.error("Error deleting value:", error)
    return NextResponse.json({ error: "Failed to delete value" }, { status: 500 })
  }
}
