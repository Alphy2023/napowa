import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: { organizer: true, registrations: true },
    })

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch event" },
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

    // Handle date conversions
    if (data.startDate) data.startDate = new Date(data.startDate)
    if (data.endDate) data.endDate = new Date(data.endDate)

    const event = await prisma.event.update({
      where: { id: params.id },
      data,
      include: { organizer: true },
    })

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Event deleted successfully" })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    )
  }
}
