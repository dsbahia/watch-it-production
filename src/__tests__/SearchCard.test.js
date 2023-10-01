import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchCard from "../components/Search/SearchCard";

describe("SearchCard", () => {
  const title = "Guardians of the Galaxy";
  const posterpath =
    "https://image.tmdb.org/t/p/w92//r2J02Z2OpNTctfOSN1Ydgii51I3.jpg";

  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SearchCard title={title} posterpath={posterpath} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays component with provided props", () => {
    const { getByText, getByAltText } = render(
      <MemoryRouter>
        <SearchCard title={title} posterpath={posterpath} />
      </MemoryRouter>,
    );

    const posterImage = getByAltText(`${title} Movie poster`);

    expect(getByText(title)).toBeInTheDocument();
    expect(getByAltText(`${title} Movie poster`)).toBeInTheDocument();
    expect(posterImage).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${posterpath}`,
    );
  });
});
