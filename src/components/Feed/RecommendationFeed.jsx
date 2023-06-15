"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode } from "swiper";
import Image from "next/image";
import fetchSong from "@/utils/fetchSong";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";

const RecommendationFeed = ({ items }) => {
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
      {items && (
        <>
          <h1 className="my-2 text-lg font-semibold">
            Base on your Top choices
          </h1>
          <Swiper
            slidesPerView={8}
            spaceBetween={8}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className="no-scrollbar | !mb-4 flex !w-full overflow-x-scroll last:mr-4"
          >
            {" "}
            {items?.tracks.map((item, index) => (
              <SwiperSlide className="!ml-0 !w-20" key={item.id}>
                <div
                  onClick={() =>
                    handleClickItem(
                      item.name,
                      item.album.artists[0].name,
                      index,
                      items,
                      item.uri
                    )
                  }
                  className="hover:cursor-pointer"
                >
                  <div
                    className={`mb-2 aspect-square h-20 overflow-hidden rounded-lg`}
                  >
                    <div className="">
                      <Image
                        fill
                        src={item.album.images[1].url}
                        alt={item.name}
                        className="unset | pointer-events-none select-none"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <p className={`line-clamp-1 select-none text-xs`}>
                    {item.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default RecommendationFeed;
