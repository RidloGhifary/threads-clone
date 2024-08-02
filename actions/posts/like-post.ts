"use server";

import { db } from "@/lib/db";

export default async function likePost({
  user_id,
  post_id,
}: {
  user_id: string;
  post_id: string;
}) {
  const post = await db.post.findUnique({
    where: {
      id: post_id,
    },
    include: {
      likes: true,
    },
  });

  if (!post) {
    return { error: "Post not found" };
  }

  const isUserLiked = post.likes.find((like) => like.user_id === user_id);

  if (isUserLiked) {
    await db.like.delete({
      where: {
        user_id_post_id: {
          user_id,
          post_id,
        },
      },
    });
  } else {
    await db.like.create({
      data: {
        user_id,
        post_id,
      },
    });
    return { success: "Like added successfully." };
  }
}
