
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Set up Cloudinary configuration using environment variables
// Ensure these are set in your .env.local file (e.g., NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ensure the route is dynamic and runs in the Node.js runtime
export const dynamic = 'force-dynamic'; // Prevent caching of this API route
export const runtime = 'nodejs'; // Ensure it runs in Node.js environment

/**
 * Handles POST requests for image uploads to Cloudinary.
 * @param req The Next.js Request object containing the image file.
 * @returns A NextResponse object with the Cloudinary upload result or an error.
 */
export async function POST(req: Request) {
  try {
    // Parse the incoming multipart/form-data request using req.formData()
    const formData = await req.formData();
    const file = formData.get('file') as File | null; // Get the file from the 'file' field

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    // Convert the File object to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the file buffer to Cloudinary
    // The `stream: true` option tells Cloudinary to expect a buffer/stream
    // and handle the upload directly without needing a temporary file path.
    const result = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: 'herb-images', // Optional: specify a folder in your Cloudinary account
          // You can add more upload options here, e.g., transformations, tags, etc.
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      uploadStream.end(buffer); // End the stream with the file buffer
    });

    // Return the necessary Cloudinary data to the client
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      asset_id: result.asset_id,
      version: result.version,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      original_filename: result.original_filename,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Cloudinary upload error on backend:', error);
    // Cloudinary upload_stream errors might not have a specific 'message' property
    const errorMessage = error.message || 'Unknown upload error.';
    return NextResponse.json(
      { success: false, message: `Internal server error during upload: ${errorMessage}` },
      { status: 500 }
    );
  }
}
