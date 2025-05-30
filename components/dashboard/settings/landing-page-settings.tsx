"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Save, Plus, Trash, ArrowUp, ArrowDown } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class concatenation

// Zod Schema for a single slide
const SlideSchema = z.object({
  id: z.string(),
  image: z.string().min(1, "Image is required."),
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  buttonText: z.string().min(1, "Primary button text is required."),
  buttonLink: z.string().min(1, "Primary button link is required."),
  secondaryButtonText: z.string().min(1, "Secondary button text is required."),
  secondaryButtonLink: z.string().min(1, "Secondary button link is required."),
});

// Zod Schema for the entire form, which contains an array of slides
const FormSchema = z.object({
  slides: z.array(SlideSchema).min(1, "At least one slide is required."),
});

type FormValues = z.infer<typeof FormSchema>;

const DEFAULT_BUTTON_OPTIONS = [
  "Donate Now",
  "Our Programs",
  "Our Impact",
  "Partner With Us",
  "Become a Member",
  "Learn More",
];

const BUTTON_LINKS: Record<string, string> = {
  "Donate Now": "/donate",
  "Our Programs": "/programs",
  "Our Impact": "/impact",
  "Partner With Us": "/partner",
  "Become a Member": "/auth/signup",
  "Learn More": "/about",
};

export const LandingPageSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customButtons, setCustomButtons] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      slides: [
        {
          id: uuidv4(),
          image: "",
          title: "",
          description: "",
          buttonText: "",
          buttonLink: "",
          secondaryButtonText: "",
          secondaryButtonLink: "",
        },
      ],
    },
    mode: "onChange", // Validate on change for better user feedback
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "slides",
  });

  // Watch for changes in slides to re-evaluate filtered options
  const slides = watch("slides");

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(`slides.${index}.image`, reader.result as string, {
          shouldValidate: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only image files are allowed.");
      setValue(`slides.${index}.image`, "", { shouldValidate: true }); // Clear invalid image
    }
  };

  const handleAddCustomButton = (index: number, isPrimary: boolean) => {
    const label = prompt("Enter custom button label:");
    const link = prompt("Enter custom button link:"); // Prompt for link for custom buttons
    if (label && link) {
      setCustomButtons((prev) => [...prev, label]);
      if (isPrimary) {
        setValue(`slides.${index}.buttonText`, label, { shouldValidate: true });
        setValue(`slides.${index}.buttonLink`, link, { shouldValidate: true });
      } else {
        setValue(
          `slides.${index}.secondaryButtonText`,
          label,
          { shouldValidate: true }
        );
        setValue(
          `slides.${index}.secondaryButtonLink`,
          link,
          { shouldValidate: true }
        );
      }
    }
  };

  const getFilteredOptions = (currentIndex: number, isPrimary: boolean) => {
    const used = new Set<string>();
    slides.forEach((slide, i) => {
      if (i === currentIndex) return;
      if (slide.buttonText) used.add(slide.buttonText);
      if (slide.secondaryButtonText) used.add(slide.secondaryButtonText);
    });

    const selectedOpposite = isPrimary
      ? slides[currentIndex]?.secondaryButtonText
      : slides[currentIndex]?.buttonText;

    const allOptions = [...DEFAULT_BUTTON_OPTIONS, ...customButtons];

    return allOptions.filter((btn) => !used.has(btn) && btn !== selectedOpposite);
  };

  const addSlide = () => {
    append({
      id: uuidv4(),
      image: "",
      title: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      secondaryButtonText: "",
      secondaryButtonLink: "",
    });
  };

  const deleteSlide = (index: number) => {
    if (fields.length === 1) {
      alert("You must have at least one slide.");
      return;
    }
    remove(index);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      // const res = await fetch("/api/landing-slides", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data.slides),
      // });

      // const result = await res.json();
      // if (res.ok) {
      //   console.log("Slides saved successfully:", result);
      //   // Optionally, you might want to reset the form or show a success message
      // } else {
      //   setError(result.error || `Error: ${res.status}`);
      //   console.error("Error:", result.error);
      // }

      // For demonstration, log the validated data
      console.log("Validated Slides Data:", data.slides);
      alert("Form submitted successfully! Check console for data.");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-8">
      <CardHeader>
        <CardTitle>Landing page hero sections</CardTitle>
        <CardDescription>
          Manage how you want your hero slides to look and what the general
          public sees.
        </CardDescription>
      </CardHeader>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
            <CardTitle>Slide {index + 1}</CardTitle>
            <CardDescription>Create and manage slide {index + 1}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={cn(
                "relative h-[200px] md:h-[400px] w-full bg-muted flex items-center justify-center rounded-md overflow-hidden",
                errors.slides?.[index]?.image &&
                  "border-2 border-destructive" // Highlight border on image error
              )}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file && file.type.startsWith("image/")) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setValue(`slides.${index}.image`, reader.result as string, {
                      shouldValidate: true,
                    });
                  };
                  reader.readAsDataURL(file);
                } else {
                  alert("Only image files are allowed.");
                  setValue(`slides.${index}.image`, "", { shouldValidate: true });
                }
              }}
            >
              <label htmlFor={`file-upload-${index}`} className="relative w-full h-full cursor-pointer">
                {slides[index]?.image ? (
                  <>
                    <Image
                      src={slides[index].image}
                      alt="Uploaded image"
                      fill
                      className="object-cover aspect-video"
                    />
                    <div className="absolute top-2 right-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/80 backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById(`file-upload-${index}`)?.click();
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-center text-muted-foreground px-4">
                    Click to upload an image or drag & drop here
                  </div>
                )}
                <input
                  id={`file-upload-${index}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </label>
            </div>
            {errors.slides?.[index]?.image && (
              <p className="text-destructive text-sm mt-1">
                {errors.slides[index]?.image?.message}
              </p>
            )}

            <Separator />

            <div className="space-y-2">
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                {...control.register(`slides.${index}.title`)}
                className={cn(
                  errors.slides?.[index]?.title &&
                  "border-destructive"
                )}
              />
              {errors.slides?.[index]?.title && (
                <p className="text-destructive text-sm mt-1">
                  {errors.slides[index]?.title?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                {...control.register(`slides.${index}.description`)}
              />
              {/* Description is optional, so no error message here */}
            </div>

            {/* Primary Button */}
            <div className="space-y-2">
              <Label htmlFor={`primary-button-text-${index}`}>Primary Button</Label>
              <div className="flex gap-2">
                <Select
                  value={slides[index]?.buttonText || ""}
                  onValueChange={(value) => {
                    setValue(`slides.${index}.buttonText`, value, {
                      shouldValidate: true,
                    });
                    setValue(`slides.${index}.buttonLink`, BUTTON_LINKS[value] || "", {
                      shouldValidate: true,
                    });
                  }}
                >
                  <SelectTrigger
                    id={`primary-button-text-${index}`}
                    className={cn(
                      "w-full",
                      errors.slides?.[index]?.buttonText &&
                        "border-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select a primary button" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredOptions(index, true).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleAddCustomButton(index, true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {errors.slides?.[index]?.buttonText && (
                <p className="text-destructive text-sm mt-1">
                  {errors.slides[index]?.buttonText?.message}
                </p>
              )}
            </div>

            {/* Secondary Button */}
            <div className="space-y-2">
              <Label htmlFor={`secondary-button-text-${index}`}>Secondary Button</Label>
              <div className="flex gap-2">
                <Select
                  value={slides[index]?.secondaryButtonText || ""}
                  onValueChange={(value) => {
                    setValue(`slides.${index}.secondaryButtonText`, value, {
                      shouldValidate: true,
                    });
                    setValue(`slides.${index}.secondaryButtonLink`, BUTTON_LINKS[value] || "", {
                      shouldValidate: true,
                    });
                  }}
                >
                  <SelectTrigger
                    id={`secondary-button-text-${index}`}
                    className={cn(
                      "w-full",
                      errors.slides?.[index]?.secondaryButtonText &&
                        "border-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select a secondary button" />
                  </SelectTrigger>
                  <SelectContent>
                    {getFilteredOptions(index, false).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
               
              </div>
              {errors.slides?.[index]?.secondaryButtonText && (
                <p className="text-destructive text-sm mt-1">
                  {errors.slides[index]?.secondaryButtonText?.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => move(index, index - 1)}
                disabled={index === 0}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => move(index, index + 1)}
                disabled={index === fields.length - 1}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => deleteSlide(index)}
              disabled={fields.length === 1} // Disable delete if only one slide
            >
              <Trash className="h-4 w-4 mr-1 text-destructive" />
            </Button>
          </CardFooter>
        </Card>
      ))}

      {errors.slides?.message && (
        <p className="text-destructive text-sm mt-1">
          {errors.slides.message}
        </p>
      )}

      <div className="flex justify-between items-center gap-4">
        <Button type="button" onClick={addSlide} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Add New Slide
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {error && (
        <div className="text-destructive text-sm text-center mt-4">
          {error}
        </div>
      )}
    </form>
  )
}