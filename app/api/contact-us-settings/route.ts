import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth"

import prisma from '@/lib/prisma';
import { z } from 'zod'; 
import { Prisma } from '@prisma/client'; 

import { ContactUsSettingsSchema, ContactUsSettings } 
from '@/schemas/contactUs.schema';
import { INITIAL_DEFAULT_CONTACT_SETTINGS } from '@/constants/mock-data';


// GET handler: Read contact us settings
export async function GET() {
    try {
        // Find the first (and ideally only) contact us settings entry
        let settings = await prisma.contactUsSettings.findFirst();

        // If no settings exist, create a default one
        if (!settings) {
            settings = await prisma.contactUsSettings.create({
                data: INITIAL_DEFAULT_CONTACT_SETTINGS as Prisma.ContactUsSettingsCreateInput,
            });
        }

        return NextResponse.json({ data: settings }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch contact us settings:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST handler: Create contact us settings
// This route is typically used for initial setup if settings don't exist.
// If settings are always expected to exist (e.g., singleton), then PUT is more common.
export async function POST(request: Request) {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        const body = await request.json();
        const validatedData = ContactUsSettingsSchema.parse(body); // Zod validation

        // Check if settings already exist to prevent multiple entries
        const existingSettings = await prisma.contactUsSettings.findFirst();
        if (existingSettings) {
            return NextResponse.json(
                { message: "Contact Us settings already exist. Use PUT to update." },
                { status: 409 } // Conflict
            );
        }

        const newSettings = await prisma.contactUsSettings.create({
            data: validatedData as Prisma.ContactUsSettingsCreateInput, // Cast for Prisma compatibility
        });

        return NextResponse.json(
            { message: "Contact Us settings created successfully", data: newSettings },
            { status: 201 } // Created
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation error creating settings:", error.errors);
            return NextResponse.json(
                { message: "Validation failed", errors: error.errors },
                { status: 400 } // Bad Request
            );
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle Prisma specific errors, e.g., unique constraint violation
            if (error.code === 'P2002') { // Unique constraint failed
                return NextResponse.json(
                    { message: "A contact settings entry already exists." },
                    { status: 409 }
                );
            }
        }
        console.error("Error creating contact us settings:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// PUT handler: Update contact us settings
export async function PUT(request: Request) {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        const body = await request.json();
        const validatedData = ContactUsSettingsSchema.parse(body); // Zod validation

        // Find the settings to update. Assuming a single settings entry.
        const existingSettings = await prisma.contactUsSettings.findFirst();

        if (!existingSettings) {
            return NextResponse.json(
                { message: "No Contact Us settings found to update. Use POST to create." },
                { status: 404 } // Not Found
            );
        }

        const updatedSettings = await prisma.contactUsSettings.update({
            where: { id: existingSettings.id }, // Update the existing entry
            data: validatedData as Prisma.ContactUsSettingsUpdateInput, // Cast for Prisma compatibility
        });

        return NextResponse.json(
            { message: "Contact Us settings updated successfully", data: updatedSettings },
            { status: 200 } // OK
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation error updating settings:", error.errors);
            return NextResponse.json(
                { message: "Validation failed", errors: error.errors },
                { status: 400 } // Bad Request
            );
        }
        console.error("Error updating contact us settings:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE handler: Delete contact us settings
export async function DELETE() {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    try {
        // Find the settings to delete. Assuming a single settings entry.
        const existingSettings = await prisma.contactUsSettings.findFirst();

        if (!existingSettings) {
            return NextResponse.json(
                { message: "No Contact Us settings found to delete" },
                { status: 404 } // Not Found
            );
        }

        await prisma.contactUsSettings.delete({
            where: { id: existingSettings.id },
        });

        return NextResponse.json(
            { message: "Contact Us settings deleted successfully" },
            { status: 200 } // OK
        );
    } catch (error) {
        console.error("Error deleting contact us settings:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}