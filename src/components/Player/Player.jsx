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

import fetchSong from "@/utils/fetchSong";
import formatTime from "@/utils/formatTime ";
import { useDataStore } from "@/zustand/store";

const Player = () => {
  const { songData, todaysHits, songIndex, songList } = useDataStore(
    (state) => state
  );

  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
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

    updateDataStore((state) => ({
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
        <div className="absolute bottom-14 w-full md:w-[40vw]">
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

          <div className="flex w-full items-center space-x-2 bg-black">
            <div className="w-32">
              <img
                src={songData.result?.thumbnail}
                alt={songData.result?.title}
                className="aspect-square w-full"
              />
              <p className="line-clamp-2 hidden text-sm md:block">
                {songData.result?.title}
              </p>
            </div>
            <div className="flex w-full flex-1 flex-col px-2">
              <div className="flex w-full justify-between">
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
                {isPlaying ? (
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
              <div className="mt-5 flex flex-col">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  step={1}
                  onChange={handleSeek}
                  className="appearance-none rounded-lg bg-white bg-opacity-20 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:h-[10px] [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-800"
                />
                <div className="mt-1 flex justify-between text-xs">
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
