"use client";

import { PauseIcon, PlayIcon } from "../Icons";
import React, { useEffect, useState } from "react";

import HorizontalScrollView from "../HorizontalScrollView";
import Image from "next/image";
import blurhash from "@/utils/blurhash";
import fetchSong from "@/utils/fetchSong";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";

const RecommendationFeed = ({ items, title }) => {
  const { songIndex, isPlaying, songList, songData } = useDataStore(
    (state) => state
  );

  const [historyId, setHistoryId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("recentlyPlayedPlaylistId");
    setHistoryId(id);
  }, []);

  const handleClickItem = async (name, artist, index, list, uri) => {
    const songList = await list.tracks.map((item) => ({
      name: item.name,
      artist: item.album.artists[0].name,
      image: item.album.images[0].url,
      duration: item.duration_ms,
      id: item.id,
    }));

    await spotifyApi.addTracksToPlaylist(historyId, [uri]);
    const result = await fetchSong(name, artist);
    useDataStore.setState({ songData: result, songIndex: index, songList });
  };

  return (
    <>
      <h1 className="my-2 text-lg font-semibold">{title}</h1>
      <HorizontalScrollView className="no-scrollbar | mb-4 flex h-28 w-full space-x-2 overflow-x-scroll pr-4">
        {items?.tracks.map((item, index) => (
          <div
            title={item.name}
            key={item.id}
            onClick={() =>
              handleClickItem(
                item.name,
                item.album.artists[0].name,
                index,
                items,
                item.uri
              )
            }
            className="w-20 hover:cursor-pointer"
          >
            <div className="mb-2">
              <div className="relative aspect-square h-20">
                <Image
                  fill
                  src={item.album.images[1].url}
                  alt={item.name}
                  className="unset | pointer-events-none select-none rounded-lg"
                  placeholder="blur"
                  blurDataURL={blurhash}
                />
                <div className="absolute -bottom-2 right-1 z-10 rounded-full">
                  {songList[songIndex].name === item.name ? (
                    <PauseIcon fill="#1DB954" />
                  ) : (
                    <PlayIcon fill="#1DB954" />
                  )}
                </div>
                <span className="absolute -bottom-1.5 right-2 h-4 w-4 rounded-full bg-white" />
              </div>
            </div>
            <p className={`line-clamp-1 select-none text-xs`}>{item.name}</p>
          </div>
        ))}
      </HorizontalScrollView>
    </>
  );
};

export default RecommendationFeed;
