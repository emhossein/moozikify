"use client";

import { useDataStore } from "@/zustand/store";
import { useEffect } from "react";

const SongNotification = () => {
  const { songData, songList, songIndex } = useDataStore((state) => state);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      // Request notification permission
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }

      // Create a notification
      const showNotification = () => {
        const notification = new Notification("Song Title", {
          body: songList[songIndex]?.name,
          icon: songList[songIndex]?.image,
        });

        // Customize the media session metadata
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: songList[songIndex]?.name,
            artist: songList[songIndex]?.artist,
            artwork: [{ src: songList[songIndex]?.image }],
          });
        }
      };

      showNotification();
    }
  }, [songList]);

  return null;
};

export default SongNotification;
