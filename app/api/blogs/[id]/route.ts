import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: { author: true },
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Increment views
    await prisma.blog.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    const blog = await prisma.blog.update({
      where: { id: params.id },
      data,
      include: { author: true },
    })

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    )
  }
}
