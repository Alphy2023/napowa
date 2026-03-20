import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const PasswordResetSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
});

export const TwoFactorSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only digits'),
});

export const CreateMemberSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  roleId: z.string().min(1, 'Role is required'),
});

export const DonationSchema = z.object({
  amount: z
    .number()
    .min(100, 'Minimum donation is KES 100')
    .max(1000000, 'Maximum donation is KES 1,000,000'),
  paymentMethod: z.enum(['mpesa', 'card', 'bank_transfer'], {
    errorMap: () => ({ message: 'Invalid payment method' }),
  }),
  donorName: z.string().optional(),
  donorEmail: z.string().email('Invalid email address').optional(),
  donorPhone: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number'),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  anonymous: z.boolean().default(false),
});

export const MpesaCheckoutSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^254[0-9]{9}$/, 'Phone number must be in format 254XXXXXXXXX'),
  amount: z.number().min(1, 'Amount must be at least 1'),
  tillNumber: z.string().min(1, 'Till number is required'),
  description: z.string().optional(),
});

export const QRCodeDonationSchema = z.object({
  amount: z.number().min(100, 'Minimum donation is KES 100'),
  currency: z.enum(['KES']).default('KES'),
  paymentReference: z.string().optional(),
});

export const AdminActionSchema = z.object({
  action: z.string().min(1, 'Action is required'),
  resourceType: z.string().min(1, 'Resource type is required'),
  resourceId: z.string().min(1, 'Resource ID is required'),
  changes: z.record(z.any()).optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type PasswordResetInput = z.infer<typeof PasswordResetSchema>;
export type TwoFactorInput = z.infer<typeof TwoFactorSchema>;
export type CreateMemberInput = z.infer<typeof CreateMemberSchema>;
export type DonationInput = z.infer<typeof DonationSchema>;
export type MpesaCheckoutInput = z.infer<typeof MpesaCheckoutSchema>;
export type QRCodeDonationInput = z.infer<typeof QRCodeDonationSchema>;
export type AdminActionInput = z.infer<typeof AdminActionSchema>;
