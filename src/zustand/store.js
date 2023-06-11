import { create } from "zustand";

export const useDataStore = create((set) => ({
  newData: {},
  todaysHits: {},
  songData: {},
  songIndex: 0,
}));
