import { spotifyApi } from "./spotify";

const fetchUser = async () => {
  try {
    const user = await spotifyApi.getMe();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

export default fetchUser;
