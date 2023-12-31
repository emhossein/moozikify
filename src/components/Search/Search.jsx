"use client";

import React, { useEffect } from "react";

import SearchResults from "./SearchResults";
import { getCookie } from "cookies-next";
import { spotifyApi } from "@/utils/spotify";
import { useDataStore } from "@/zustand/store";
import useDebouncedSearch from "use-debounced-search";

const Search = () => {
  const token = getCookie("access_token");

  // const [searchResult, setSearchResult] = useState(null);
  const { searchResult, searchTerm } = useDataStore((state) => state);

  const { search, searched, handleChange } = useDebouncedSearch(500);

  const handleSearch = async (term) => {
    const searchResult = await spotifyApi.search(term, [
      "album",
      "artist",
      "playlist",
      "track",
    ]);
    useDataStore.setState({ searchResult });
  };

  useEffect(() => {
    spotifyApi.setAccessToken(token);
  }, []);

  useEffect(() => {
    if (searched) {
      handleSearch(searched);
      useDataStore.setState({ searchTerm: searched });
    }
  }, [searched]);

  return (
    <div>
      <form class="flex items-center">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <input
            type="text"
            id="simple-search"
            class="block w-full rounded-lg border border-gray-dark bg-gray-350 p-2.5 text-sm text-white outline-none focus:border-gray-dark focus:outline-0 focus:ring-0"
            placeholder="Search"
            value={search}
            onChange={handleChange}
          />
        </div>
      </form>
      <SearchResults results={searchResult} searched={searchTerm} />
    </div>
  );
};

export default Search;
