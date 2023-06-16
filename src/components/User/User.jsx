"use client";

import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const User = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    spotifyApi.setAccessToken(token);

    const getUserData = async () => {
      try {
        const user = await spotifyApi.getMe();
        useDataStore.setState({ user, token });
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    getUserData();
  }, []);

  return null;
};

export default User;
