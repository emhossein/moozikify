"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import PlaylistItem from "./PlaylistItem";
import axios from "axios";
import blurhash from "@/utils/blurhash";
import { fetchColorDom } from "@/utils/fetchColorDom";
import { getCookie } from "cookies-next";
import { useBottomReached } from "@/hooks/useBottomReached";

const Playlist = ({ playlist }) => {
  const token = getCookie("access_token");

  const isBottomReached = useBottomReached();

  const [colorData, setColorData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [moreSongs, setMoreSongs] = useState(null);

  const fetchMoreSongs = async (url) => {
    const result = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  };

  useEffect(() => {
    setPlaylistData(JSON.parse(playlist.value));
  }, []);

  useEffect(() => {
    if (playlistData?.tracks.next && moreSongs === null) {
      const fetchMore = async () => {
        const moreSongs = await fetchMoreSongs(playlistData?.tracks.next);
        setMoreSongs(moreSongs);
      };
      fetchMore();
    }
  }, [isBottomReached]);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const data = await fetchColorDom(playlistData.images[0].url);
        setColorData(data);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchColor();
  }, [playlistData]);

  return (
    <>
      <>
        <div
          className="absolute top-0 -z-10 h-screen w-full"
          style={{
            background: `linear-gradient(180deg, ${colorData?.vibrant}, #0F0F0F)`,
          }}
        />
        <div className="flex h-64 w-full space-x-2 overflow-hidden bg-gradient-to-b from-transparent to-black">
          <div className="relative -z-10 h-full w-full shrink-0 overflow-hidden">
            <Image
              fill
              src={playlistData?.images[0].url}
              alt={playlistData?.name}
              className="unset | object-cover"
              placeholder="blur"
              blurDataURL={blurhash}
            />
          </div>
        </div>
        <div className="z-20 -mt-10 -translate-y-full px-4">
          <h1 className="text-xl font-bold">{playlistData?.name}</h1>
          <h3
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: playlistData?.description }}
          ></h3>
          <p className="mt-2 text-xs text-gray-400">
            {playlistData?.tracks.total} tracks
          </p>
        </div>
        <PlaylistItem items={playlistData?.tracks.items} />
        <PlaylistItem items={moreSongs?.items} />
      </>
    </>
  );
};

export default Playlist;
