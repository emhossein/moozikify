"use client";

import React, { useEffect, useState } from "react";

import AlbumTracks from "./AlbumTracks";
import Image from "next/image";
import Link from "next/link";
import blurhash from "@/utils/blurhash";
import { fetchColorDom } from "@/utils/fetchColorDom";
import { spotifyApi } from "@/utils/spotify";

const Album = ({ id }) => {
  const [albumData, setAlbumData] = useState(null);
  const [colorData, setColorData] = useState(null);

  const getData = async () => {
    try {
      const albumData = await spotifyApi.getAlbum(id);

      setAlbumData(albumData);
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
        const data = await fetchColorDom(albumData?.images[0].url);
        setColorData(data);
      } catch (error) {
        console.error("Failed to fetch color data:", error);
      }
    };

    fetchColor();
  }, [albumData]);

  return (
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
            src={albumData?.images[0].url}
            alt={albumData?.name}
            className="unset | object-cover"
            placeholder="blur"
            blurDataURL={blurhash}
          />
        </div>
      </div>
      <div className="z-20 -mt-10 -translate-y-full px-4">
        <h1 className="text-xl font-bold">{albumData?.name}</h1>
        <div className="flex space-x-2">
          {albumData?.artists.map((artist) => (
            <Link href={`/artist/${artist.id}`} key={artist.id}>
              <h3 className="text-sm">{artist.name}</h3>
            </Link>
          ))}
        </div>
        <p className="mt-2 text-xs text-gray-400">
          {albumData?.tracks.total} tracks
        </p>
      </div>
      <AlbumTracks
        items={albumData?.tracks.items}
        image={albumData?.images[albumData?.images.length - 1].url}
      />
    </>
  );
};

export default Album;
