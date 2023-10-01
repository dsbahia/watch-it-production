import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";
import watchItLogo from "../images/watch-it.png";

describe("App", () => {
  it("Renders Correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Displays NavBar Correctly", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const registerLink = screen.getByText("Register");
    const loginLink = screen.getByText("Login");
    const moviesLink = screen.getByText("Movies");
    const tvShowsLink = screen.getByText("Tv Shows");

    expect(registerLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(moviesLink).toBeInTheDocument();
    expect(tvShowsLink).toBeInTheDocument();
  });

  it("Displays App Logo", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const logoElement = screen.getByAltText("Watch It Logo");
    expect(logoElement).toBeInTheDocument();

    await waitFor(() => {
      expect(logoElement.src).toContain(watchItLogo);
    });
  });

  it("Displays Search Component", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText("Search");
    const searchButton = screen.getByText("Go!");

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
