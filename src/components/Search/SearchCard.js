import React, { useEffect, useState } from "react";
import "../../styles/searchcard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import YouTubeIcon from "../YouTubeIcon/YouTubeIcon";
import MoreDetails from "../MoreDetails";
import Favourite from "../Favourite";
import NoImagePlaceholder from "../../images/No-Image-Placeholder.png";
import api from "../../api/api";

function SearchCard({ title, posterpath, movieId }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState([]);
  const movie = "movie";

  useEffect(() => {
    const posterClick = async () => {
      try {
        const response = await api.movieTrailer(movieId);
        const trailer = response.results.find(
          (video) => video.type === "Trailer",
        );

        if (trailer) {
          const videoUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
          setTrailerUrl(videoUrl);
        } else {
          setTrailerUrl("");
        }
      } catch (error) {
        const errorMsg = "An error occurred. Please try again later.";
        toast.error(errorMsg, {
          duration: 5000,
        });
      }
    };
    posterClick();
  }, [movieId]);

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  const posterCheck = () => {
    if (posterpath === null) {
      return NoImagePlaceholder;
    }
    return `https://image.tmdb.org/t/p/original/${posterpath}`;
  };

  return (
    <div className="search-card">
      <div className="poster-card">
        {" "}
        {trailerUrl ? (
          <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
            <img
              className="poster-img"
              alt={`${title} Movie poster`}
              src={posterCheck()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {isHovered && <YouTubeIcon />}
          </a>
        ) : (
          <img
            className="poster-img"
            alt={`${title} Movie poster`}
            src={posterCheck()}
          />
        )}
      </div>
      <div className="title-card">{title}</div>
      <div className="more-details">
        <div className="buttons">
          <div className="favourites">
            <Favourite />
          </div>
          <button
            className="more-details-link"
            type="button"
            onClick={handleClick}
          >
            More Details
            <FontAwesomeIcon icon={faInfoCircle} className="icon" />
          </button>
        </div>
        {isShown ? <MoreDetails type={movie} id={movieId} /> : null}
      </div>
    </div>
  );
}

export default SearchCard;
