import { create } from "zustand";

export const useDataStore = create(() => ({
  todaysHits: {},
  songData: {},
  songIndex: 0,
  playlist: {},
  songList: [],
  token: "",
  user: null,
  isPlaying: false,
  recommendations: {
    recommendationsArtists: null,
    recommendationsTracks: null,
  },
  searchTerm:'',
  searchResult: null,
}));
