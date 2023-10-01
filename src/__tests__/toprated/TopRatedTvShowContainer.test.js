import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TopRatedTvShowContainer from "../../components/TopRated/TopRatedTvShowContainer";

describe("TopRatedTvShowContainer", () => {
  it("should render without errors", () => {
    render(
      <MemoryRouter>
        <TopRatedTvShowContainer />
      </MemoryRouter>,
    );
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TopRatedTvShowContainer />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays a list of top rated movies", async () => {
    render(
      <MemoryRouter>
        <TopRatedTvShowContainer />
      </MemoryRouter>,
    );

    const movieList = await screen.findByTestId("tv-list");

    expect(movieList).toBeInTheDocument();
  });
});
