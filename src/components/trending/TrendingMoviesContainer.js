import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import TrendingMovie from "./TrendingMovies";
import api from "../../api/api";
import "../../styles/trendingmoviescontainer.css";

function TrendingMoviesContainer() {
  const [moviesData, setMoviesData] = useState([]);
  const [movieTrailers, setMovieTrailers] = useState({});
  const [maxResults, setMaxResults] = useState(3);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const data = await api.trendingMovies();
        setMoviesData(data.results);
        const trailers = {};
        await Promise.all(
          data.results.map(async (movie) => {
            const trailerData = await api.movieTrailer(movie.id);

            if (trailerData.results && Array.isArray(trailerData.results)) {
              const trailer = trailerData.results.find(
                (item) => item.type === "Trailer",
              );
              if (trailer) {
                const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
                trailers[movie.id] = trailerUrl;
              }
            } else {
              console.error("Unexpected trailerData structure:", trailerData);
            }
          }),
        );
        setMovieTrailers(trailers);
      } catch (error) {
        const errorMsg = "An error occurred. Please try again later.";
        toast.error(errorMsg, {
          duration: 5000,
        });
      }
    }
    fetchTrendingMovies();
  }, []);

  const handleShowMore = () => {
    setMaxResults(maxResults + 3);
  };

  return (
    <div data-testid="movie-list">
      <div className="trending-movie-title">
        Trending Movies In The Last Day
      </div>
      {moviesData.slice(0, maxResults).map((data) => (
        <div key={data.id} className="trending-item">
          <TrendingMovie
            title={data.title}
            posterpath={data.poster_path}
            movieId={data.id}
            homepage={data.homepage}
            movieTrailer={movieTrailers[data.id]}
          />
        </div>
      ))}
      {maxResults < moviesData.length && (
        <button
          type="button"
          className="show-more-button"
          onClick={handleShowMore}
        >
          <FontAwesomeIcon
            icon={faCircleChevronDown}
            size="2xl"
            style={{ color: "#393E46" }}
          />
        </button>
      )}
    </div>
  );
}

export default TrendingMoviesContainer;
