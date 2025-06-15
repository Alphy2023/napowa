import { clsx, type ClassValue } from "clsx"
import { getFirstDynamicReason } from "next/dist/server/app-render/dynamic-rendering";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Converts a number of bytes into a human-readable string (e.g., KB, MB, GB).
 * @param bytes The number of bytes.
 * @param decimals The number of decimal places to include (default: 2).
 * @returns A human-readable string representing the file size.
 */
export function formatBytes(bytes: number | undefined, decimals = 2): string {
  if (bytes === undefined || bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const isVideoFormat = (format: string | undefined | null) => { 
  const videoFormats = ['mp4', 'mov', 'avi', 'wmv', 'flv', 'webm', 'mkv'];
  // a check to ensure format is a string before calling toLowerCase()
  if (typeof format !== 'string') {
    return false;
  }
  return videoFormats.includes(format.toLowerCase());
};

export const getFullname = (firstname:string,lastname:string)=>{
  if(!lastname) return firstname+" "
  return firstname +" "+ lastname;
}
export const FIELDTYPES = {
  INPUT:"input",
  TEXTAREA:"textarea",
  COMBOBOX:"combobox",
  SWITCH:"switch",
  CHECKBOX:"checkbox",
  OTP:"otp",
  SELECT:"select",
  PHONE_INPUT:"phone_input",
}
export type FieldType = (typeof FIELDTYPES)[keyof typeof FIELDTYPES]