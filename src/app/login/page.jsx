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
    <div>
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
      />
    </div>
  );
};

export default Login;
