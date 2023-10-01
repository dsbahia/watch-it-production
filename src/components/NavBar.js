import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignInAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import MovieDropDown from "./DropDowns/MovieDropDown";
import TvDropDown from "./DropDowns/TvDropDown";
import { useAuthValue } from "./Registration/AuthContext";
import "../styles/navbar.css";

function NavBar() {
  const { currentUser } = useAuthValue();
  return (
    <div className="navbar">
      <div className="navbar-items">
        <Link className="nav-link" to="/">
          <FontAwesomeIcon icon={faSearch} className="navbar-icon" /> Search
        </Link>
        {!currentUser ? (
          <>
            <Link className="nav-link" to="/register">
              <FontAwesomeIcon icon={faUser} className="navbar-icon" /> Register
            </Link>
            <Link className="nav-link" to="/login">
              <FontAwesomeIcon icon={faSignInAlt} className="navbar-icon" />{" "}
              Login
            </Link>
          </>
        ) : null}

        {currentUser ? (
          <Link className="nav-link" to="/profile">
            <FontAwesomeIcon icon={faUser} className="navbar-icon" /> Profile
          </Link>
        ) : null}

        <MovieDropDown />
        <TvDropDown />
      </div>
    </div>
  );
}

export default NavBar;
