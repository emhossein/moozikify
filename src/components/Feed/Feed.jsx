"use client";

import { useEffect, useState } from "react";

import FeedItem from "./FeedItem";
import RecommendationFeed from "./RecommendationFeed";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";

const Feed = ({ newReleases, featured, topArtists }) => {
  const token = getCookie("access_token");
  const { user } = useDataStore((state) => state);

  const [newAlbums, setNewAlbums] = useState(null);
  const [featuredPlaylist, setFeaturedPlaylist] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const getData = async () => {
    try {
      const topArtists = await spotifyApi.getMyTopArtists();
      const topTracks = await spotifyApi.getMyTopTracks();

      // 5 seeds for recommendations max
      const tracksId = topTracks.items
        .map((item) => item.id)
        .slice(0, 3)
        .join(",");
      const artistId = topArtists.items
        .map((item) => item.id)
        .slice(0, 2)
        .join(",");

      const recommendations = await spotifyApi.getRecommendations({
        seed_artists: artistId,
        seed_tracks: tracksId,
        seed_genres: "",
      });

      const userPlaylist = await spotifyApi.getUserPlaylists(user.id);
      const userRecentSongs = userPlaylist.items.some(
        (item) => item.name === user.display_name + "'s playlist"
      );

      if (!userRecentSongs) {
        await spotifyApi.createPlaylist(user.id, {
          name: user.display_name + "'s playlist",
        });
      }

      const [recentlyPlayed] = userPlaylist.items.filter(
        (item) => item.name === user.display_name + "'s playlist"
      );

      setRecommendations(recommendations);

      localStorage.setItem("recentlyPlayedPlaylistId", recentlyPlayed.id);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    setNewAlbums(JSON.parse(newReleases.value));
    setFeaturedPlaylist(JSON.parse(featured.value));
    setTopArtist(JSON.parse(topArtists.value));

    getData();
  }, []);

  return (
    <div className="w-[100vw] overflow-hidden md:w-[40vw]">
      <div className="pl-2">
        <FeedItem
          items={newAlbums?.albums.items}
          title="New Release"
          type="album"
        />
        <FeedItem
          items={featuredPlaylist?.playlists.items}
          title={featuredPlaylist?.message}
          type="playlist"
        />
        <FeedItem
          items={topArtist?.items}
          title="Your Top Artists"
          type="artist"
        />
        <RecommendationFeed items={recommendations} />
      </div>
    </div>
  );
};

export default Feed;
