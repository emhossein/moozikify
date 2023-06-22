import Artist from "@/components/Artist/Artist";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="pb-52">
      <Artist id={params.artistId} />
    </div>
  );
};

export default page;
