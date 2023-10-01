import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UpcomingMovies from "../../components/Upcoming/UpcomingMovies";

jest.mock("../../components/MoreDetails", () => {
  return function MockMoreDetails() {
    return <div>MockMoreDetails Component</div>;
  };
});

describe("UpcomingMovies", () => {
  it("renders correctly", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "test movie",
      movieId: 1,
    };
    const { asFragment } = render(<UpcomingMovies {...props} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("displays movie title and posterpath correctly", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "Test Movie",
      movieId: 1,
    };

    const { getByText, getByAltText } = render(<UpcomingMovies {...props} />);
    expect(getByText("Test Movie")).toBeInTheDocument();
    expect(getByAltText(`${props.title} Movie poster`)).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${props.posterpath}`,
    );
  });

  it("toggles More Details on click", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "Test Movie",
      movieId: 1,
    };
    const { getByText, queryByText } = render(<UpcomingMovies {...props} />);
    const moreDetailsButton = getByText("More Details");

    expect(queryByText("MockMoreDetails Component")).toBeNull();

    fireEvent.click(moreDetailsButton);

    expect(queryByText("MockMoreDetails Component")).toBeInTheDocument();
  });
});
