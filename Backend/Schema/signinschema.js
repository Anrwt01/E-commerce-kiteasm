import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().trim().toLowerCase().email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password too long"),
    name: z
        .string()
        .trim()
        .min(1, "Name cannot be empty")
        .max(100, "Name too long")
        .optional(),
});