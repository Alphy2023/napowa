import { z } from 'zod'


export const loginSchema = z.object({
    email: z.string()
    .email({
        message:"Invalid email address."
    }).min(2, {
      message: "Email is required.",
    }),
   
    password: z.string().min(2, {
      message: "Password is required.",
    })
})

export const signupSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  memberType: z.enum(["regular", "widow", "orphan", "family"]),
  idNumber: z.string().min(5),
  serviceNumber: z.string().optional(),
  rank: z.string().optional(),
  station: z.string().optional(),
  county: z.string().min(1),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})



export const loginResponseSchema = loginSchema.extend({
    id: z.string(),
})



export type SignupPayload = z.infer<typeof signupSchema>


export type LoginPayload = z.infer<typeof loginSchema>
export type InstitutionResponse = z.infer<typeof loginResponseSchema>
