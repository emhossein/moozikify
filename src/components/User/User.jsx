"use client";

import React, { useEffect } from "react";

import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";
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
        router.push("/login");
      }
    };

    getUserData();
  }, []);

  return null;
};

export default User;
