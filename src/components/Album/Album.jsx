"use client";

import React, { useEffect } from "react";

import { spotifyApi } from "@/utils/spotify";

const Album = ({ id }) => {
  const getData = async () => {
    try {
      const albumDetails = await spotifyApi.getAlbum(id);

      console.log(albumDetails);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>{id}</div>;
};

export default Album;
