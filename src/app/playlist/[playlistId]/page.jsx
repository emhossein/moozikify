import Playlist from "@/components/Playlist/Playlist";
import React from "react";
import { cookies } from "next/headers";

const Page = async ({ params }) => {
  const token = cookies().get("access_token");

  const playlist = await fetch(
    `https://api.spotify.com/v1/playlists/${params.playlistId}`,
    {
      headers: {
        Authorization: "Bearer " + token.value,
      },
    }
  );

  return (
    <div className="relative w-full pb-52">
      {playlist && <Playlist playlist={playlist.json()} />}
    </div>
  );
};

export default Page;
