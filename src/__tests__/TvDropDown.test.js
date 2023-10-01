import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TvDropDown from "../components/DropDowns/TvDropDown";

describe("TvDropdown", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<TvDropDown />);
    expect(asFragment).toMatchSnapshot();
  });

  it("displays 'Tv Shows' title", () => {
    const { getByText } = render(<TvDropDown />);
    expect(getByText("Tv Shows")).toBeInTheDocument();
  });

  it("displays dropdowns with correct paths", () => {
    const { getByTestId, getByText } = render(<TvDropDown />);
    const dropdownButton = getByText("Tv Shows");

    fireEvent.click(dropdownButton);

    const topRated = getByTestId("top-rated-link");
    const airing = getByTestId("airing-link");

    expect(topRated).toHaveAttribute("href", "/top-rated-tv-shows");
    expect(airing).toHaveAttribute("href", "/airing-tv-shows");
  });
});
