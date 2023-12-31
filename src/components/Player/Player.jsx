"use client";

import {
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipNextIcon,
  SkipPreviousIcon,
} from "../Icons";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import PlayerSlider from "./PlayerSlider";
import blurhash from "@/utils/blurhash";
import fetchSong from "@/utils/fetchSong";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";

const Player = () => {
  const { songData, songIndex, songList, isPlaying } = useDataStore(
    (state) => state
  );

  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [historyId, setHistoryId] = useState("");
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

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
    useDataStore.setState({ isPlaying: audioRef?.current.paused });
    audioRef.current.play();
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

    await spotifyApi.addTracksToPlaylist(historyId, [
      "spotify:track:" + songList[songIndex + 1].id,
    ]);
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
        handleSongChange(
          shuffle ? "random" : "next",
          songIndex,
          songList,
          useDataStore.setState
        );
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

  useEffect(() => {
    const id = localStorage.getItem("recentlyPlayedPlaylistId");
    setHistoryId(id);
  }, []);

  return (
    <>
      {songData.result && (
        <div className="fixed bottom-14 z-50 mx-auto w-full bg-neutral-800 md:w-[60vw] md:rounded-lg">
          <audio
            ref={audioRef}
            src={
              songData.result?.formats[songData.result?.formats.length - 1].url
            }
            preload="metadata"
            type="audio/mpeg"
            controls
            className="hidden"
            loop={repeat}
          />

          <div className="flex items-center space-x-2 ">
            <div className="h-[87px] lg:h-[115px]">
              <Image
                fill
                src={songList[songIndex].image}
                alt={songList[songIndex].name}
                className="unset | aspect-square w-full md:rounded-l-lg"
                loading="lazy"
                placeholder="blur"
                blurDataURL={blurhash}
              />
            </div>
            <div className="flex w-full flex-1 flex-col p-2">
              <div className="hidden items-baseline space-x-3 lg:flex">
                <p className="line-clamp-2 text-sm">
                  {songList[songIndex].name}
                </p>
                <p className="mb-2 line-clamp-2 text-xs text-gray-500">
                  {songList[songIndex].artist}
                </p>
              </div>
              <div className="mb-2 flex w-full justify-center space-x-4">
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
                <button onClick={() => setShuffle(!shuffle)}>
                  <ShuffleIcon fill={shuffle ? "#1DB954" : "white"} />
                </button>
                {isPlaying ? (
                  <button onClick={handlePlay}>
                    <PlayIcon />
                  </button>
                ) : (
                  <button onClick={handlePause}>
                    <PauseIcon />
                  </button>
                )}
                <button onClick={() => setRepeat(!repeat)}>
                  <RepeatIcon fill={repeat ? "#1DB954" : "white"} />
                </button>
                <button
                  onClick={() =>
                    handleSongChange(
                      shuffle ? "random" : "next",
                      songIndex,
                      songList,
                      useDataStore.setState
                    )
                  }
                >
                  <SkipNextIcon />
                </button>
              </div>

              <PlayerSlider currentTime={currentTime} handleSeek={handleSeek} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Player;
