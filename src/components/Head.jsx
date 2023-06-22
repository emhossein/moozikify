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
      <link rel="shortcut icon" href="/public/images/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/public/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/public/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/public/images/favicon-16x16.png"
      />
    </head>
  );
};

export default Head;
