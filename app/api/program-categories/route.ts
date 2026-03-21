import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active") !== "false"

    const where: any = {}
    if (active) where.isActive = true

    const categories = await prisma.programCategory.findMany({
      where,
      include: { _count: { select: { programs: true } } },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("[v0] Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, ...data } = body

    const category = await prisma.programCategory.create({
      data: {
        name,
        slug,
        ...data,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
