"use client";

import React, { useEffect, useRef } from "react";

import fetchSong from "@/utils/fetchSong";
import { useDataStore } from "@/zustand/store";

const Player = () => {
  const { songData, todaysHits, songIndex } = useDataStore((state) => state);

  const songList = todaysHits.tracks.items.map((item) => ({
    name: item.track.name,
    artist: item.track.album.artists[0].name,
  }));

  const audioRef = useRef(null);

  const handleSongChange = async (
    action,
    songIndex,
    songList,
    updateDataStore
  ) => {
    let nextSongIndex;

    if (action === "next") {
      nextSongIndex = songIndex + 1;
      if (nextSongIndex >= songList.length) {
        // Handle when the next song index exceeds the song list length
        nextSongIndex = 0; // Reset to the first song
      }
    } else if (action === "previous") {
      nextSongIndex = songIndex - 1;
      if (nextSongIndex < 0) {
        // Handle when the previous song index is less than zero
        nextSongIndex = songList.length - 1; // Set to the last song
      }
    } else if (action === "random") {
      nextSongIndex = Math.floor(Math.random() * songList.length);
    }

    const result = await fetchSong(
      songList[nextSongIndex].name,
      songList[nextSongIndex].artist
    );

    updateDataStore((state) => ({
      songData: result,
      songIndex: nextSongIndex,
    }));

    console.log("Song has ended");
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handleEnded = () => {
        handleSongChange("next", songIndex, songList, useDataStore.setState);
      };

      audioElement.addEventListener("ended", handleEnded);

      return () => {
        audioElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [songIndex]);

  console.log(songIndex, songList[songIndex]);

  return (
    <>
      {songData.result && (
        <div className="absolute bottom-14 w-[40vw]">
          <audio
            ref={audioRef}
            src={
              songData.result?.formats[songData.result?.formats.length - 1].url
            }
            type="audio/mpeg"
            autoPlay
            controls
          />
          {songData.result?.title}
          <p
            onClick={() =>
              handleSongChange(
                "next",
                songIndex,
                songList,
                useDataStore.setState
              )
            }
          >
            next
          </p>
        </div>
      )}
    </>
  );
};

export default Player;
