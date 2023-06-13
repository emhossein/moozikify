"use client";

import { useEffect, useState } from "react";

import FeedItem from "./FeedItem";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";

const Feed = () => {
  const token = getCookie("access_token");

  const [newRelease, setNewRelease] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    const getData = async () => {
      try {
        const newReleases = await spotifyApi.getNewReleases({ limit: 50 });
        const featuredData = await spotifyApi.getFeaturedPlaylists();
        const topArtist = await spotifyApi.getMyTopArtists();
        const search = await spotifyApi.search("gym", ["playlist"]);

        setSearch(search);
        setTopArtists(topArtist);
        setNewRelease(newReleases);
        setFeatured(featuredData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-[100vw] overflow-hidden md:w-[40vw]">
      <FeedItem
        items={newRelease?.albums.items}
        title="New Release"
        type="album"
      />
      <FeedItem
        items={featured?.playlists.items}
        title="Featured playlists"
        type="playlist"
      />
      <FeedItem
        items={topArtists?.items}
        title="Your Top Artists"
        type="artist"
      />
      <FeedItem items={search?.playlists?.items} title="GYM" type="playlist" />
    </div>
  );
};

export default Feed;
