import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../styles/moredetails.css";
import api from "../api/api";

function MoreDetails({ type, id }) {
  const [moviesData, setMoviesData] = useState(false);

  useEffect(() => {
    async function fetchMovieById() {
      try {
        const data = await api.searchMovieById(type, id);
        setMoviesData(data);
      } catch (error) {
        const errorMsg = "An error occurred. Please try again later.";
        toast.error(errorMsg, {
          duration: 5000,
        });
      }
    }
    fetchMovieById();
  }, [type, id]);

  if (moviesData === null) {
    return <div>Loading...</div>;
  }

  const genresList = moviesData.genres
    ? moviesData.genres.map((genre) => <div key={genre.id}>{genre.name}</div>)
    : [];
  const lastEpisodeRuntime = moviesData.last_episode_to_air
    ? `${moviesData.last_episode_to_air.runtime} Minutes`
    : `${moviesData.runtime} minutes`;
  const budgetCheck =
    moviesData.budget != null
      ? `Budget: $ ${moviesData.budget.toLocaleString()}`
      : "Budget information not available";
  const revenueCheck =
    moviesData.revenue != null
      ? `Revenue: $ ${moviesData.revenue.toLocaleString()}`
      : "Revenue information not available";
  const releaseDateCheck = moviesData.first_air_date
    ? `First Episode Release Date: ${moviesData.first_air_date}`
    : `Release  Date: ${moviesData.release_date}`;

  function renderRatingStars(rating) {
    const maxRating = 10;
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);

    const starIcons = Array.from(
      { length: fullStars + (halfStar ? 1 : 0) + emptyStars },
      (_, index) => {
        if (index < fullStars) {
          return (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              style={{ color: "green" }}
            />
          );
        }
        if (index === fullStars && halfStar) {
          return (
            <FontAwesomeIcon
              key="half"
              icon={faStar}
              style={{ color: "yellow" }}
            />
          );
        }
        return (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            style={{ color: "gray" }}
          />
        );
      },
    );

    return starIcons;
  }

  const rating = Math.round(moviesData.vote_average * 10) / 10;
  const ratingStars = renderRatingStars(rating);

  return (
    <div className="more-details-container">
      <div className="more-details-overview">{moviesData.overview}</div>
      <div className="more-details-item">{budgetCheck}</div>
      <div className="more-details-item">{revenueCheck}</div>
      <div className="more-details-item">
        Genres:
        <div>{genresList}</div>
      </div>
      <div className="more-details-item">{releaseDateCheck}</div>
      <div className="more-details-item">Rating: {ratingStars}</div>
      <div className="more-details-item">Runtime: {lastEpisodeRuntime}</div>
    </div>
  );
}

export default MoreDetails;
