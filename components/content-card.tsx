"use client";

import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import moment from "moment";

import { UserHover } from "./user-hover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContentAction from "./content-action";
import { PostFiltered } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ContentCard({ post }: { post: PostFiltered }) {
  const user = useCurrentUser();

  return (
    <div className="flex w-full items-start gap-2">
      <div className="relative min-w-fit">
        <Avatar>
          <AvatarImage
            src={post?.user?.profile_picture as string}
            alt={"avatar"}
            className="h-10 w-10"
          />
          <AvatarFallback>{post?.user?.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        {user?.id !== post?.user?.id && (
          <div className="absolute bottom-0 right-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-black bg-white text-black hover:scale-105">
            <TiPlus size={15} />
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/@${post?.user?.nickname}`}
            className="flex w-full items-center gap-2"
          >
            <UserHover
              username={post?.user?.nickname}
              image={
                (post?.user?.profile_picture as string) ||
                post?.user?.username?.charAt(0)
              }
              nickname={`@${post?.user?.nickname}`}
              bio={post?.user?.bio || "Bro got no bio :("}
              followers={post?.user?._count?.followers}
            />
            <span className="text-sm text-gray-500">
              {moment(post?.created_at).startOf("second").fromNow()}
            </span>
            <sub className="text-xs text-gray-500">
              {post?.is_edited && " (edited)"}
            </sub>
          </Link>
          <div>
            <ContentAction post={post} />
          </div>
        </div>
        <p className="mb-3 text-xs text-gray-500">@{post?.user?.nickname}</p>
        <Link href={`/@${post?.user?.nickname}/post/${post?.id}`}>
          <span className="line-clamp-5">{post?.content}</span>
        </Link>
        <div className="-ml-3 mt-3 flex items-center gap-5">
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <FaRegHeart size={20} />
            <span className="text-sm text-gray-500">{post?._count?.likes}</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <FiMessageCircle size={20} />
            <span className="text-sm text-gray-500">
              {post?._count?.comments + post?._count?.replies}
            </span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <IoPaperPlaneOutline size={20} />
            <span className="text-sm text-gray-500">10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
