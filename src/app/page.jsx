import Feed from "@/components/Feed/Feed";
import { spotifyApi } from "@/utils/spotify";

export default async function Home() {
  return (
    <main className="6 min-h-screen">
      <Feed />
    </main>
  );
}
