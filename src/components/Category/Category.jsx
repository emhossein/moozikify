"use client";

import React, { useEffect, useState } from "react";

import FeedItem from "../Feed/FeedItem";
import { spotifyApi } from "@/utils/spotify";

const Category = ({ id }) => {
  const [playlists, setPlaylists] = useState(null);

  const getData = async () => {
    try {
      const categoryPlaylists = await spotifyApi.getCategoryPlaylists(id);

      setPlaylists(categoryPlaylists);
      console.log(categoryPlaylists);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <FeedItem items={playlists && playlists} title={"test"} />
    </div>
  );
};

export default Category;
