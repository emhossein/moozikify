import Feed from "@/components/Feed";

export default async function Home() {
  const newAlbumResponse = await fetch(
    `${process.env.BASE_URL}/?token=${process.env.API_KEY}&action=new`
  );

  const todaysHitsResponse = await fetch(
    `${process.env.BASE_URL}/?token=${process.env.API_KEY}&action=playlists&id=37i9dQZF1DXcBWIGoYBM5M`
  );

  const playlist = await fetch(
    `${process.env.BASE_URL}/?token=${process.env.API_KEY}&action=playlists&id=37i9dQZF1DX76t638V6CA8`
  );

  const newAlbumData = await newAlbumResponse.json();
  const todaysHitsData = await todaysHitsResponse.json();
  const playlistData = await playlist.json();

  return (
    <main className="min-h-screen">
      <Feed
        newAlbumData={newAlbumData.result}
        todaysHitsData={todaysHitsData.result}
        playlistData={playlistData.result}
      />
    </main>
  );
}
