"use client";

import React, { useEffect, useState } from "react";

import FeedItem from "../Feed/FeedItem";
import Image from "next/image";
import RecommendationFeed from "../Feed/RecommendationFeed";
import blurhash from "@/utils/blurhash";
import { fetchColorDom } from "@/utils/fetchColorDom";
import formatNumber from "@/utils/numberFormat";
import { spotifyApi } from "@/utils/spotify";

const Artist = ({ id }) => {
  const [artistDetail, setArtistDetail] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [related, setRelated] = useState(null);
  const [colorData, setColorData] = useState(null);

  const getData = async () => {
    try {
      const artistDetail = await spotifyApi.getArtist(id);
      const artistAlbums = await spotifyApi.getArtistAlbums(id);
      const artistTopTracks = await spotifyApi.getArtistTopTracks(id, "US");
      const artistRelatedArtists = await spotifyApi.getArtistRelatedArtists(id);

      setArtistDetail(artistDetail);
      setAlbums(artistAlbums);
      setTopTracks(artistTopTracks);
      setRelated(artistRelatedArtists);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const data = await fetchColorDom(artistDetail?.images[0].url);
        setColorData(data);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchColor();
  }, [artistDetail]);

  return (
    <>
      {artistDetail && (
        <>
          <div
            className="absolute top-0 -z-10 h-screen w-full"
            style={{
              background: `linear-gradient(180deg, ${colorData?.vibrant}, #0F0F0F)`,
            }}
          />
          <div className="flex h-64 w-full space-x-2 overflow-hidden bg-gradient-to-b from-transparent to-black">
            <div className="relative -z-10 h-full w-full shrink-0 overflow-hidden">
              <Image
                fill
                src={artistDetail?.images[0].url}
                alt={artistDetail?.name}
                className="unset | object-cover"
                placeholder="blur"
                blurDataURL={blurhash}
              />
            </div>
          </div>
          <div className="z-20 -mt-10 -translate-y-full px-4">
            <h1 className="text-xl font-bold">{artistDetail?.name}</h1>
            <p className="mt-2 text-xs text-gray-400">
              {formatNumber(artistDetail?.followers.total)} followers
            </p>
          </div>
          <div className="pl-2">
            <FeedItem
              items={albums?.items}
              title={`${artistDetail?.name}'s albums`}
              type="album"
            />
            <RecommendationFeed
              items={topTracks && topTracks}
              title={`${artistDetail?.name}'s top tracks`}
            />
            <FeedItem
              items={related?.artists}
              title={`More like ${artistDetail?.name}`}
              type="artist"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Artist;
