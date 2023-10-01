import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function MovieDropDown() {
  return (
    <DropdownButton id="item-movie-dropdown" title="Movies">
      <Dropdown.Item data-testid="top-rated-link" href="/top-rated-movies">
        Top Rated
      </Dropdown.Item>
      <Dropdown.Item data-testid="upcoming-link" href="/upcoming-movies">
        Upcoming
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default MovieDropDown;
