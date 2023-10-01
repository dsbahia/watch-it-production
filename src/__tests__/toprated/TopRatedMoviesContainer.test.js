import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TopRatedMoviesContainer from "../../components/TopRated/TopRatedMoviesContainer";

describe("TopRatedMoviesContainer", () => {
  it("should render without errors", () => {
    render(
      <MemoryRouter>
        <TopRatedMoviesContainer />
      </MemoryRouter>,
    );
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TopRatedMoviesContainer />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays a list of top rated movies", async () => {
    render(
      <MemoryRouter>
        <TopRatedMoviesContainer />
      </MemoryRouter>,
    );

    const movieList = await screen.findByTestId("movie-list");

    expect(movieList).toBeInTheDocument();
  });
});
