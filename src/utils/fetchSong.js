const SEARCHED_SONG_INDEX = 1;

const fetchSong = async (name, artist) => {
  const soundcloudUrlResponse = await fetch(
    `https://soundcloud-downloader4.p.rapidapi.com/soundcloud/search?query=${
      name + "-" + artist
    }`,
    {
      headers: {
        "X-RapidAPI-Host": "soundcloud-downloader4.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPID_KEY,
      },
    }
  );

  const soundcloudUrl = await soundcloudUrlResponse.json();

  const downloadSong = await fetch(
    `https://one-api.ir/soundcloud/?token=${process.env.API_KEY}&action=download&link=${soundcloudUrl.result[SEARCHED_SONG_INDEX].url}`
  );
  return await downloadSong.json();
};

export default fetchSong;
