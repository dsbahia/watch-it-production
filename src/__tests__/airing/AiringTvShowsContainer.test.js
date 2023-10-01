import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AiringTvShowContainer from "../../components/Upcoming/AiringTvShowsContainer";

describe("AiringTvShowsContainer", () => {
  it("should render without errors", () => {
    render(
      <MemoryRouter>
        <AiringTvShowContainer />
      </MemoryRouter>,
    );
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AiringTvShowContainer />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays a list of top rated movies", async () => {
    render(
      <MemoryRouter>
        <AiringTvShowContainer />
      </MemoryRouter>,
    );
    const movieList = await screen.findByTestId("tv-list");

    expect(movieList).toBeInTheDocument();
  });
});
