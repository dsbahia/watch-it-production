import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchCard from "./SearchCard";
import WatchItLogo from "../WatchItLogo";

import "../../styles/searchresultscard.css";

function SearchResultsCard({ results }) {
  const navigate = useNavigate();

  // eslint-disable-next-line
  useEffect(() => {
    if (!results || results.length === 0) {
      const redirectTimer = setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }
  }, [results, navigate]);

  return (
    <div>
      <WatchItLogo />
      {results && results.length > 0 ? (
        <div className="top-rated-movie-title">
          Search Results:
          <div
            className="search-results-card"
            data-testid="search-results-card"
          >
            {results.map((data) => (
              <div key={data.id} className="item">
                <SearchCard
                  title={data.title}
                  posterpath={data.poster_path}
                  movieId={data.id}
                  overview={data.overview}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-results-container">
          <div className="no-results-message">
            No Results Found. Redirecting you back to the home page in 5
            seconds...
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResultsCard;
