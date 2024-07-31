import { BsThreeDots } from "react-icons/bs";
import { GoBookmark } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { ImLink } from "react-icons/im";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ContentAction() {
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
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3">
          <LuUser size={18} />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3">
          <ImLink size={15} />
          <span>Copy link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
