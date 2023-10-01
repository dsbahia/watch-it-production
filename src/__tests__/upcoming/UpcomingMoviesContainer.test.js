import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UpcomingMoviesContainer from "../../components/Upcoming/UpcomingMoviesContainer";

describe("UpcomingMoviesContainer", () => {
  it("should render without errors", () => {
    render(
      <MemoryRouter>
        <UpcomingMoviesContainer />
      </MemoryRouter>,
    );
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpcomingMoviesContainer />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays a list of upcoming movies", async () => {
    render(
      <MemoryRouter>
        <UpcomingMoviesContainer />
      </MemoryRouter>,
    );

    const movieList = await screen.findByTestId("movie-list");

    expect(movieList).toBeInTheDocument();
  });
});
