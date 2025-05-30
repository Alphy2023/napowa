"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SlideSchema = z.object({
  id: z.string(),
  image: z.string().min(1, "Image is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  buttonText: z.string().min(1, "Primary button is required"),
  buttonLink: z.string().min(1, "Primary button link is required"),
  secondaryButtonText: z.string().min(1, "Secondary button is required"),
  secondaryButtonLink: z.string().min(1, "Secondary button link is required"),
});

const FormSchema = z.object({
  slides: z.array(SlideSchema).min(1, "At least one slide is required"),
});

type SlideType = z.infer<typeof SlideSchema>;
type FormValues = z.infer<typeof FormSchema>;

export const LandingPageSettings =()=> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
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
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "slides",
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/landing-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.slides),
      });

      const resData = await res.json();
      if (!res.ok) {
        setError(resData.error || "An error occurred");
      } else {
        console.log("Success:", resData);
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  });

  const handleSlideChange = (
    index: number,
    key: keyof SlideType,
    value: string
  ) => {
    setValue(`slides.${index}.${key}`, value);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSlideChange(index, "image", reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only image files are allowed.");
    }
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
    remove(index);
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;
    move(index, newIndex);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded space-y-2">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
              />
              {errors.slides?.[index]?.image && (
                <p className="text-red-500 text-sm">
                  {errors.slides[index]?.image?.message}
                </p>
              )}
              {form.getValues(`slides.${index}.image`) && (
                <img
                  src={form.getValues(`slides.${index}.image`)}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2"
                />
              )}
            </div>
            <Input
              placeholder="Title"
              {...register(`slides.${index}.title`)}
              onChange={(e) => handleSlideChange(index, "title", e.target.value)}
            />
            {errors.slides?.[index]?.title && (
              <p className="text-red-500 text-sm">
                {errors.slides[index]?.title?.message}
              </p>
            )}

            <Input
              placeholder="Description"
              {...register(`slides.${index}.description`)}
              onChange={(e) =>
                handleSlideChange(index, "description", e.target.value)
              }
            />

            <Input
              placeholder="Primary Button"
              {...register(`slides.${index}.buttonText`)}
              onChange={(e) =>
                handleSlideChange(index, "buttonText", e.target.value)
              }
            />
            {errors.slides?.[index]?.buttonText && (
              <p className="text-red-500 text-sm">
                {errors.slides[index]?.buttonText?.message}
              </p>
            )}

            <Input
              placeholder="Primary Button Link"
              {...register(`slides.${index}.buttonLink`)}
              onChange={(e) =>
                handleSlideChange(index, "buttonLink", e.target.value)
              }
            />
            {errors.slides?.[index]?.buttonLink && (
              <p className="text-red-500 text-sm">
                {errors.slides[index]?.buttonLink?.message}
              </p>
            )}

            <Input
              placeholder="Secondary Button"
              {...register(`slides.${index}.secondaryButtonText`)}
              onChange={(e) =>
                handleSlideChange(index, "secondaryButtonText", e.target.value)
              }
            />
            {errors.slides?.[index]?.secondaryButtonText && (
              <p className="text-red-500 text-sm">
                {errors.slides[index]?.secondaryButtonText?.message}
              </p>
            )}

            <Input
              placeholder="Secondary Button Link"
              {...register(`slides.${index}.secondaryButtonLink`)}
              onChange={(e) =>
                handleSlideChange(index, "secondaryButtonLink", e.target.value)
              }
            />
            {errors.slides?.[index]?.secondaryButtonLink && (
              <p className="text-red-500 text-sm">
                {errors.slides[index]?.secondaryButtonLink?.message}
              </p>
            )}

            <div className="flex space-x-2 mt-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => deleteSlide(index)}
              >
                Delete Slide
              </Button>
              <Button
                type="button"
                onClick={() => moveSlide(index, "up")}
                disabled={index === 0}
              >
                Move Up
              </Button>
              <Button
                type="button"
                onClick={() => moveSlide(index, "down")}
                disabled={index === fields.length - 1}
              >
                Move Down
              </Button>
            </div>
          </div>
        ))}

        <div className="flex space-x-2 mt-4">
          <Button type="button" onClick={addSlide}>
            Add Slide
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}
