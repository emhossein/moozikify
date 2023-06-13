const SEARCHED_SONG_INDEX = 0;

const fetchSong = async (name, artist) => {
  try {
    const soundcloudUrlResponse = await fetch(
      `https://soundcloud-downloader4.p.rapidapi.com/soundcloud/search?query=${
        artist + " - " + name
      }`,
      {
        headers: {
          "X-RapidAPI-Host": "soundcloud-downloader4.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPID_KEY,
        },
      }
    );

    if (!soundcloudUrlResponse.ok) {
      throw new Error("Failed to retrieve SoundCloud URL");
    }

    const soundcloudUrl = await soundcloudUrlResponse.json();

    const downloadSong = await fetch(
      `https://one-api.ir/soundcloud/?token=${process.env.API_KEY}&action=download&link=${soundcloudUrl.result[SEARCHED_SONG_INDEX].url}`
    );

    if (!downloadSong.ok) {
      throw new Error("Failed to download the song");
    }

    return await downloadSong.json();
  } catch (error) {
    // Handle the error appropriately (e.g., logging, displaying an error message)
    console.error("An error occurred during the fetchSong operation:", error);
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export default fetchSong;
