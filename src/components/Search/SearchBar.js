import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/api";
import "../../styles/searchbar.css";

function SearchBar({ setSearchResults }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (value.trim() === "") {
      const errorMsg = "Please enter a valid search term.";
      toast.error(errorMsg, {
        duration: 5000,
      });
      return;
    }

    const data = await api.searchMovies(value);
    if (data === null) {
      const errorMsg = "An error occurred. Please try again later.";
      toast.error(errorMsg, {
        duration: 5000,
      });
    } else {
      setSearchResults(data);

      navigate("/search");
    }
  };

  return (
    <div className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          onChange={(e) => setValue(e.target.value)}
          data-testid="search-input"
        />
        <button className="search-button" type="submit">
          Go!
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
