import Feed from "@/components/Feed/Feed";
import { cookies } from "next/headers";

export default async function Home() {
  const token = cookies().get("access_token");

  const url = "https://api.spotify.com/v1";

  const headers = {
    Authorization: "Bearer " + token?.value,
  };

  const newReleases = await fetch(`${url}/browse/new-releases`, {
    headers,
  }).catch((err) => console.error("newReleases ", err));

  const featured = await fetch(`${url}/browse/featured-playlists?country=US`, {
    headers,
  }).catch((err) => console.error("featured ", err));

  const topArtists = await fetch(`${url}/me/top/artists`, {
    headers,
  }).catch((err) => console.error("top artists ", err));

  const categories = await fetch(
    `${url}/browse/categories?country=US&limit=12`,
    {
      headers,
    }
  ).catch((err) => console.error("categories ", err));

  return (
    <main className="6 min-h-screen bg-gradient-to-b from-[#1db95480] from-10% to-black to-30% pb-52">
      <Feed
        newReleases={newReleases?.json()}
        featured={featured?.json()}
        topArtists={topArtists?.json()}
        categories={categories?.json()}
      />
    </main>
  );
}
