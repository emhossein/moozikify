"use client";

import Image from "next/image";
import { MusicBarIcons } from "../Icons";
import React from "react";
import blurhash from "@/utils/blurhash";
import fetchSong from "@/utils/fetchSong";
import { formatMs } from "@/utils/formatTime ";
import { useDataStore } from "@/zustand/store";

const PlaylistItem = ({ items }) => {
  const { songIndex, songData, isPlaying, songList } = useDataStore(
    (state) => state
  );

  const handleClickItem = async (name, artist, index, list) => {
    const songList = await list.map((item) => ({
      name: item.track.name,
      artist: item.track.album.artists[0].name,
      image: item.track.album.images[0].url,
      duration: item.track.duration_ms,
      id: item.id,
    }));

    const result = await fetchSong(name, artist);
    useDataStore.setState({ songData: result, songIndex: index, songList });
  };

  return (
    <>
      {items?.map((item, index) => {
        return (
          <>
            {item.track && (
              <div
                key={item.track.id}
                className="mx-auto mt-2 flex w-11/12 cursor-pointer justify-between space-x-2 rounded-lg bg-gray-dark  p-2"
                onClick={() =>
                  handleClickItem(
                    item.track.name,
                    item.track.artists[0].name,
                    index,
                    items
                  )
                }
              >
                <div className="flex space-x-2">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ">
                    <Image
                      fill
                      src={
                        item?.track.album.images[
                          item.track.album.images.length - 1
                        ].url
                      }
                      alt={item.track.name}
                      className="unset | aspect-square"
                      placeholder="blur"
                      blurDataURL={blurhash}
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
                songData &&
                songList[songIndex].name === item.track.name ? (
                  <MusicBarIcons isPLaying={isPlaying} />
                ) : null}
                <p className="self-center text-sm text-neutral-400">
                  {formatMs(item.track.duration_ms)}
                </p>
              </div>
            )}
          </>
        );
      })}
    </>
  );
};

export default PlaylistItem;
