import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

function YouTubeIcon({ size = "4x" }) {
  return (
    <FontAwesomeIcon
      icon={faYoutube}
      size={size}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "red",
      }}
    />
  );
}

export default YouTubeIcon;
