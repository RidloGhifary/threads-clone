"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchPosts } from "@/actions/posts/get-posts";
import ContentCard from "../content-card";
import CreateThreadMainPage from "./create-thread-main-page";
import { Separator } from "@/components/ui/separator";
import { PostFiltered } from "@/types";
import { PostSkeleton } from "@/skeletons";
import ErrorBanner from "../error-banner";

export default function MainPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="min-h-screen p-4">
      <CreateThreadMainPage />
      <Separator className="separator-color my-4 bg-gray-700" />
      <div className="space-y-5">
        {isLoading ? (
          <PostSkeleton />
        ) : error ? (
          <ErrorBanner />
        ) : (
          data?.map((item: PostFiltered) => (
            <div key={item.id}>
              <ContentCard post={item} />
              {data.length - 1 !== data.indexOf(item) && (
                <Separator className="separator-color mx-auto my-4 w-2/3 bg-gray-700" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
