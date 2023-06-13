/* eslint-disable @next/next/no-head-element */
"use client";

import React from "react";
import SongNotification from "./SongNotification";
import { useDataStore } from "@/zustand/store";

const Head = () => {
  const { songData, songList, songIndex } = useDataStore((state) => state);

  return (
    <head>
      <title>
        {songData?.result
          ? "Playing: " +
            songList[songIndex]?.name +
            " - " +
            songList[songIndex]?.artist
          : "moozikify"}
      </title>
    </head>
  );
};

export default Head;
