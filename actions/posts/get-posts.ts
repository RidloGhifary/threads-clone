import { db } from "@/lib/db";
import { PostFiltered } from "@/types";
import axios from "axios";

export default async function getPosts() {
  console.log("halo");
  const posts = await db.post.findMany({
    orderBy: {
      created_at: "desc",
      likes: {
        _count: "desc",
      },
      comments: {
        _count: "desc",
      },
    },
    include: {
      user: true,
      _count: {
        select: {
          likes: true,
          comments: true,
          replies: true,
        },
      },
    },
  });

  console.log("🚀 ~ getPosts ~ posts:", posts);

  return posts;
}

export async function fetchPosts(): Promise<PostFiltered[]> {
  const response = await axios.get("/api/posts");
  if (!response.data) throw new Error("Failed to fetch posts");
  return response.data;
}
