import Album from "@/components/Album/Album";
import React from "react";

const Page = ({ params }) => {
  return (
    <div>
      <Album id={params.albumId} />
    </div>
  );
};

export default Page;
