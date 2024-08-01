import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Import your database client or methods

// GET endpoint to fetch posts
export async function GET() {
  try {
    const posts = await db.post.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nickname: true,
            bio: true,
            profile_picture: true,
            _count: { select: { followers: true } },
          },
        },
        _count: {
          select: { likes: true, comments: true, replies: true },
        },
      },
    });

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
