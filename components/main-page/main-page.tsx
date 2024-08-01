"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { fetchPosts } from "@/actions/posts/get-posts";
import ContentCard from "../content-card";
import CreateThreadMainPage from "./create-thread-main-page";
import { Separator } from "@/components/ui/separator";
import { PostFiltered } from "@/types";
import { PostSkeleton } from "@/skeletons";
import ErrorBanner from "../error-banner";

export default function MainPage() {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length === 20 ? allPages.length * 20 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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
          data?.pages?.map((page) =>
            page?.map((post: PostFiltered, index: number) => {
              if (page.length == index + 1) {
                return (
                  <div key={post.id} ref={ref}>
                    <ContentCard post={post} />
                    {page.length - 1 !== page.indexOf(post) && (
                      <Separator className="separator-color mx-auto my-4 w-2/3 bg-gray-700" />
                    )}
                  </div>
                );
              } else {
                return (
                  <div key={post.id}>
                    <ContentCard post={post} />
                    {page.length - 1 !== page.indexOf(post) && (
                      <Separator className="separator-color mx-auto my-4 w-2/3 bg-gray-700" />
                    )}
                  </div>
                );
              }
            }),
          )
        )}
      </div>
    </div>
  );
}
