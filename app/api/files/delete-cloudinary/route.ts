
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Configure Cloudinary using environment variables
// Ensure CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET are NOT prefixed with NEXT_PUBLIC_
// as they are sensitive server-side credentials.
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic'; // Prevent caching of this API route
export const runtime = 'nodejs'; // Ensure it runs in Node.js environment

/**
 * Handles POST requests to delete an image from Cloudinary.
 * Expects a JSON body with a 'public_id' field.
 *
 * @param req The Next.js Request object.
 * @returns A NextResponse object indicating success or failure.
 */
export async function POST(req: Request) {
  try {
    const { public_id } = await req.json(); // Get the public_id from the request body

    if (!public_id) {
      return NextResponse.json({ success: false, message: 'Public ID is required.' }, { status: 400 });
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.v2.uploader.destroy(public_id);

    // Cloudinary's destroy method returns { result: 'ok' } on success.
    // It might return 'not found' if the public_id doesn't exist.
    if (result.result === 'ok') {
      return NextResponse.json({ success: true, message: 'Image deleted from Cloudinary.' }, { status: 200 });
    } else {
      console.warn(`Cloudinary deletion response not 'ok' for public_id ${public_id}:`, result);
      return NextResponse.json(
        { success: false, message: result.result || 'Failed to delete image from Cloudinary (unknown reason).' },
        { status: 400 } // Bad request if Cloudinary didn't confirm 'ok'
      );
    }

  } catch (error: any) {
    console.error('Cloudinary deletion error on backend:', error);
    return NextResponse.json(
      { success: false, message: `Internal server error during deletion: ${error.message || 'Unknown server error.'}` },
      { status: 500 }
    );
  }
}