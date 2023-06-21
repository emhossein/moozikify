"use client";

import React, { useEffect, useState } from "react";

import CategoryItems from "./CategoryItems";
import axios from "axios";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { useBottomReached } from "@/hooks/useBottomReached";

const Category = ({ id }) => {
  const token = getCookie("access_token");

  const isBottomReached = useBottomReached();

  const [playlists, setPlaylists] = useState(null);
  const [next, setNext] = useState(null)

  const getData = async () => {
    try {
      const categoryPlaylists = await spotifyApi.getCategoryPlaylists(id);
      console.log(categoryPlaylists);

      setPlaylists(categoryPlaylists.playlists.items);
      setNext(categoryPlaylists.playlists.next);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchMorePlaylist = async (url) => {
    const result = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return result.data;
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (next) {
      const fetchMore = async () => {
        const morePlaylist = await fetchMorePlaylist(next);
        console.log(morePlaylist);
        setNext(morePlaylist.playlists.next)
        setPlaylists(prev=> [...prev,...morePlaylist.playlists.items])
      };
      fetchMore();
    }
  }, [isBottomReached]);


  return (
    <div className="p-2">
      <CategoryItems items={playlists} title={"Let's find what you like "} />
    </div>
  );
};

export default Category;
