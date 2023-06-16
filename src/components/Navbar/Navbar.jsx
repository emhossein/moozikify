"use client";

import { HomeIcon, SearchIcon, UserIcon } from "../Icons";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 z-50 h-14 w-full bg-black md:w-[60vw]">
      <div className="flex h-full items-center justify-around">
        <Link
          href="/search"
          className="aspect-square h-10 rounded-full p-2 hover:cursor-pointer hover:bg-gray-700"
        >
          <SearchIcon />
        </Link>
        <Link
          href="/"
          className="aspect-square h-10 rounded-full p-2 hover:cursor-pointer hover:bg-gray-700"
        >
          <HomeIcon />
        </Link>
        <Link
          href="/me"
          className="h-10 rounded-full p-2 hover:cursor-pointer hover:bg-gray-700"
        >
          <UserIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
