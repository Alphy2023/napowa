import { z } from 'zod';

// Custom phone number validation (for Kenyan numbers and international with country code)
const phoneRegex = new RegExp(
  /^(\+?254|0)?(7[0-9]{8}|1[0-9]{8})$|^(\+[1-9]\d{1,14})$/
);
export const phoneFieldSchema = z.string().min(1, "Phone number required").refine(
  (value) => phoneRegex.test(value.replace(/\s/g, '')), // Remove spaces before testing
  "Must be a valid phone number (e.g., 07XXXXXXXX, +254XXXXXXXXX, or international format)"
);

export const emailFieldSchema = z.string().min(1, "Email required")
.email("Please enter a valid email address.");
