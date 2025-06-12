import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of slides" }, { status: 400 })
    }

    // Validate and prepare slides with JSON image data
    const validSlides = body.map((slide, index) => {
      // Validate that image is a proper Cloudinary object
      if (!slide.image || typeof slide.image !== "object" || !slide.image.url) {
        throw new Error(`Invalid image data for slide ${index + 1}: ${slide.title || "Untitled"}`)
      }

      return {
        id: slide.id, // Keep the ID if it exists (for updates)
        image: slide.image, // Store the entire Cloudinary object as JSON
        title: slide.title,
        description: slide.description,
        buttonText: slide.buttonText,
        buttonLink: slide.buttonLink,
        secondaryButtonText: slide.secondaryButtonText,
        secondaryButtonLink: slide.secondaryButtonLink,
      }
    })

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Get all existing slides
      const existingSlides = await tx.landingPageSlide.findMany()
      const existingIds = existingSlides.map((slide) => slide.id)

      // Separate slides into updates and creates
      const slidesToUpdate = validSlides.filter((slide) => slide.id && existingIds.includes(slide.id))
      const slidesToCreate = validSlides.filter((slide) => !slide.id || !existingIds.includes(slide.id))

      // Get IDs of slides that should be kept (from the current form submission)
      const submittedIds = validSlides.filter((slide) => slide.id).map((slide) => slide.id)

      // Delete slides that are no longer in the submission
      const slidesToDelete = existingIds.filter((id) => !submittedIds.includes(id))

      if (slidesToDelete.length > 0) {
        await tx.landingPageSlide.deleteMany({
          where: {
            id: {
              in: slidesToDelete,
            },
          },
        })
      }

      // Update existing slides
      const updatedSlides = []
      for (const slide of slidesToUpdate) {
        const { id, ...slideData } = slide
        const updated = await tx.landingPageSlide.update({
          where: { id },
          data: {
            ...slideData,
            updatedAt: new Date(),
          },
        })
        updatedSlides.push(updated)
      }

      // Create new slides
      const createdSlides = []
      for (const slide of slidesToCreate) {
        const { id, ...slideData } = slide // Remove id for creation
        const created = await tx.landingPageSlide.create({
          data: slideData,
        })
        createdSlides.push(created)
      }

      return {
        updated: updatedSlides,
        created: createdSlides,
        deleted: slidesToDelete.length,
        total: updatedSlides.length + createdSlides.length,
      }
    })

    return NextResponse.json(
      {
        message: "Landing page slides saved successfully",
        data: result,
        summary: {
          updated: result.updated.length,
          created: result.created.length,
          deleted: result.deleted,
          total: result.total,
        },
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error saving slides:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to save slides",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const slides = await prisma.landingPageSlide.findMany({
      orderBy: { createdAt: "asc" }, // Changed to asc to maintain order
    })

    return NextResponse.json(slides)
  } catch (error) {
    console.error("Error fetching slides:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch slides",
      },
      { status: 500 },
    )
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 })
    }

    const updatedSlide = await prisma.landingPageSlide.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      message: "Slide updated successfully",
      data: updatedSlide,
    })
  } catch (error: any) {
    console.error("Error updating slide:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to update slide",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Slide ID is required" }, { status: 400 })
    }

    await prisma.landingPageSlide.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Slide deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting slide:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to delete slide",
      },
      { status: 500 },
    )
  }
}
