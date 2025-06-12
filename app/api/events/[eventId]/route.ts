import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { EventFormData } from "@/types/events"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    })

    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    const transformedEvent = {
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      category: event.category,
      location: event.location,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString(),
      status: event.status as "upcoming" | "ongoing" | "completed" | "cancelled",
      featuredImage: event.featuredImage,
      capacity: event.capacity,
      registrations: event.registrations || 0,
      organizer: event.organizer,
      createdAt: event.createdAt ? event.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: event.updatedAt ? event.updatedAt.toISOString() : new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: transformedEvent,
    })
  } catch (error) {
    console.error("Event fetch error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch event" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body: EventFormData = await request.json()
    const { title, description, category, location, startDate, endDate, capacity, organizer, featuredImage } = body

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id: params.id },
    })

    if (!existingEvent) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    // Generate new slug if title changed
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Update the event
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        description,
        category,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        capacity,
        organizer,
        featuredImage,
      },
    })

    const transformedEvent = {
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      category: event.category,
      location: event.location,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString(),
      status: event.status as "upcoming" | "ongoing" | "completed" | "cancelled",
      featuredImage: event.featuredImage,
      capacity: event.capacity,
      registrations: event.registrations || 0,
      organizer: event.organizer,
      createdAt: event.createdAt ? event.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: event.updatedAt ? event.updatedAt.toISOString() : new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: transformedEvent,
      message: "Event updated successfully",
    })
  } catch (error) {
    console.error("Event update error:", error)
    return NextResponse.json({ success: false, error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if event has registrations
    const eventWithRegistrations = await prisma.event.findUnique({
      where: { id: params.id },
      select: {
        registrations: true,
      },
    })

    if (!eventWithRegistrations) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    if ((eventWithRegistrations.registrations || 0) > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete event with existing registrations" },
        { status: 400 },
      )
    }

    // Delete the event
    await prisma.event.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully",
    })
  } catch (error) {
    console.error("Event deletion error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete event" }, { status: 500 })
  }
}
