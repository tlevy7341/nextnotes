import { z } from "zod";

export const addNoteSchema = z.object({
    title: z.string().min(1, "Please provide a title").trim(),
    content: z.string().min(1, "Please provide the content").trim()
});

export const updateNoteSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1, "Please provide a title").trim(),
    content: z.string().min(1, "Please provide the content").trim()
});

export const deleteNoteSchema = z.object({
    id: z.number().positive()
});
