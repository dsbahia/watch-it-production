import React from "react";
import TrendingMovieContainer from "./TrendingMoviesContainer";
import TrendingTVContainer from "./TrendingTVShowsContainer";
import "../../styles/displaytrending.css";

function displayTrending() {
  return (
    <div className="trending-results-container">
      <div className="trending-results-container-movies">
        <TrendingMovieContainer />
      </div>
      <div className="trending-results-container-tv-shows">
        <TrendingTVContainer />
      </div>
    </div>
  );
}

export default displayTrending;
