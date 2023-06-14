"use client";

import { useEffect, useState } from "react";

import FeedItem from "./FeedItem";
import RecommendationFeed from "./RecommendationFeed";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";

const Feed = () => {
  const token = getCookie("access_token");

  const [newRelease, setNewRelease] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    const getData = async () => {
      try {
        const newReleases = await spotifyApi.getNewReleases({
          limit: 50,
          country: "US",
        });
        const featuredData = await spotifyApi.getFeaturedPlaylists({
          country: "US",
        });
        const topArtist = await spotifyApi.getMyTopArtists();
        const topTracks = await spotifyApi.getMyTopTracks();

        // 5 seeds for recommendations max
        const tracksId = topTracks.items
          .map((item) => item.id)
          .slice(0, 3)
          .join(",");
        const artistId = topArtist.items
          .map((item) => item.id)
          .slice(0, 2)
          .join(",");

        const recommendations = await spotifyApi.getRecommendations({
          seed_artists: artistId,
          seed_tracks: tracksId,
          seed_genres: "",
        });

        setRecommendations(recommendations);
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
      <div className="pl-2">
        <FeedItem
          items={newRelease?.albums.items}
          title="New Release"
          type="album"
        />
        <FeedItem
          items={featured?.playlists.items}
          title={featured?.message}
          type="playlist"
        />
        <FeedItem
          items={topArtists?.items}
          title="Your Top Artists"
          type="artist"
        />
        <RecommendationFeed items={recommendations} />
      </div>
    </div>
  );
};

export default Feed;
