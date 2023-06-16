import FeedItem from "../Feed/FeedItem";
import React from "react";
import SearchTracks from "./SearchTracks";

const SearchResults = ({ results, searched }) => {
  return (
    <div>
      <SearchTracks
        tracks={results?.tracks?.items}
        title={`Tracks for '${searched}'`}
      />
      <FeedItem
        items={results?.artists?.items}
        title={`Artists for '${searched}'`}
        type="artist"
      />
      <FeedItem
        items={results?.playlists.items}
        title={`Playlists for '${searched}'`}
        type="playlist"
      />
      <FeedItem
        items={results?.albums.items}
        title={`Albums for '${searched}'`}
        type="album"
      />
    </div>
  );
};

export default SearchResults;
