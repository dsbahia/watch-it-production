import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchResultsCard from "../components/Search/SearchResultsCard";

jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("SearchResultsCard", () => {
  const results = [
    {
      id: 1,
      title: "The Hunger Games",
      poster_path:
        "https://image.tmdb.org/t/p/original//4FAA18ZIja70d1Tu5hr5cj2q1sB.jpg",
    },
    {
      id: 2,
      title: "Star Wars",
      poster_path:
        "https://image.tmdb.org/t/p/original//6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    },
  ];

  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SearchResultsCard results={results} />
      </MemoryRouter>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  it("renders SearchResultsCard with results", () => {
    render(
      <MemoryRouter>
        <SearchResultsCard results={results} />
      </MemoryRouter>,
    );

    results.forEach((data) => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
      expect(
        screen.getByAltText(`${data.title} Movie poster`),
      ).toBeInTheDocument();
    });
  });

  it("renders nothing if no results", () => {
    render(
      <MemoryRouter>
        <SearchResultsCard results={[]} />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("search-results-card")).toBeNull();
  });
});
