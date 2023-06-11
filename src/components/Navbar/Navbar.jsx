import { ChangeThemeIcon, GenreIcon, HomeIcon, SearchIcon } from "../Icons";

import React from "react";

const Navbar = () => {
  return (
    <div className="absolute bottom-0 h-14 w-[40vw]">
      <div className="flex justify-around">
        <div className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-700">
          <GenreIcon />
        </div>
        <div className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-700">
          <HomeIcon />
        </div>
        <div className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-700">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
