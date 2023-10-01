import React from "react";
import { render } from "@testing-library/react";
import TrendingMovie from "../components/trending/TrendingMovies";

describe("TrendingMovie", () => {
  it("renders with correct title and poster", () => {
    const title = "Test Movie";
    const posterpath = "test.jpg";
    const { getByText, getByAltText } = render(
      <TrendingMovie title={title} posterpath={posterpath} />,
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByAltText(`${title} Movie poster`)).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${posterpath}`,
    );
  });

  it("matches snapshot", () => {
    const title = "Test Movie";
    const posterpath = "test.jpg";
    const { asFragment } = render(
      <TrendingMovie title={title} posterpath={posterpath} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
