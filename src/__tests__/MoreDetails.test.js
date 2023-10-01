import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import MoreDetails from "../components/MoreDetails";

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

jest.mock("../api/api", () => ({
  searchMovieById: jest.fn(() =>
    Promise.resolve({
      overview: "Mock Movie Overview",
      budget: 10000000,
      revenue: 50000000,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
      ],
      release_date: "2023-09-22",
      vote_average: 7.5,
      last_episode_to_air: { runtime: 60 },
    }),
  ),
}));
describe("MoreDetails", () => {
  const { asFragment } = render(<MoreDetails type="movie" id={123} />);

  it("renders  correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders data", async () => {
    const mockMovieData = {
      overview: "Mock Movie Overview",
      budget: 10000000,
      revenue: 50000000,
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
      ],
      release_date: "2023-09-22",
      vote_average: 7.5,
      last_episode_to_air: { runtime: 60 },
    };
    jest.mock("../api/api", () => ({
      searchMovieById: jest.fn(() =>
        Promise.resolve({
          overview: "Mock Movie Overview",
          budget: 10000000,
          revenue: 50000000,
          genres: [
            { id: 1, name: "Action" },
            { id: 2, name: "Adventure" },
          ],
          release_date: "2023-09-22",
          vote_average: 7.5,
          last_episode_to_air: { runtime: 60 },
        }),
      ),
    }));

    require("../api/api").searchMovieById.mockResolvedValueOnce(mockMovieData);

    render(<MoreDetails type="movie" id={1} />);

    await waitFor(() => {
      const overviewElement = screen.getByText("Mock Movie Overview");
      const budgetElement = screen.getByText("Budget: $ 10,000,000");
      const revenueElement = screen.getByText("Revenue: $ 50,000,000");
      const genresElement = screen.getByText("Genres:");
      const runtimeElement = screen.getByText("Runtime: 60 Minutes");

      expect(overviewElement).toBeInTheDocument();
      expect(budgetElement).toBeInTheDocument();
      expect(revenueElement).toBeInTheDocument();
      expect(genresElement).toBeInTheDocument();
      expect(runtimeElement).toBeInTheDocument();
    });
  });
});
