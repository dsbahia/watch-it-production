import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { render } from "@testing-library/react";
import { useAuthValue } from "../components/Registration/AuthContext";
import NavBar from "../components/NavBar";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../components/Registration/AuthContext", () => ({
  useAuthValue: jest.fn(),
}));

describe("NavBar", () => {
  it("renders correctly", () => {
    useAuthValue.mockReturnValue({
      currentUser: null,
    });

    const { asFragment } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a link with the correct className", () => {
    useAuthValue.mockReturnValue({
      currentUser: null,
    });
    const { container } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    );
    const linkElement = container.querySelector("a");

    expect(linkElement).toHaveClass("nav-link");
  });

  it("renders the link with the correct route", () => {
    useAuthValue.mockReturnValue({
      currentUser: null,
    });
    const { container } = render(
      <MemoryRouter>
        <Link to="/" className="item-upcoming">
          Upcoming
        </Link>
      </MemoryRouter>,
    );
    const linkElement = container.querySelector("a");

    expect(linkElement).toHaveAttribute("href", "/");
  });
});
