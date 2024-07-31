import { z } from "zod";

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "At least 1 character",
    })
    .max(100, {
      message: "Max 100 characters",
    }),
});
