import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { EventFormData, EventResponse } from "@/types/events"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || "all"
    const status = searchParams.get("status") || "all"
    const sortBy = searchParams.get("sortBy") || "startDate"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const skip = (page - 1) * limit

    // Build where clause for filtering
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { organizer: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category !== "all") {
      where.category = category
    }

    if (status !== "all") {
      where.status = status
    }

    // Get total count for pagination
    const total = await prisma.event.count({ where })

    // Fetch events
    const events = await prisma.event.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    })

    // Transform the data to match our interface
    const transformedEvents = events.map((event) => ({
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
    }))

    const response: EventResponse = {
      events: transformedEvents,
      total,
      page,
      limit,
    }

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Events API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch events",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: EventFormData = await request.json()
    const { title, description, category, location, startDate, endDate, capacity, organizer, featuredImage } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Create the event
    const event = await prisma.event.create({
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
        status: "upcoming",
        registrations: 0,
      },
    })

    // Transform the response
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
      message: "Event created successfully",
    })
  } catch (error) {
    console.error("Event creation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create event",
      },
      { status: 500 },
    )
  }
}
