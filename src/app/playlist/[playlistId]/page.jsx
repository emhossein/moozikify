"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import fetchSong from "@/utils/fetchSong";
import { formatMs } from "@/utils/formatTime ";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const token = getCookie("access_token");

  const [data, setData] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  console.log(playlist);

  const handleClickItem = async (name, artist, index, list) => {
    const songList = await list.tracks.items.map((item) => ({
      name: item.track.name,
      artist:
        item.track.album.artists[0].name +
        " " +
        item.track.album.artists[1]?.name,
      image: item.track.album.images[0].url,
    }));

    const result = await fetchSong(name, artist);
    useDataStore.setState({ songData: result, songIndex: index, songList });
  };

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

  return (
    <div className="w-full p-2">
      {playlist && (
        <>
          <div className="mb-6 flex h-36 w-full space-x-2 overflow-hidden">
            <div className="aspect-square w-36 overflow-hidden rounded-lg">
              <Image
                fill
                src={playlist.images[0].url}
                alt={playlist.name}
                className="unset | aspect-square"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{playlist.name}</h1>
              <h3 className="text-sm">{playlist.description}</h3>
              <p className="mt-2 text-xs text-gray-400">
                {playlist.tracks.total} tracks
              </p>
            </div>
          </div>
          {playlist.tracks.items.map((item, index) => (
            <div
              key={item.id}
              className="mx-auto mt-2 flex w-4/5 justify-between space-x-2 rounded-lg bg-neutral-700 p-2 hover:cursor-pointer hover:bg-opacity-70"
              onClick={() =>
                handleClickItem(
                  item.track.name,
                  item.track.artists[0].name,
                  index,
                  playlist
                )
              }
            >
              <div className="flex space-x-2">
                <div className="h-10 w-10 overflow-hidden rounded-full ">
                  <Image
                    fill
                    src={item.track.album.images[0].url}
                    alt={item.track.name}
                    className="unset | aspect-square"
                  />
                </div>
                <div>
                  <p className="text-base font-semibold">{item.track.name}</p>
                  <div className="flex space-x-3">
                    {item.track.artists.map((artist) => (
                      <p key={artist} className="text-xs text-neutral-400">
                        {artist.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <p className="self-center text-sm text-neutral-400">
                {formatMs(item.track.duration_ms)}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Page;
