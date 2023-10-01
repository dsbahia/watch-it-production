import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AiringTvShows from "../../components/Upcoming/AiringTvShows";

jest.mock("../../components/MoreDetails", () => {
  return function MockMoreDetails() {
    return <div>MockMoreDetails Component</div>;
  };
});

describe("AiringTvShows", () => {
  it("renders correctly", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "Test Tv Show",
      TvId: 1,
    };
    const { asFragment } = render(<AiringTvShows {...props} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("displays tv show title and posterpath correctly", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "Test Tv Show",
      TvId: 1,
    };

    const { getByText, getByAltText } = render(<AiringTvShows {...props} />);
    expect(getByText("Test Tv Show")).toBeInTheDocument();
    expect(getByAltText(`${props.title} Tv Show poster`)).toHaveAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${props.posterpath}`,
    );
  });

  it("toggles More Details on click", () => {
    const props = {
      posterpath: "posterpath.jpg",
      title: "Test Tv Show",
      TvId: 1,
    };
    const { getByText, queryByText } = render(<AiringTvShows {...props} />);
    const moreDetailsButton = getByText("More Details");

    expect(queryByText("MockMoreDetails Component")).toBeNull();

    fireEvent.click(moreDetailsButton);

    expect(queryByText("MockMoreDetails Component")).toBeInTheDocument();
  });
});
