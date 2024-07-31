"use client";

import { HiMenuAlt2 } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "../auth/logout-button";

export default function MenuButton() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-md p-4 text-white/60 hover:bg-black-stone/50">
          <HiMenuAlt2 size={25} />
          <span>Menu</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="modal-style w-56 border border-gray-700 bg-main-black text-white">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex cursor-pointer items-center gap-3"
        >
          <SunIcon className="h-[21px] w-[21px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex cursor-pointer items-center gap-3"
        >
          <MoonIcon className="h-[21px] w-[21px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span>Dark</span>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuLabel className="flex cursor-pointer items-center gap-2">
            <TbLogout size={25} />
            <span>Log out</span>
          </DropdownMenuLabel>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
