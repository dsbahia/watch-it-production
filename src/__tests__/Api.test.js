import api from "../api/api";

jest.mock("axios");
jest.mock("../api/api");

describe("API Functions", () => {
  it("should search movies using a query", async () => {
    const query = "Star Wars";
    const starWarsData = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: "/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg",
          genre_ids: [12, 28, 878],
          id: 11,
          original_language: "en",
          original_title: "Star Wars",
          overview:
            "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
          popularity: 80.112,
          poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
          release_date: "1977-05-25",
          title: "Star Wars",
          video: false,
          vote_average: 8.204,
          vote_count: 19129,
        },
      ],
    };

    api.searchMovies.mockResolvedValue(starWarsData);
    const result = await api.searchMovies(query);
    expect(result).toEqual(starWarsData);
  });

  it("fetches trending movies successfully", async () => {
    const movieData = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: "/H6j5smdpRqP9a8UnhWp6zfl0SC.jpg",
          id: 565770,
          title: "Blue Beetle",
          original_language: "en",
          original_title: "Blue Beetle",
          overview:
            "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
          poster_path: "/vNfL4DYnonltukBrrgMmw94zMYL.jpg",
          media_type: "movie",
          genre_ids: [28, 878, 12],
          popularity: 1007.105,
          release_date: "2023-08-16",
          video: false,
          vote_average: 7.1,
          vote_count: 581,
        },
      ],
    };

    api.trendingMovies.mockResolvedValue(movieData);
    const response = await api.trendingMovies();
    expect(response).toEqual(movieData);
  });
});
