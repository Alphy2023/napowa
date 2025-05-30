import { z } from "zod";

export const LandingPageSlideSchema = z.object({
  id: z.string(),
  image: z.string().min(1, "Image is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  buttonText: z.string().min(1, "Primary button is required."),
  buttonLink: z.string().min(1, "Primary button link is required."),
  secondaryButtonText: z.string().min(1, "Secondary button is required."),
  secondaryButtonLink: z.string().min(1, "Secondary button link is required."),
});

const LandingPageSlideFormchema = z.object({
  slides: z.array(LandingPageSlideSchema).min(1, "At least one slide is required."),
});

export type SlideType = z.infer<typeof LandingPageSlideSchema>;
export type FormValues = z.infer<typeof LandingPageSlideFormchema>;
