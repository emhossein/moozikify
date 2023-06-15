import Feed from "@/components/Feed/Feed";
import { cookies } from "next/headers";

export default async function Home() {
  const token = cookies().get("access_token");

  const newReleases = await fetch(
    "https://api.spotify.com/v1/browse/new-releases",
    {
      headers: {
        Authorization: "Bearer " + token?.value,
      },
    }
  );

  const featured = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists?country=US",
    {
      headers: {
        Authorization: "Bearer " + token.value,
      },
    }
  );

  const topArtists = await fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: "Bearer " + token.value,
    },
  });

  return (
    <main className="6 min-h-screen bg-gradient-to-b from-[#1db95480] from-10% to-black to-30% pb-52">
      <Feed
        newReleases={newReleases.json()}
        featured={featured.json()}
        topArtists={topArtists.json()}
      />
    </main>
  );
}
