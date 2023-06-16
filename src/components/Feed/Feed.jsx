"use client";

import { useEffect, useState } from "react";

import CategoriesItem from "./CategoriesItem";
import FeedItem from "./FeedItem";
import RecommendationFeed from "./RecommendationFeed";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";

const Feed = ({ newReleases, featured, topArtists, categories }) => {
  const token = getCookie("access_token");
  const { user, recommendations } = useDataStore((state) => state);

  const [category, setCategory] = useState(null);
  const [newAlbums, setNewAlbums] = useState(null);
  const [topArtist, setTopArtist] = useState(null);
  const [featuredPlaylist, setFeaturedPlaylist] = useState(null);

  const getRecommendations = async () => {
    try {
      const topTracks = await spotifyApi.getMyTopTracks();
      const topArtists = await spotifyApi.getMyTopArtists();

      // 5 seeds for recommendations max
      const tracksId = topTracks.items
        .map((item) => item.id)
        .slice(0, 5)
        .join(",");
      const artistId = topArtists.items
        .map((item) => item.id)
        .slice(0, 5)
        .join(",");

      const recommendationsArtists = await spotifyApi.getRecommendations({
        seed_artists: artistId,
        seed_tracks: "",
        seed_genres: "",
      });

      const recommendationsTracks = await spotifyApi.getRecommendations({
        seed_artists: "",
        seed_tracks: tracksId,
        seed_genres: "",
      });

      useDataStore.setState({
        recommendations: {
          recommendationsArtists,
          recommendationsTracks,
        },
      });

      localStorage.setItem("recentlyPlayedPlaylistId", recentlyPlayed.id);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getData = async () => {
    try {
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

      localStorage.setItem("recentlyPlayedPlaylistId", recentlyPlayed.id);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    setNewAlbums(JSON.parse(newReleases?.value));
    setFeaturedPlaylist(JSON.parse(featured?.value));
    setCategory(JSON.parse(categories?.value));
    setTopArtist(JSON.parse(topArtists?.value));

    getData();
  }, []);

  useEffect(() => {
    if (recommendations?.recommendationsTracks === null) {
      getRecommendations();
    }
  }, [getData]);

  return (
    <div className="w-full overflow-hidden">
      <div className="pl-2">
        <FeedItem
          items={featuredPlaylist?.playlists?.items}
          title={featuredPlaylist?.message}
          type="playlist"
        />
        <RecommendationFeed
          items={recommendations?.recommendationsArtists}
          title="Base on your top artists"
        />
        <FeedItem
          items={newAlbums?.albums?.items}
          title="New Release"
          type="album"
        />
        <FeedItem
          items={topArtist?.items}
          title="Your Top Artists"
          type="artist"
        />
        <RecommendationFeed
          items={recommendations?.recommendationsTracks}
          title="You might also like these songs"
        />

        <CategoriesItem items={category?.categories?.items} />
      </div>
    </div>
  );
};

export default Feed;
