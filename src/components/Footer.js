import React from "react";
import "../styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import tmdbLogo from "../images/tmdb-footer-icon.png";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logo">
          <img src={tmdbLogo} alt="TMDB logo" />
        </div>
        <div className="footer-links">
          <a href="https://github.com/dsbahia/watch-it">
            GitHub <FontAwesomeIcon icon={faGithub} />{" "}
          </a>
        </div>
      </div>
      <p className="tmdb-info">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <p className="team-info">
        Contributors: Dal Bahia, Max Staite and Jonathan Thompson
      </p>
    </footer>
  );
}
export default Footer;
