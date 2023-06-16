import React, { useEffect, useState } from "react";

import Image from "next/image";
import { MusicBarIcons } from "../Icons";
import blurhash from "@/utils/blurhash";
import fetchSong from "@/utils/fetchSong";
import { formatMs } from "@/utils/formatTime ";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";

const Me = ({ user, colorData }) => {
  const [history, setHistory] = useState(null);
  const [historyId, setHistoryId] = useState("");

  const { songData, isPlaying, songList } = useDataStore((state) => state);

  const handleClickItem = async (name, artist, index, list) => {
    const songList = await list.map((item) => ({
      name: item?.track.name,
      artist: item.track.artists[0].name,
      image: item?.track.album.images[0].url,
      duration: item?.track.duration_ms,
      id: item.track.id,
    }));

    const result = await fetchSong(name, artist);
    useDataStore.setState({ songData: result, songIndex: index, songList });
  };

  useEffect(() => {
    const id = localStorage.getItem("recentlyPlayedPlaylistId");
    setHistoryId(id);

    const getData = async () => {
      const history = await spotifyApi.getPlaylist(id);
      const [duplicate] = history.tracks.items
        .map((item) => item.track.id)
        .filter(
          (
            (s) => (v) =>
              s.has(v) || !s.add(v)
          )(new Set())
        );

      if (duplicate) {
        await spotifyApi.removeTracksFromPlaylist(id, [
          "spotify:track:" + duplicate,
        ]);
      }

      setHistory(history?.tracks.items.reverse());
    };

    getData();
  }, []);

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
              placeholder="blur"
              blurDataURL={blurhash}
            />
          </div>
          <h1>@{user.display_name}</h1>
        </div>
      </div>
      {history && (
        <>
          {history.map((item, index) => {
            return (
              <div
                key={item.track.id}
                onClick={() =>
                  handleClickItem(
                    item.track.name,
                    item.track.artists[0].name,
                    index,
                    history
                  )
                }
              >
                <div className="mx-auto mt-2 flex w-11/12 cursor-pointer justify-between space-x-2 rounded-lg bg-gray-dark  p-2">
                  <div className="flex space-x-2">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ">
                      <Image
                        fill
                        src={item?.track.album.images[0].url}
                        alt={item?.track.name}
                        placeholder="blur"
                        blurDataURL={blurhash}
                        className="unset | aspect-square"
                      />
                    </div>
                    <div>
                      <p className="line-clamp-1 text-sm font-semibold">
                        {item.track.name}
                      </p>
                      <div className="flex space-x-3">
                        <p className="text-xs text-neutral-400">
                          {item.track.artists[0].name}
                        </p>
                      </div>
                    </div>
                  </div>
                  {songList.length &&
                  songData.result.title.includes(item.track.name) ? (
                    <MusicBarIcons isPLaying={isPlaying} />
                  ) : null}
                  <p className="self-center text-sm text-neutral-400">
                    {formatMs(item?.track.duration_ms)}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Me;
