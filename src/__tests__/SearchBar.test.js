import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../components/Search/SearchBar";

describe("SearchBar", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>,
  );

  it("renders  correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("updates the value when user types", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
    const inputElement = getByTestId("search-input");

    fireEvent.change(inputElement, { target: { value: "test input" } });
    expect(inputElement.value).toBe("test input");
  });
});
