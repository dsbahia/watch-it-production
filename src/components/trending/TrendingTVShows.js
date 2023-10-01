import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import MoreDetails from "../MoreDetails";
import Favourite from "../Favourite";
import YouTubeIcon from "../YouTubeIcon/YouTubeIcon";
import "../../styles/trending.css";
import NoImagePlaceholder from "../../images/No-Image-Placeholder.png";

function TrendingTVShows({ posterpath, title, tvId, tvshowTrailer }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const type = "tv";

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
    <div className="trending">
      <div className="trending-poster">
        {" "}
        {tvshowTrailer ? (
          <a href={tvshowTrailer} target="_blank" rel="noopener noreferrer">
            <img
              className="trending-poster-img"
              alt={`${title} Tv Show poster`}
              src={posterCheck()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {isHovered && <YouTubeIcon className="youtube-icon" />}
          </a>
        ) : (
          <img
            className="trending-poster-img"
            alt={`${title} Tv Show poster`}
            src={posterCheck()}
          />
        )}
      </div>
      <div className="trending-title">{title}</div>
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
        {isShown ? <MoreDetails type={type} id={tvId} /> : null}
      </div>
    </div>
  );
}

export default TrendingTVShows;
