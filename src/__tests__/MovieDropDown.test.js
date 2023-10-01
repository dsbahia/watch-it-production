import React from "react";
import { fireEvent, render } from "@testing-library/react";
import MovieDropDown from "../components/DropDowns/MovieDropDown";

describe("MovieDropdown", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<MovieDropDown />);
    expect(asFragment).toMatchSnapshot();
  });

  it("displays 'Movies' title", () => {
    const { getByText } = render(<MovieDropDown />);
    expect(getByText("Movies")).toBeInTheDocument();
  });

  it("displays dropdowns with correct paths", () => {
    const { getByTestId, getByText } = render(<MovieDropDown />);
    const dropdownButton = getByText("Movies");

    fireEvent.click(dropdownButton);

    const topRated = getByTestId("top-rated-link");
    const upcoming = getByTestId("upcoming-link");

    expect(topRated).toHaveAttribute("href", "/top-rated-movies");
    expect(upcoming).toHaveAttribute("href", "/upcoming-movies");
  });
});
