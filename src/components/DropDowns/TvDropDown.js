import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function TvDropDown() {
  return (
    <DropdownButton id="item-tv-dropdown" title="Tv Shows">
      <Dropdown.Item data-testid="top-rated-link" href="/top-rated-tv-shows">
        Top Rated
      </Dropdown.Item>
      <Dropdown.Item data-testid="airing-link" href="/airing-tv-shows">
        Airing
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default TvDropDown;
