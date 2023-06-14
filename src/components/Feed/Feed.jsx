"use client";

import FeedItem from "./FeedItem";
import RecommendationFeed from "./RecommendationFeed";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";
import { useEffect } from "react";

const Feed = () => {
  const token = getCookie("access_token");
  const { user, feedData } = useDataStore((state) => state);

  const getData = async () => {
    try {
      const newRelease = await spotifyApi.getNewReleases({
        limit: 50,
        country: "US",
      });
      const featured = await spotifyApi.getFeaturedPlaylists({
        country: "US",
      });
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

      useDataStore.setState({
        feedData: {
          recommendations,
          topArtists,
          newRelease,
          featured,
        },
      });

      localStorage.setItem("recentlyPlayedPlaylistId", recentlyPlayed.id);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    spotifyApi.setAccessToken(token);

    getData();
  }, []);

  return (
    <div className="w-[100vw] overflow-hidden md:w-[40vw]">
      <div className="pl-2">
        <FeedItem
          items={feedData?.newRelease?.albums.items}
          title="New Release"
          type="album"
        />
        <FeedItem
          items={feedData?.featured?.playlists.items}
          title={feedData?.featured?.message}
          type="playlist"
        />
        <FeedItem
          items={feedData?.topArtists?.items}
          title="Your Top Artists"
          type="artist"
        />
        <RecommendationFeed items={feedData?.recommendations} />
      </div>
    </div>
  );
};

export default Feed;
