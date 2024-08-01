"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { createPostSchema } from "@/schemas";

export default async function createPost({
  values,
  user_id,
}: {
  values: z.infer<typeof createPostSchema>;
  user_id: string;
}) {
  const validatedFields = createPostSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { content } = validatedFields.data;

  await db.post.create({
    data: {
      content: content,
      is_edited: false,
      user_id: user_id,
    },
  });

  return { success: "Post created" };
}
