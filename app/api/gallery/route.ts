import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { gallerySubmissionSchema } from '@/schemas/gallery.schema';
import { GalleryListResponse } from '@/types/gallery';



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12") // Default limit to 12 as per frontend
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || "all"
    const type = searchParams.get("type") || "all" // Assuming 'type' is a filter, though not in schema
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const skip = (page - 1) * limit

    // Build where clause for filtering
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { contains: search, mode: "insensitive" } }, 
      ]
    }

    if (category !== "all") {
      where.album = category 
    }

    if (type !== "all") {
        where.type = type
    }

    // Get total count for pagination
    const total = await prisma.gallery.count({ where }) // Changed from prisma.media to prisma.gallery

    // Fetch gallery entries
    const galleryEntries = await prisma.gallery.findMany({ // Changed from prisma.media to prisma.gallery
      where,
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    })

    // Transform categories for the frontend, including mediaCount
    const categoriesWithCounts = await prisma.gallery.groupBy({ // Changed from prisma.media to prisma.gallery
        by: ['album'], // Group by 'album' field as it's the category equivalent in your schema
        _count: {
            album: true,
        },
    });

    const transformedCategories = categoriesWithCounts.map(cat => ({
        id: cat.album, // Using album name as ID for simplicity
        name: cat.album,
        slug: cat.album, // Using album name as slug for simplicity
        mediaCount: cat._count.album,
    }));

    const response: GalleryListResponse = {
      galleryEntries: galleryEntries as any[],
      categories: transformedCategories,
      total,
      page,
      limit,
    }

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Gallery API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery media",
      },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the incoming request body using Zod
        const validationResult = gallerySubmissionSchema.safeParse(body);

        if (!validationResult.success) {
            console.error('Validation Error (Backend):', validationResult.error.errors);
            return NextResponse.json(
                { message: 'Validation failed', errors: validationResult.error.errors },
                { status: 400 }
            );
        }

        const { title, description, album, tags, isFeatured, country, county, yearTaken, media } = validationResult.data;

        // Save data to the database using Prisma
        const newGalleryEntry = await prisma.gallery.create({
            data: {
                title,
                description,
                album,
                tags,
                isFeatured,
                country,
                county,
                yearTaken,
                media: media as any, // Cast to 'any' for Prisma's Json type. Prisma will handle the JSON serialization.
            },
        });

        return NextResponse.json(
            { message: 'Gallery entry created successfully', gallery: newGalleryEntry },
            { status: 201 } // 201 Created status
        );

    } catch (error) {
        console.error('Error in POST /api/gallery:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Invalid request data format', errors: error.errors },
                { status: 400 }
            );
        } else if (error instanceof Error) {
            return NextResponse.json(
                { message: 'Internal server error', error: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { message: 'An unknown error occurred' },
                { status: 500 }
            );
        }
    } finally {
        await prisma.$disconnect();
    }
}