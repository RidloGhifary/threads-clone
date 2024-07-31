"use client";

import Image from "next/image";
import { FaPlus, FaUser } from "react-icons/fa";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

import { usePathname } from "next/navigation";
import { navigations } from "@/constants";
import MenuButton from "../navigation-buttons/menu-bar";

export default function LeftSideBar() {
  const pathname = usePathname();

  return (
    <>
      <div className="sticky top-0 hidden min-h-screen w-full flex-col items-start justify-between md:flex">
        <div className="flex cursor-pointer items-start gap-2 p-4">
          <Image
            src="/logo-color.png"
            alt="thread-clone"
            width={150}
            height={150}
            priority
            className="h-8 w-8 object-contain"
          />
          <span className="mt-1 font-medium">TClone</span>
        </div>
        <nav className="flex flex-col items-start gap-2">
          {navigations.map((item: { name: string; href: string }) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex cursor-pointer items-center gap-2 rounded-md p-4 ${pathname.startsWith(item.href) ? "text-black dark:text-white" : "dark:text-disabled text-disabled-dark"} hover:bg-black-stone/50 hover:text-white`}
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
          <button className="dark:text-disabled text-disabled-dark flex cursor-pointer items-center gap-2 rounded-md p-4 hover:bg-black-stone/50 hover:text-white">
            <IoIosArrowBack size={25} />
            <span>Back</span>
          </button>
        </nav>
        <div className="flex flex-col items-start gap-2">
          <div className="dark:text-disabled text-disabled-dark flex cursor-pointer items-center gap-2 rounded-md p-4 hover:bg-black-stone/50">
            <FaPlus size={23} />
            <span>Create</span>
          </div>
          <MenuButton />
        </div>
      </div>

      <nav className="absolute bottom-0 w-full dark:bg-main-black md:hidden">
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
