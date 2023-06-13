"use client";

import React, { useEffect } from "react";

import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";

const User = ({ token }) => {
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
