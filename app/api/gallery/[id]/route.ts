// app/api/gallery/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define the CloudinaryImageData interface consistent with your frontend
interface CloudinaryImageData {
    url: string;
    public_id: string;
    asset_id: string;
    version: number;
    format: string;
    width: number;
    height: number;
    bytes: number;
    original_filename: string;
}

// Zod schema for backend validation of the incoming form data
// This should mirror your frontend galleryFormSchema, but also explicitly include `media`
const gallerySubmissionSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(200, { message: "Title is too long" }),
    description: z.string().max(1000, { message: "Description is too long" }).optional(),
    album: z.string().min(1, { message: "Album is required" }),
    tags: z.string().optional(),
    isFeatured: z.boolean().default(false),
    country: z.string().min(1, { message: "Country is required" }),
    county: z.string().min(1, { message: "County is required" }),
    yearTaken: z.number()
        .min(1900, { message: "Year must be 1900 or later" })
        .max(new Date().getFullYear(), { message: "Year cannot be in the future" })
        .int({ message: "Year must be a whole number" }),
    media: z.array(z.object({ // This array will contain the Cloudinary image data
        url: z.string().url("Invalid URL format for media URL."),
        public_id: z.string().min(1, "Public ID is required for media."),
        asset_id: z.string().min(1, "Asset ID is required for media."),
        version: z.number().int(),
        format: z.string().min(1),
        width: z.number().int(),
        height: z.number().int(),
        bytes: z.number().int(),
        original_filename: z.string().min(1),
    })).min(1, { message: "At least one media file must be uploaded and successfully processed." }),
});



// GET function to fetch a single gallery item by ID
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } | Promise<{ id: string }> }
) {
    try {
        // Await params first, then destructure
        const resolvedParams = await Promise.resolve(params); 
        const { id } = resolvedParams;

        const galleryItem = await prisma.gallery.findUnique({
            where: {
                id: id,
            },
        });

        if (!galleryItem) {
            return NextResponse.json({success:false, 
                message: 'Gallery item not found' }, { status: 404 });
        }

        return NextResponse.json({data:galleryItem, success:true}, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/gallery/[id]:', error);
        return NextResponse.json(
            { message: 'Failed to fetch gallery item',
                success:false,
                 error: (error as Error).message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// PUT function to update a gallery item by ID
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        // Validate the incoming request body using Zod
        const validationResult = gallerySubmissionSchema.safeParse(body);

        if (!validationResult.success) {
            console.error('Validation Error (Backend - PUT):', validationResult.error.errors);
            return NextResponse.json(
                { message: 'Validation failed', errors: validationResult.error.errors },
                { status: 400 }
            );
        }

        const { title, description, album, tags, isFeatured, country, county, yearTaken, media } = validationResult.data;

        const updatedGalleryEntry = await prisma.gallery.update({
            where: {
                id: id,
            },
            data: {
                title,
                description,
                album,
                tags,
                isFeatured,
                country,
                county,
                yearTaken,
                media: media as any,
            },
        });

        return NextResponse.json(
            { message: 'Gallery entry updated successfully', gallery: updatedGalleryEntry },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in PUT /api/gallery/[id]:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: 'Invalid request data format', errors: error.errors },
                { status: 400 }
            );
        } else if (error instanceof Error) {
            // Check if it's a Prisma "record not found" error
            if ((error as any).code === 'P2025') {
                return NextResponse.json(
                    { message: 'Gallery item not found for update' },
                    { status: 404 }
                );
            }
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

// DELETE function to delete a gallery item by ID
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        await prisma.gallery.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json(
            { message: 'Gallery entry deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in DELETE /api/gallery/[id]:', error);

        if ((error as any).code === 'P2025') {
            return NextResponse.json(
                { message: 'Gallery item not found for deletion' },
                { status: 404 }
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