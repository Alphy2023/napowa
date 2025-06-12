export interface CloudinaryUploadResult {
  success: boolean
  url: string
  public_id: string
  asset_id: string
  version: number
  format: string
  width: number
  height: number
  bytes: number
  original_filename: string
}

export interface UploadingImage {
  id: string
  file: File
  progress: number
  preview?: string
  status: "idle" | "uploading" | "success" | "error"
  error?: string
  cloudinaryData?: CloudinaryUploadResult
}

export interface UploadCallbacks {
  onProgress?: (id: string, progress: number) => void
  onSuccess: (id: string, result: CloudinaryUploadResult) => void
  onFailure: (id: string, error: string) => void
  onStatusChange: (id: string, status: "idle" | "uploading" | "success" | "error") => void
}
