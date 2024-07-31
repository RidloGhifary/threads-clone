"use client";

import Image from "next/image";
import { FaPlus, FaUser } from "react-icons/fa";
import { HiMenuAlt2, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { navigations } from "@/constants";

export default function LeftSideBar() {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden min-h-screen w-full flex-col items-start justify-between md:flex">
        <div className="flex cursor-pointer items-start gap-2 p-4">
          <Image
            src="/logo.webp"
            alt="thread-clone"
            width={150}
            height={150}
            className="h-8 w-8"
          />
          <span className="mt-1 font-medium">TClone</span>
        </div>
        <nav className="flex flex-col items-start gap-6">
          {navigations.map((item: { name: string; href: string }) => (
            <Link
              href={item.href}
              className={`flex cursor-pointer items-center gap-2 rounded-md p-4 ${pathname.startsWith(item.href) ? "text-white" : "text-disabled"} hover:bg-black-stone/50`}
            >
              {item.href === "/" && <GoHomeFill size={25} />}
              {item.href.startsWith("/search") && <IoSearch size={25} />}
              {item.href.startsWith("/profile") && <FaUser size={25} />}
              {item.href.startsWith("/for-you") && (
                <HiOutlineSwitchHorizontal size={25} />
              )}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-3">
          <div className="flex cursor-pointer items-center gap-2 rounded-md p-4 text-white/60 hover:bg-black-stone/50">
            <FaPlus size={23} />
            <span>Create</span>
          </div>
          <div className="flex cursor-pointer items-center gap-2 rounded-md p-4 text-white/60 hover:bg-black-stone/50">
            <HiMenuAlt2 size={25} />
            <span>Menu</span>
          </div>
        </div>
      </div>

      <nav className="absolute bottom-0 w-full bg-main-black md:hidden">
        <div className="flex items-center justify-center gap-6">
          <Link
            href="/"
            className={`cursor-pointer rounded-md p-4 ${pathname === "/" ? "text-white" : "text-disabled"} hover:bg-black-stone/50`}
          >
            <GoHomeFill size={25} />
          </Link>
          <Link
            href="/"
            className={`text-disabled cursor-pointer rounded-md p-4 hover:bg-black-stone/50`}
          >
            <HiOutlineSwitchHorizontal size={25} />
          </Link>
          <Link
            href="/"
            className={`text-disabled cursor-pointer rounded-md p-4 hover:bg-black-stone/50`}
          >
            <FaPlus size={23} />
          </Link>
          <Link
            href="/search"
            className={`cursor-pointer rounded-md p-4 ${pathname.startsWith("/search") ? "text-white" : "text-disabled"} hover:bg-black-stone/50`}
          >
            <IoSearch size={25} />
          </Link>
          <Link
            href="/profile"
            className={`cursor-pointer rounded-md p-4 ${pathname.startsWith("/profile") ? "text-white" : "text-disabled"} hover:bg-black-stone/50`}
          >
            <FaUser size={25} />
          </Link>
        </div>
      </nav>
    </>
  );
}
