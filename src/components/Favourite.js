import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "../styles/favourite.css";

function Favourite() {
  const [isFav, setIsFav] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const toggleIcon = () => {
    setIsFav(!isFav);
  };

  return (
    <button
      className="fav-btn"
      type="button"
      onClick={toggleIcon}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <FontAwesomeIcon
        icon={isMouseOver ? solidStar : regularStar}
        color={isMouseOver ? "#00ADB5" : "#00ADB5"}
        size="2x"
      />
    </button>
  );
}

export default Favourite;
