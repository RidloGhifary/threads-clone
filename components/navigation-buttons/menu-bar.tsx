"use client";

import { HiMenuAlt2 } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../auth/logout-button";

export default function MenuButton() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="dark:text-disabled text-disabled-dark flex cursor-pointer items-center gap-2 rounded-md p-4 hover:bg-black-stone/50">
          <HiMenuAlt2 size={25} />
          <span>Menu</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border border-gray-700 bg-main-black text-white">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex cursor-pointer items-center gap-3"
        >
          <IoIosSunny size={20} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex cursor-pointer items-center gap-3"
        >
          <FaMoon size={20} />
          <span>Dark</span>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
            <TbLogout size={20} />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
