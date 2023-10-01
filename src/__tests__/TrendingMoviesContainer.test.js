import React from "react";
import { render, screen } from "@testing-library/react";
import TrendingMoviesContainer from "../components/trending/TrendingMoviesContainer";

describe("TrendingMoviesContainer Component", () => {
  it("should render without errors", () => {
    render(<TrendingMoviesContainer />);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<TrendingMoviesContainer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays a list of trending movies", async () => {
    render(<TrendingMoviesContainer />);

    const movieList = await screen.findByTestId("movie-list");

    expect(movieList).toBeInTheDocument();
  });
});
