import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const active = searchParams.get("active") !== "false"
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")

    const where: any = {}
    if (active) where.isActive = true
    if (featured) where.featured = true
    if (category) where.categoryId = category

    const programs = await prisma.program.findMany({
      where,
      include: { category: true, createdBy: { select: { id: true, email: true } } },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit,
      skip: offset,
    })

    const total = await prisma.program.count({ where })

    return NextResponse.json({ programs, total, limit, offset })
  } catch (error) {
    console.error("[v0] Error fetching programs:", error)
    return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, categoryId, createdById, ...data } = body

    const program = await prisma.program.create({
      data: {
        title,
        slug,
        categoryId,
        createdById,
        ...data,
      },
      include: { category: true, createdBy: true },
    })

    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating program:", error)
    return NextResponse.json({ error: "Failed to create program" }, { status: 500 })
  }
}
