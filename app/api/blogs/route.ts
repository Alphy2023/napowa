import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { createSlug } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const published = searchParams.get("published") === "true"

    const where: any = {}
    if (published) where.published = true
    if (category) where.category = category

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: { author: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { publishedAt: "desc" },
      }),
      prisma.blog.count({ where }),
    ])

    return NextResponse.json({
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { title, content, excerpt, category, tags, authorId, featuredImage } = data

    const slug = createSlug(title)

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        tags: tags || [],
        featuredImage,
        authorId,
      },
      include: { author: true },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    )
  }
}
