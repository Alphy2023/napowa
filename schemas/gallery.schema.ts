import { z } from "zod";

// Zod schema for form validation
export const galleryFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(200, { message: "Title is too long" }),
  description: z.string().max(1000, { message: "Description is too long" }).optional(),
  album: z.string().min(1, { message: "Album is required" }),
  tags: z.string().optional(),
  isFeatured: z.boolean().default(false),
  country: z.string().min(1, { message: "Country is required" }),
  county: z.string().min(1, { message: "County is required" }),
  yearTaken: z.preprocess(
    (val) => Number(val),
    z.number()
      .min(1900, { message: "Year must be 1900 or later" })
      .max(new Date().getFullYear(), { message: "Year cannot be in the future" })
      .int({ message: "Year must be a whole number" }),
    { message: "Invalid year format" } // This message is for cases where preprocess fails
  ),
});

export const gallerySubmissionSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(200, { message: "Title is too long" }),
    description: z.string().max(1000, { message: "Description is too long" }).optional(),
    album: z.string().min(1, { message: "Album is required" }),
    tags: z.string().optional(),
    isFeatured: z.boolean().default(false),
    country: z.string().min(1, { message: "Country is required" }),
    county: z.string().min(1, { message: "County is required" }),
    yearTaken: z.number()
        .min(1900, { message: "Year must be 1900 or later" })
        .max(new Date().getFullYear(), { message: "Year cannot be in the future" })
        .int({ message: "Year must be a whole number" }),
    media: z.array(z.object({ // This array will contain the Cloudinary image data
        url: z.string().url("Invalid URL format for media URL."),
        public_id: z.string().min(1, "Public ID is required for media."),
        asset_id: z.string().min(1, "Asset ID is required for media."),
        version: z.number().int(),
        format: z.string().min(1),
        width: z.number().int(),
        height: z.number().int(),
        bytes: z.number().int(),
        original_filename: z.string().min(1),
    })).min(1, { message: "At least one media file must be uploaded and successfully processed." }),
});

export type GalleryFormValues = z.infer<typeof galleryFormSchema>;
export type GallerySubmissionPayload = z.infer<typeof gallerySubmissionSchema>;