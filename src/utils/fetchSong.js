import randomApiKey from "./randomApiKey";

const fetchSong = async (name, artist) => {
  try {
    const soundcloudUrlResponse = await fetch(
      `https://musicapi13.p.rapidapi.com/public/search`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Host": "musicapi13.p.rapidapi.com",
          "X-RapidAPI-Key": randomApiKey(),
        },
        body: JSON.stringify({
          track: name,
          artist: artist,
          type: "track",
          sources: ["soundcloud"],
        }),
      }
    );

    
    if (!soundcloudUrlResponse.ok) {
      throw new Error("Failed to retrieve SoundCloud URL");
    }
    
    const soundcloudUrl = await soundcloudUrlResponse.json();
    
    
    const downloadSong = await fetch(
      `https://one-api.ir/soundcloud/?token=${process.env.API_KEY}&action=download&link=${soundcloudUrl.tracks[0].data.url}`
    );

    if (!downloadSong.ok) {
      throw new Error("Failed to download the song");
    }

    return await downloadSong.json();
  } catch (error) {
   
    console.log("An error occurred during the fetchSong operation:", error);
    throw error;
  }
};

export default fetchSong;
