import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TopRatedMovies from "../../components/TopRated/TopRatedMovies";

jest.mock("../../components/MoreDetails", () => {
  return function MockMoreDetails() {
    return <div>MockMoreDetails Component</div>;
  };
});

describe("TopRatedMovies", () => {
  it("renders correctly", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "test movie",
      movieId: 1,
    };
    const { asFragment } = render(<TopRatedMovies {...props} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("displays movie title and posterpath correctly", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "Test Movie",
      movieId: 1,
    };

    const { getByText, getByAltText } = render(<TopRatedMovies {...props} />);
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
    const { getByText, queryByText } = render(<TopRatedMovies {...props} />);
    const moreDetailsButton = getByText("More Details");

    expect(queryByText("MockMoreDetails Component")).toBeNull();

    fireEvent.click(moreDetailsButton);

    expect(queryByText("MockMoreDetails Component")).toBeInTheDocument();
  });
});
