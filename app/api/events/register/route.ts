import { NextResponse } from "next/server"
import { registerForEvent, getEventById } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventId, firstName, lastName, email, phone, organization, specialRequirements, memberId } = body

    // Validate input
    if (!eventId || !firstName || !lastName || !email) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Check if event exists
    const event = await getEventById(eventId)
    if (!event) {
      return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 })
    }

    // Check if event has reached capacity
    if (event._count.registrations >= event.capacity) {
      return NextResponse.json({ success: false, message: "Event has reached maximum capacity" }, { status: 400 })
    }

    // Register for the event
    const registration = await registerForEvent(eventId, {
      firstName,
      lastName,
      email,
      phone,
      organization,
      specialRequirements,
      memberId,
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      registration,
    })
  } catch (error) {
    console.error("Event registration error:", error)
    return NextResponse.json({ success: false, message: "Failed to register for event" }, { status: 500 })
  }
}
