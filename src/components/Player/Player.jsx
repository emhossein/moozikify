"use client";

import {
  PauseIcon,
  PlayIcon,
  SkipBackwardIcon,
  SkipForwardIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from "../Icons";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import fetchSong from "@/utils/fetchSong";
import formatTime from "@/utils/formatTime ";
import { useDataStore } from "@/zustand/store";

const Player = () => {
  const { songData, todaysHits, songIndex, songList, isPlaying } = useDataStore(
    (state) => state
  );

  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    useDataStore.setState({ isPlaying: false });
  };

  const handlePause = () => {
    audioRef.current.pause();
    useDataStore.setState({ isPlaying: true });
  };

  const handleSetTime = (time) => {
    const newTime = audioRef.current.currentTime + time;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(Math.floor(audioRef.current.currentTime));
  };

  const handleLoadedMetadata = () => {
    setDuration(Math.floor(audioRef.current.duration));
  };

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
        nextSongIndex = 0; // Reset to the first song
      }
    } else if (action === "previous") {
      nextSongIndex = songIndex - 1;
      if (nextSongIndex < 0) {
        nextSongIndex = songList.length - 1; // Set to the last song
      }
    } else if (action === "random") {
      nextSongIndex = Math.floor(Math.random() * songList.length);
    }

    const result = await fetchSong(
      songList[nextSongIndex].name,
      songList[nextSongIndex].artist
    );

    updateDataStore(() => ({
      songData: result,
      songIndex: nextSongIndex,
    }));
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handleEnded = () => {
        handleSongChange("next", songIndex, songList, useDataStore.setState);
      };

      const handleError = () => {
        handleSongChange("next", songIndex, songList, useDataStore.setState);
      };

      audioElement.addEventListener("ended", handleEnded);
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("error", handleError);

      return () => {
        audioElement.removeEventListener("ended", handleEnded);
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("error", handleError);
      };
    }
  }, [songIndex]);

  return (
    <>
      {songData.result && (
        <div className="fixed bottom-14 mx-auto w-full bg-neutral-800 p-2 md:w-[40vw] md:rounded-lg lg:p-0">
          <audio
            ref={audioRef}
            src={
              songData.result?.formats[songData.result?.formats.length - 1].url
            }
            type="audio/mpeg"
            autoPlay
            controls
            className="hidden"
          />

          <div className="flex items-center space-x-2 ">
            <div className="hidden h-24 lg:block">
              <Image
                fill
                src={songList[songIndex].image}
                alt={songList[songIndex].name}
                className="unset | aspect-square w-full md:rounded-l-lg"
                loading="lazy"
              />
            </div>
            <div className="flex w-full flex-1 flex-col px-2">
              <div className="hidden items-baseline space-x-3 lg:flex">
                <p className="line-clamp-2 text-sm">
                  {songList[songIndex].name}
                </p>
                <p className="mb-2 line-clamp-2 text-xs text-gray-500">
                  {songList[songIndex].artist.replace("undefined", "")}
                </p>
              </div>
              <div className="flex w-full justify-center space-x-4 lg:mb-2">
                <button
                  onClick={() =>
                    handleSongChange(
                      "previous",
                      songIndex,
                      songList,
                      useDataStore.setState
                    )
                  }
                >
                  <SkipPreviousIcon />
                </button>
                <button onClick={() => handleSetTime(-15)}>
                  <SkipBackwardIcon />
                </button>
                {!isPlaying ? (
                  <button onClick={handlePause}>
                    <PauseIcon />
                  </button>
                ) : (
                  <button onClick={handlePlay}>
                    <PlayIcon />
                  </button>
                )}
                <button onClick={() => handleSetTime(15)}>
                  <SkipForwardIcon />
                </button>
                <button
                  onClick={() =>
                    handleSongChange(
                      "next",
                      songIndex,
                      songList,
                      useDataStore.setState
                    )
                  }
                >
                  <SkipNextIcon />
                </button>
              </div>

              <div className="flex flex-col">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  step={1}
                  onChange={handleSeek}
                  className=""
                />
                <div className="-mt-1 flex justify-between text-[10px] lg:text-xs">
                  <p>{formatTime(currentTime)}</p>
                  <p>{formatTime(songData.result.duration)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
