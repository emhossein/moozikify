import React, { useEffect, useState } from "react";

import Image from "next/image";
import { formatMs } from "@/utils/formatTime ";
import { MusicBarIcons } from "../Icons";
import { useDataStore } from "@/zustand/store";
import fetchSong from "@/utils/fetchSong";

const Me = ({ user, colorData }) => {
  const [history, setHistory] = useState([]);

  const { songIndex, songData, isPlaying, songList } = useDataStore(
    (state) => state
  );

  const handleClickItem = async (name, artist, index, list) => {
    const songList = await list.map((item) => ({
      name: item.name,
      artist: item.artist,
      image: item.image,
      duration: item.duration,
      id: item.id,
    }));

    const result = await fetchSong(name, artist);
    useDataStore.setState({ songData: result, songIndex: index, songList });
  };

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("history"))
      .filter((value) => value !== null)
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);

    if (history.length >= 50) {
      history.shift();
    }

    setHistory(history.reverse());
    localStorage.setItem("history", JSON.stringify(history));
  }, []);

  console.log(history.length);

  return (
    <div>
      <div
        className="flex h-52 items-center justify-center bg-gray-dark"
        style={{
          background: `linear-gradient(180deg, ${colorData?.lightVibrant}, rgba(0,0,0,1))`,
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="h-20 w-20">
            <Image
              fill
              src={user?.images[0].url}
              alt={user?.display_name}
              className="unset rounded-full"
            />
          </div>
          <h1>@{user.display_name}</h1>
        </div>
      </div>
      {history && (
        <div>
          {history?.map((item, index) => {
            return (
              <div
                key={item?.id}
                onClick={() =>
                  handleClickItem(item.name, item.artist, index, history)
                }
              >
                {item && (
                  <>
                    <div className="mx-auto mt-2 flex w-11/12 cursor-pointer justify-between space-x-2 rounded-lg bg-gray-dark  p-2">
                      <div className="flex space-x-2">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ">
                          <Image
                            fill
                            src={item?.image}
                            alt={item?.name}
                            className="unset | aspect-square"
                          />
                        </div>
                        <div>
                          <p className="line-clamp-1 text-sm font-semibold">
                            {item?.name}
                          </p>
                          <div className="flex space-x-3">
                            <p className="text-xs text-neutral-400">
                              {item?.artist}
                            </p>
                          </div>
                        </div>
                      </div>
                      {songIndex === index &&
                      songList.length &&
                      songData.result.title.includes(
                        songList[songIndex].name
                      ) ? (
                        <MusicBarIcons isPLaying={isPlaying} />
                      ) : null}
                      <p className="self-center text-sm text-neutral-400">
                        {formatMs(item?.duration)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Me;
