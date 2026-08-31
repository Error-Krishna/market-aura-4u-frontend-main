import { z } from "zod";

export const generateContentSchema = z.object({
  prompt: z.string().min(5, "Topic is too short."),
});

export type GenerateContentFormData = z.infer<typeof generateContentSchema>;
