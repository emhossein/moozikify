"use client";

import { Scopes, SpotifyAuth } from "react-spotify-auth";

import React from "react";
import { setAccessToken } from "@/utils/spotify";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  function onSuccess(token) {
    setAccessToken(token);
    router.push("/");
  }

  function onFailure(error) {
    console.error(error);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg hover:shadow-lg hover:shadow-[#1db95480]">
        <SpotifyAuth
          redirectUri={process.env.REDIRECT_URI}
          clientID={process.env.CLIENT_ID}
          scopes={[
            Scopes.userReadEmail,
            Scopes.userTopRead,
            Scopes.userLibraryRead,
            Scopes.userReadRecentlyPlayed,
          ]}
          onSuccess={onSuccess}
          onFailure={onFailure}
          title="Login with Spotify"
          btnClassName="bg-brand px-4 py-2 rounded-lg flex items-center text-xl font-semibold space-x-2"
          logoClassName="fill-white w-7"
        />
      </div>
    </div>
  );
};

export default Login;
