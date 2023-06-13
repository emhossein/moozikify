import HorizontalScrollView from "../HorizontalScrollView";
import React from "react";
import fetchSong from "@/utils/fetchSong";
import { useDataStore } from "@/zustand/store";

const FeedItems = ({ playlist }) => {
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

  return (
    <>
      {playlist && (
        <>
          <h1 className="mb-2 text-xl font-semibold">{playlist.name}</h1>
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
                      loading="lazy"
                    />
                  </div>
                  <p className="line-clamp-1 text-xs">{item.track.name}</p>
                </div>
              );
            })}
          </HorizontalScrollView>
        </>
      )}
    </>
  );
};

export default FeedItems;
