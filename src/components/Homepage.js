import React from "react";
import SearchBar from "./Search/SearchBar";
import displayTrending from "./trending/Trending";
import WatchItLogo from "./WatchItLogo";

function Homepage({ handleSearchResults }) {
  return (
    <div>
      <WatchItLogo />
      <SearchBar setSearchResults={handleSearchResults} /> {displayTrending()}
    </div>
  );
}

export default Homepage;
