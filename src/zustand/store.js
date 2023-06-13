import { create } from "zustand";

export const useDataStore = create((set) => ({
  todaysHits: {},
  songData: {},
  songIndex: 0,
  playlist: {},
  songList: [],
  token: "",
  user: null,
}));
