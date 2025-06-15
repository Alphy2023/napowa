// Define the structure for uploaded image data from Cloudinary
export interface CloudinaryUploadResult {
  url: string
  public_id: string
  asset_id?: string
  version?: number
  signature?: string
  width?: number
  height?: number
  format?: string
  resource_type?: string
  created_at?: string
  bytes?: number
  type?: string
  etag?: string
  placeholder?: boolean
  original_filename?: string
}

// Define the structure for an image during the upload process
export interface UploadingImage {
  id?:string | number
  file: File
  preview: string
  progress: number
  status: "pending" | "uploading" | "completed" | "failed"
  cloudinaryData?: CloudinaryUploadResult // This will hold the data from Cloudinary
  error?: string
}
export interface UploadCallbacks {
  onProgress?: (id: string, progress: number) => void;
  onSuccess: (id: string, result: CloudinaryUploadResult) => void;
  onFailure: (id: string, error: string) => void;
  onStatusChange: (id: string, status: UploadingImage['status']) => void;
}

export type UploadedItem ={

  success?: boolean;
  url: string;
  public_id: string;
  asset_id: string;
  version: string | number;
  format: string | number;
  width: number
  height: number
  bytes: number
  original_filename: string
}