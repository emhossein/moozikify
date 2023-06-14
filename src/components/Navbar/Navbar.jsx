"use client";

import {
  ChangeThemeIcon,
  GenreIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "../Icons";

import Link from "next/link";
import React from "react";
import { useDataStore } from "@/zustand/store";

const Navbar = () => {
  const { user } = useDataStore((state) => state);

  return (
    <nav className="fixed bottom-0 h-14 w-full z-50 bg-black md:w-[40vw]">
      <div className="flex justify-around">
        <Link
          href="/login"
          className="aspect-square h-10 rounded-full p-2 hover:cursor-pointer hover:bg-gray-700"
        >
          <GenreIcon />
        </Link>
        <Link
          href="/"
          className="aspect-square h-10 rounded-full p-2 hover:cursor-pointer hover:bg-gray-700"
        >
          <HomeIcon />
        </Link>
        <Link
          href="/me"
          className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-700"
        >
          <UserIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
