"use client";

import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";

import { UserHover } from "./user-hover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContentAction from "./content-action";

export default function ContentCard() {
  return (
    <div className="flex w-full items-start gap-2">
      <div className="relative min-w-fit">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={"avatar"}
            className="h-10 w-10"
          />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-black bg-white text-black hover:scale-105">
          <TiPlus size={15} />
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <Link
            href={"/profile/@ridloghfryy"}
            className="flex w-full items-center gap-2"
          >
            <UserHover
              username="Ridloghfryy"
              image="https://github.com/shadcn.png"
              nickname="@ridloghfryy"
              bio="I am a developer, and I love to build things."
              followers={100}
            />
            <span className="text-sm text-gray-500">12h</span>
          </Link>
          <div>
            <ContentAction />
          </div>
        </div>
        <p className="mb-3 text-xs text-gray-500">@ridloghfryy</p>
        <Link href={"/@ridloghfryy/post/JHAsd78sa7d"}>
          <span className="line-clamp-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
            dolores eveniet nemo voluptate rerum! Vel nulla ducimus
            reprehenderit nisi maxime!
          </span>
        </Link>
        <div className="-ml-3 mt-3 flex items-center gap-5">
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <FaRegHeart size={20} />
            <span className="text-sm text-gray-500">46</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <FiMessageCircle size={20} />
            <span className="text-sm text-gray-500">18</span>
          </div>
          <div className="flex cursor-pointer items-center gap-1 rounded-full p-3 hover:bg-black-stone/50">
            <IoPaperPlaneOutline size={20} />
            <span className="text-sm text-gray-500">5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
