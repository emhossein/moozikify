import Playlist from "@/components/Playlist/Playlist";
import React from "react";

const Page = async ({ params }) => {
  
 

  return (
    <div className="relative w-full pb-52">
      <Playlist id={params.playlistId} />
    </div>
  );
};

export default Page;
