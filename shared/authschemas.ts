import { z } from "zod";

export const signInFormSchema = z.object({
    username: z.string().min(3, "Please enter a valid username").trim(),
    password: z.string().min(1, "Please enter a password").trim()
});

export const signUpFormSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .trim()
});

export const changeAvatarSchema = z.object({
    avatar: z.string().trim(),
    id: z.number()
});

export const deleteSchema = z.object({
    id: z.number()
});

export const userSchema = z.object({
    id: z.number()
});

export type signInFormSchemaType = z.infer<typeof signInFormSchema>;
export type signUpFormSchemaType = z.infer<typeof signUpFormSchema>;
