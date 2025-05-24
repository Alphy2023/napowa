import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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