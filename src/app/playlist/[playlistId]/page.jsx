"use client";

import React, { useEffect, useState } from "react";

import Playlist from "@/components/Playlist/Playlist";
import { fetchColorDom } from "@/utils/fetchColorDom";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const token = getCookie("access_token");

  const [colorData, setColorData] = useState(null);
  const [data, setData] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    const getData = async () => {
      try {
        const playlistData = await spotifyApi.getPlaylistTracks(id);
        const playlist = await spotifyApi.getPlaylist(id);

        setData(playlistData);
        setPlaylist(playlist);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const data = await fetchColorDom(playlist.images[0].url);
        setColorData(data);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchColor();
  }, [playlist]);

  return (
    <div className="relative w-full pb-52">
      {playlist && <Playlist playlist={playlist} colorData={colorData} />}
    </div>
  );
};

export default Page;
