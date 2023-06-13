"use client";

import { ChangeThemeIcon, GenreIcon, HomeIcon, SearchIcon } from "../Icons";

import Link from "next/link";
import React from "react";
import { useDataStore } from "@/zustand/store";

const Navbar = () => {
  const { user } = useDataStore((state) => state);

  return (
    <div className="fixed bottom-0 h-14 w-full bg-black md:w-[40vw]">
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
        <div className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-700">
          {user && (
            <img
              src={user?.images[0]?.url}
              alt={user.display_name}
              className="aspect-square w-8 rounded-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
