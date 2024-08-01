"use server";

import { db } from "@/lib/db";

export default async function deletePost({
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
  });

  if (!post) {
    return { error: "Post not found" };
  }

  if (user_id !== post.user_id) {
    return { error: "Unauthorized" };
  }

  await db.$transaction([
    db.like.deleteMany({
      where: {
        post_id,
      },
    }),
    db.likeComment.deleteMany({
      where: {
        comment: {
          post_id,
        },
      },
    }),
    db.likeReplyComment.deleteMany({
      where: {
        reply_comment: {
          post_id,
        },
      },
    }),
    db.replyComment.deleteMany({
      where: {
        post_id,
      },
    }),
    db.comment.deleteMany({
      where: {
        post_id,
      },
    }),
    db.post.delete({
      where: {
        id: post_id,
      },
    }),
  ]);

  return { success: "Post deleted" };
}
