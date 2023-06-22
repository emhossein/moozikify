"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import PlaylistItem from "./PlaylistItem";
import axios from "axios";
import blurhash from "@/utils/blurhash";
import { fetchColorDom } from "@/utils/fetchColorDom";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { useBottomReached } from "@/hooks/useBottomReached";

const Playlist = ({ id }) => {
  const token = getCookie("access_token");

  const isBottomReached = useBottomReached();

  const [colorData, setColorData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [playlistDetail, setPlaylistDetail] = useState(null);
  const [next, setNext] = useState(null);

  const fetchMoreSongs = async (url) => {
    const result = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  };

  const getData = async () => {
    try {
      const data = await spotifyApi.getPlaylistTracks(id);
      const details = await spotifyApi.getPlaylist(id);
      setPlaylistData(data?.items);
      setPlaylistDetail(details);
      setNext(data?.next);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (next) {
      const fetchMore = async () => {
        const moreSongs = await fetchMoreSongs(next);
        setNext(moreSongs.next);
        setPlaylistData((prev) => [...prev, ...moreSongs.items]);
      };
      fetchMore();
    }
  }, [isBottomReached]);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const data = await fetchColorDom(playlistDetail.images[0].url);
        setColorData(data);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchColor();
  }, [playlistDetail]);

  return (
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
            src={playlistDetail?.images[0].url}
            alt={playlistDetail?.name}
            className="unset | object-cover"
            placeholder="blur"
            blurDataURL={blurhash}
          />
        </div>
      </div>
      <div className="z-20 -mt-10 -translate-y-full px-4">
        <h1 className="text-xl font-bold">{playlistDetail?.name}</h1>
        <h3
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: playlistDetail?.description }}
        ></h3>
        <p className="mt-2 text-xs text-gray-400">
          {playlistDetail?.tracks.total} tracks
        </p>
      </div>
      <PlaylistItem items={playlistData} />
    </>
  );
};

export default Playlist;
