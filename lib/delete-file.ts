
import { toast } from "@/hooks/use-toast";
import { CloudinaryUploadResult } from "@/types/upload-result.types";


interface DeleteCallbacks {
  onSuccess?: (publicId: string) => void;
  onFailure?: (publicId: string, error: string) => void;
}

/**
 * Deletes an image from Cloudinary via your backend API route.
 *
 * @param image The CloudinaryUploadResult object of the image to delete.
 * @param callbacks Optional callbacks for success and failure.
 * @returns A Promise that resolves to true on successful deletion, false otherwise.
 */
export const deleteImageFromCloudinary = async (
  image: CloudinaryUploadResult,
  callbacks?: DeleteCallbacks
): Promise<boolean> => {
  if (!image || !image.public_id) {
    console.warn("Attempted to delete an image without a public_id.");
    callbacks?.onFailure?.("", "File object or public_id missing.");
    toast({
      title: "Deletion Failed",
      description: "Cannot delete file: Missing public ID.",
      variant: "destructive",
    });
    return false;
  }

  const publicId = image.public_id;

  try {
    const response = await fetch("/api/delete-cloudinary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: publicId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Failed to delete image from Cloudinary.";
      console.error(`Failed to delete image "${publicId}" from Cloudinary:`, errorMessage);
      callbacks?.onFailure?.(publicId, errorMessage);
      toast({
        title: "Deletion Failed",
        description: `Could not delete image "${image.original_filename || publicId}": ${errorMessage}`,
        variant: "destructive",
      });
      return false;
    }

    callbacks?.onSuccess?.(publicId);
    toast({
      title: "Image Deleted",
      description: `Image "${image.original_filename || publicId}" removed successfully.`,
    });
    return true;

  } catch (error: any) {
    console.error(`Network error during Cloudinary deletion for "${publicId}":`, error);
    const errorMessage = `Network error: ${error.message || "Unknown error."}`;
    callbacks?.onFailure?.(publicId, errorMessage);
    toast({
      title: "Deletion Error",
      description: `Network error while trying to delete image "${image.original_filename || publicId}".`,
      variant: "destructive",
    });
    return false;
  }
};