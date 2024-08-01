"use client";

import { BsThreeDots } from "react-icons/bs";
import { GoBookmark } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { ImLink } from "react-icons/im";
import { LuTrash } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { IoCheckmark } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostFiltered } from "@/types";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import useDeletePost from "@/hooks/use-delete-post";

export default function ContentAction({ post }: { post: PostFiltered }) {
  const user = useCurrentUser();
  const router = useRouter();
  const { mutate, isPending } = useDeletePost();

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL!;
    const link = `${BASE_URL}/@${post?.user?.nickname}/post/${post?.id}`;
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      toast({
        variant: "default",
        title: "Copied",
        description: "Link copied to clipboard",
      });
    });

    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer rounded-full text-gray-500 hover:bg-black-stone/50">
          <BsThreeDots size={15} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border border-gray-700 bg-main-black text-white">
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3">
          <GoBookmark size={18} />
          <span>Save</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3"
          onClick={() =>
            router.push(`/@${post?.user?.nickname}/post/${post?.id}`)
          }
        >
          <LuUser size={18} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3"
          onClick={handleCopyLink}
        >
          {isCopied ? <IoCheckmark size={15} /> : <ImLink size={15} />}
          <span>{isCopied ? "Copied" : "Copy link"}</span>
        </DropdownMenuItem>
        {user?.id === post?.user?.id && (
          <DropdownMenuItem
            onClick={() =>
              mutate({ user_id: user?.id as string, post_id: post?.id })
            }
            className="flex cursor-pointer items-center gap-3 bg-destructive/30 text-destructive"
          >
            <LuTrash size={15} />
            <span>{isPending ? "Deleting..." : "Delete"}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
