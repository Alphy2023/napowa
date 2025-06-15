import { z } from 'zod'
import {phoneFieldSchema,emailFieldSchema} from "./custom.schema"


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
  email: emailFieldSchema,
  phone: phoneFieldSchema,
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

export type SignupPayload = z.infer<typeof signupSchema>


export const loginResponseSchema = loginSchema.extend({
    id: z.string(),
})
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const resetPasswordRequestSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })


export const forgotPasswordSchema = z.object({
   email: emailFieldSchema,
})
export const otpVerificationSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
})



export type LoginPayload = z.infer<typeof loginSchema>
export type InstitutionResponse = z.infer<typeof loginResponseSchema>
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>
export type ResetPasswordRequestPayload = z.infer<typeof resetPasswordRequestSchema>

export type OtpVerificationPayload = z.infer<typeof otpVerificationSchema>
