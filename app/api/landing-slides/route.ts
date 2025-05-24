

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust import based on your structure

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of slides" }, { status: 400 });
    }

    // Validate and prepare slides
    const validSlides = body.map((slide) => ({
      image: slide.image,
      title: slide.title,
      description: slide.description,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      secondaryButtonText: slide.secondaryButtonText,
      secondaryButtonLink: slide.secondaryButtonLink,
    }));

    // Check uniqueness for each slide before inserting
    for (const slide of validSlides) {
      // Check if image exists
      const existingImage = await prisma.landingPageSlide.findFirst({
        where: { image: slide.image },
      });
      // if (existingImage) {
      //   return NextResponse.json(
      //     { error: `Slide with image "${slide.image}" already exists` },
      //     { status: 409 }
      //   );
      // }

      // Check if title exists
      const existingTitle = await prisma.landingPageSlide.findFirst({
        where: { title: slide.title },
      });
      if (existingTitle) {
        return NextResponse.json(
          { error: `Slide with title "${slide.title}" already exists` },
          { status: 409 }
        );
      }

      // Check if description exists
      const existingDescription = await prisma.landingPageSlide.findFirst({
        where: { description: slide.description },
      });
      if (existingDescription) {
        return NextResponse.json(
          { error: `Slide with description "${slide.description}" already exists` },
          { status: 409 }
        );
      }
    }

    // If no duplicates found, insert all slides
    const result = await prisma.landingPageSlide.createMany({
      data: validSlides,
      skipDuplicates: true, // optional: still useful to avoid duplicates if DB constraints exist
    });

    return NextResponse.json({ message: "Landing page created successfully", data: result }, { status: 201 });
  } catch (error) {
    console.error("Error creating slides:", error);
    return NextResponse.json({ error: "Failed to create slides" }, { status: 500 });
  }
}


export async function GET() {
  const slides = await prisma.landingPageSlide.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(slides);
}
