"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  console.log(id);

  return <div>Page</div>;
};

export default Page;
