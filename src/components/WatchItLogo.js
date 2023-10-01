import React from "react";
import { useNavigate } from "react-router-dom";
import watchItLogo from "../images/watch-it.png";

function WatchItLogo() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <a href="/" onClick={handleClick}>
      <img className="watch-it-logo" src={watchItLogo} alt="Watch It Logo" />
    </a>
  );
}

export default WatchItLogo;
