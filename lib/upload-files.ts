
import { toast } from "@/hooks/use-toast"; // Assuming useToast is accessible
import { CloudinaryUploadResult, UploadCallbacks, UploadingImage } from "@/types/upload-result.types";
import { Dispatch, SetStateAction } from "react";



/**
 * Uploads a file to Cloudinary via a backend API endpoint.
 * This function should be called for each file you want to upload.
 *
 * @param imageToUpload The UploadingImage object representing the file to upload.
 * @param callbacks An object containing callback functions for progress, success, and failure.
 * @returns Promise<void>
 */
export const uploadFileToCloudinary = async (
  imageToUpload: UploadingImage,
  callbacks: UploadCallbacks
): Promise<void> => {
  const { id, file } = imageToUpload;
  const { onProgress, onSuccess, onFailure, onStatusChange } = callbacks;

  onStatusChange(id, "uploading"); // Update status via callback

  const formData = new FormData();
  formData.append("file", file);

  try {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentCompleted = (event.loaded / event.total) * 100;
        onProgress?.(id, percentCompleted);
      }
    });

    xhr.open("POST", "/api/upload-cloudinary"); // Your backend endpoint
    xhr.send(formData);

    await new Promise<void>((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result: CloudinaryUploadResult = JSON.parse(xhr.responseText);
            onSuccess(id, result); // Call success callback
            resolve();
          } catch (e) {
            onFailure(id, "Failed to parse server response.");
            reject(new Error("Failed to parse server response."));
          }
        } else {
          let errorMessage = `Upload failed with status: ${xhr.status}`;
          try {
            const errorResponse = JSON.parse(xhr.responseText);
            errorMessage = errorResponse.message || errorMessage;
          } catch (e) {
            // response not JSON
          }
          onFailure(id, errorMessage); // Call failure callback
          reject(new Error(errorMessage));
        }
      };

      xhr.onerror = () => {
        onFailure(id, "Network error or server unreachable."); // Call failure callback
        reject(new Error("Network error or server unreachable."));
      };
    });

    toast({
      title: "Image Uploaded",
      description: `${file.name} uploaded successfully.`,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    onFailure(id, error.message || "Upload failed"); // Call failure callback
    toast({
      title: "Upload Failed",
      description: `Failed to upload ${file.name}: ${error.message || "Unknown error."}`,
      variant: "destructive",
    });
  }
};