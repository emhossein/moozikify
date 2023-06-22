import Album from "@/components/Album/Album";
import React from "react";

const Page = ({ params }) => {
  return (
    <div className="pb-52">
      <Album id={params.albumId} />
    </div>
  );
};

export default Page;
