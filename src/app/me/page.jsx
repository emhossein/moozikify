"use client";

import React from "react";
import { useDataStore } from "@/zustand/store";
import Image from "next/image";

const Page = () => {
  const user = useDataStore((state) => state.user);

  console.log(user);

  return (
    <div>
      <div className="h-52 bg-gray-dark">
        <div>
          <div className="w-10 h-10">
            <Image fill src={user.images[0].url} alt={user.display_name} className='unset' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
