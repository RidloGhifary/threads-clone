"use client";

import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";
import moment from "moment";

import { UserHover } from "./user-hover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContentAction from "./content-action";
import { PostFiltered, UserSessionProps } from "@/types";
import useLikePost from "@/hooks/use-like-post";

export default function ContentCard({
  post,
  user,
}: {
  post: PostFiltered;
  user?: UserSessionProps;
}) {
  const { mutate, isPending } = useLikePost();
  const handleLike = () =>
    mutate({ user_id: user?.id as string, post_id: post?.id });

  const username = post?.user?.nickname;
  const profilePicture = post?.user?.profile_picture as string;
  const bio = post?.user?.bio || "Bro got no bio :(";
  const followers = post?.user?._count?.followers;
  const createdAt = moment(post?.created_at).startOf("second").fromNow();
  const isEdited = post?.is_edited;
  const content = post?.content;
  const likes = post?._count?.likes;
  const comments = post?._count?.comments + post?._count?.replies;
  const shares = 10;

  const isLiked = post?.likes?.some((like) => like.user_id === user?.id);
  const heartIcon = isLiked ? (
    <FaHeart size={20} fill="red" />
  ) : (
    <FaRegHeart size={20} />
  );

  return (
    <div className="flex w-full items-start gap-2">
      <div className="relative min-w-fit">
        <Avatar>
          <AvatarImage
            src={profilePicture}
            alt="avatar"
            className="h-10 w-10"
          />
          <AvatarFallback>{username?.charAt(0)}</AvatarFallback>
        </Avatar>
        {(user?.id as string) !== post?.user?.id && (
          <div className="absolute bottom-0 right-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-black bg-white text-black hover:scale-105">
            <TiPlus size={15} />
          </div>
        )}
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Link
            href={`/profile/@${username}`}
            className="flex w-full items-center gap-2"
          >
            <UserHover
              username={username}
              image={profilePicture || username?.charAt(0)}
              nickname={`@${username}`}
              bio={bio}
              followers={followers}
            />
            <span className="text-sm text-gray-500">{createdAt}</span>
            <sub className="text-xs text-gray-500">
              {isEdited && " (edited)"}
            </sub>
          </Link>
          <ContentAction post={post} />
        </div>
        <p className="mb-3 text-xs text-gray-500">@{username}</p>
        <Link href={`/@${username}/post/${post?.id}`}>
          <span className="line-clamp-5">{content}</span>
        </Link>
        <div className="-ml-3 mt-3 flex items-center gap-5">
          <div
            className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50"
            onClick={handleLike}
          >
            {heartIcon}
            <span className="text-sm text-gray-500">{likes}</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <FiMessageCircle size={20} />
            <span className="text-sm text-gray-500">{comments}</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <IoPaperPlaneOutline size={20} />
            <span className="text-sm text-gray-500">{shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
