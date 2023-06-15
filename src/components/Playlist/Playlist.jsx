"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { MusicBarIcons } from "../Icons";
import { fetchColorDom } from "@/utils/fetchColorDom";
import fetchSong from "@/utils/fetchSong";
import { formatMs } from "@/utils/formatTime ";
import { useDataStore } from "@/zustand/store";

const Playlist = ({ playlist }) => {
  const { songIndex, songData, isPlaying, songList } = useDataStore(
    (state) => state
  );

  const [colorData, setColorData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);

  const handleClickItem = async (name, artist, index, list) => {
    const songList = await list.tracks.items.map((item) => ({
      name: item.track.name,
      artist: item.track.album.artists[0].name,
      image: item.track.album.images[0].url,
      duration: item.track.duration_ms,
      id: item.id,
    }));

    const result = await fetchSong(name, artist);
    useDataStore.setState({ songData: result, songIndex: index, songList });
  };

  useEffect(() => {
    setPlaylistData(JSON.parse(playlist.value));
  }, []);

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

  console.log(playlistData);

  return (
    <>
      <div
        className="absolute top-0 -z-10 h-screen w-full"
        style={{
          background: `linear-gradient(180deg, ${colorData?.vibrant}, rgba(0,0,0,1))`,
        }}
      />
      <div className="flex h-64 w-full space-x-2 overflow-hidden bg-gradient-to-b from-transparent to-black">
        <div className="relative -z-10 h-full w-full shrink-0 overflow-hidden">
          <Image
            fill
            src={playlistData?.images[0].url}
            alt={playlistData?.name}
            className="unset | object-cover"
            placeholder="empty"
          />
        </div>
      </div>
      <div className="z-20 -mt-10 -translate-y-full text-center">
        <h1 className="text-lg font-semibold">{playlistData?.name}</h1>
        <h3 className="text-sm">{playlistData?.description}</h3>
        <p className="mt-2 text-xs text-gray-400">
          {playlistData?.tracks.total} tracks
        </p>
      </div>
      {playlistData?.tracks.items.map((item, index) => (
        <div
          key={item.id}
          className="mx-auto mt-2 flex w-11/12 cursor-pointer justify-between space-x-2 rounded-lg bg-gray-dark  p-2"
          onClick={() =>
            handleClickItem(
              item.track.name,
              item.track.artists[0].name,
              index,
              playlistData
            )
          }
        >
          <div className="flex space-x-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ">
              <Image
                fill
                src={
                  item.track.album.images[item.track.album.images.length - 1]
                    .url
                }
                alt={item.track.name}
                className="unset | aspect-square"
              />
            </div>
            <div>
              <p className="line-clamp-1 text-sm font-semibold">
                {item.track.name}
              </p>
              <div className="flex space-x-3">
                {item.track.artists.slice(0, 2).map((artist) => (
                  <p key={artist} className="text-xs text-neutral-400">
                    {artist.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {songIndex === index &&
          songList.length &&
          songData.result.title.includes(songList[songIndex].name) ? (
            <MusicBarIcons isPLaying={isPlaying} />
          ) : null}
          <p className="self-center text-sm text-neutral-400">
            {formatMs(item.track.duration_ms)}
          </p>
        </div>
      ))}
    </>
  );
};

export default Playlist;
