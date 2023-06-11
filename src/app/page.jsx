import Feed from "@/components/Feed";

export default async function Home() {
  const newAlbumResponse = await fetch(
    `${process.env.BASE_URL}/?token=${process.env.API_KEY}&action=new`
  );

  const todaysHitsResponse = await fetch(
    `${process.env.BASE_URL}/?token=${process.env.API_KEY}&action=playlists&id=37i9dQZF1DXcBWIGoYBM5M`
  );

  const newAlbumData = await newAlbumResponse.json();
  const todaysHitsData = await todaysHitsResponse.json();

  return (
    <main className="min-h-screen">
      <Feed
        newAlbumData={newAlbumData.result}
        todaysHitsData={todaysHitsData.result}
      />
    </main>
  );
}
