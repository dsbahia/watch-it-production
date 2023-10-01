import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import TopRatedMovies from "./TopRatedMovies";
import api from "../../api/api";
import "../../styles/topratedmoviescontainer.css";
import WatchItLogo from "../WatchItLogo";

function TopRatedMoviesContainer() {
  const [moviesData, setMoviesData] = useState([]);
  const [movieTrailers, setMovieTrailers] = useState({});
  const [maxResults, setMaxResults] = useState(9);

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const data = await api.topRatedMovies();
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
    fetchTopRatedMovies();
  }, []);

  const handleShowMore = () => {
    setMaxResults(maxResults + 6);
  };

  return (
    <div>
      <WatchItLogo />
      <div data-testid="movie-list" className="top-rated-container">
        <div className="top-rated-movie-title">Top Rated Movies</div>
        <div className="top-rated-results">
          {moviesData.slice(0, maxResults).map((data) => (
            <div key={data.id} className="top-rated-item">
              <TopRatedMovies
                title={data.title}
                posterpath={data.poster_path}
                movieId={data.id}
                movieTrailer={movieTrailers[data.id]}
              />
            </div>
          ))}
        </div>
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
    </div>
  );
}

export default TopRatedMoviesContainer;
