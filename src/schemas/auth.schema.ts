import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone is required")
    .refine((val) => {
      if (val.includes("@")) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      }
      return /^\+?[\d\s\-()\\.]{7,}$/.test(val);
    }, "Please enter a valid email or phone number"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .refine(
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Please enter a valid email address",
    ),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => /^[\d\s+()-]+$/.test(val) && val.replace(/\D/g, "").length >= 7,
      "Please enter a valid phone number",
    ),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must contain at least one uppercase letter",
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must contain at least one lowercase letter",
    )
    .refine(
      (password) => /[0-9]/.test(password),
      "Password must contain at least one number",
    ),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
