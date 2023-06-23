/* eslint-disable @next/next/no-head-element */
"use client";

import React from "react";
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
      <meta
        name="description"
        content="Your ultimate music streaming companion. Let the melodies take you on a journey of musical bliss."
      />
    </head>
  );
};

export default Head;
