"use client";

import HorizontalScrollView from "./HorizontalScrollView";
import Link from "next/link";
import fetchSong from "@/utils/fetchSong";
import { useDataStore } from "@/zustand/store";
import { useEffect } from "react";

const Feed = ({ newAlbumData, todaysHitsData, playlistData }) => {
  const { newData, todaysHits, playlist } = useDataStore((state) => state);

  const handleClickItem = async (name, artist, index, list) => {
    const songList = await list.tracks.items.map((item) => ({
      name: item.track.name,
      artist: item.track.album.artists[0].name,
    }));

    const result = await fetchSong(name, artist);
    useDataStore.setState({ songData: result, songIndex: index, songList });
  };

  useEffect(() => {
    useDataStore.setState({
      newData: newAlbumData,
      todaysHits: todaysHitsData,
      playlist: playlistData,
    });
  }, []);

  return (
    <div className="w-[100vw] overflow-hidden md:w-[40vw]">
      <h1 className="mb-2 text-xl font-semibold">New Albums</h1>
      <HorizontalScrollView className="no-scrollbar | mb-4 flex w-full space-x-2 overflow-x-scroll">
        {newData?.albums?.items?.map((item) => {
          return (
            <div key={item.id} className="">
              <Link href={`/album/${item.id}`}>
                <div className="aspect-square h-20  overflow-hidden rounded-lg">
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="pointer-events-none"
                  />
                </div>
              </Link>
              <p className="line-clamp-1 text-xs">{item.name}</p>
            </div>
          );
        })}
      </HorizontalScrollView>
      <h1 className="mb-2 text-xl font-semibold">Today&apos;s top hits</h1>
      <HorizontalScrollView className="no-scrollbar | mb-4 flex w-full space-x-2 overflow-x-scroll">
        {todaysHits?.tracks?.items?.map((item, index) => {
          return (
            <div
              key={item.track.id}
              className="hover:cursor-pointer"
              onClick={() => {
                handleClickItem(
                  item.track.name,
                  item.track.album.artists[0].name,
                  index,
                  todaysHits
                );
              }}
            >
              <div className="aspect-square h-20  overflow-hidden rounded-lg">
                <img
                  src={item.track.album.images[0].url}
                  alt={item.track.name}
                  className="pointer-events-none"
                />
              </div>
              <p className="line-clamp-1 text-xs">{item.track.name}</p>
            </div>
          );
        })}
      </HorizontalScrollView>
      <h1 className="mb-2 text-xl font-semibold">Playlist</h1>
      <HorizontalScrollView className="no-scrollbar | mb-4 flex w-full space-x-2 overflow-x-scroll">
        {playlist?.tracks?.items?.map((item, index) => {
          return (
            <div
              key={item.track.id}
              className="hover:cursor-pointer"
              onClick={() => {
                handleClickItem(
                  item.track.name,
                  item.track.album.artists[0].name,
                  index,
                  playlist
                );
              }}
            >
              <div className="aspect-square h-20  overflow-hidden rounded-lg">
                <img
                  src={item.track.album.images[0].url}
                  alt={item.track.name}
                  className="pointer-events-none"
                />
              </div>
              <p className="line-clamp-1 text-xs">{item.track.name}</p>
            </div>
          );
        })}
      </HorizontalScrollView>
    </div>
  );
};

export default Feed;
