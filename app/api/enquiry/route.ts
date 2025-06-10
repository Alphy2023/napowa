import { NextResponse } from 'next/server';

import {prisma} from '@/lib/prisma';
import { z } from 'zod'; 
import { contactFormSchema } from '@/schemas/contactUs.schema';




// GET handler: Read contact us enquiries
export async function GET() {
    try {
        const settings = await prisma.enquiry.findMany({
            include:{
                responses:true
            }
        });

        return NextResponse.json({ data: settings }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch enquiries:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST handler: Create contact us 
export async function POST(request: Request) {

    try {
        const body = await request.json();
        const validatedData = contactFormSchema.parse(body); // Zod validation

        await prisma.enquiry.create({
            data: validatedData,
        });
        // send email to me

        return NextResponse.json(
            { message: "Thank you for contacting us. We'll get back to you within 24 hours." },
            { status: 201 } // Created
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation error submitting message:", error.errors);
            return NextResponse.json(
                { message: "Validation failed", errors: error.errors },
                { status: 400 } // Bad Request
            );
        }
        
        console.error("Error creating contact us message:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

