import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { auth } from "./Registration/firebase";
import { AuthProvider } from "./Registration/AuthContext";
import Register from "./Registration/Register";
import VerifyEmail from "./Registration/VerifyEmail";
import Login from "./Registration/Login";
import Homepage from "./Homepage";
import SearchResultsCard from "./Search/SearchResultsCard";
import TopRatedMoviesContainer from "./TopRated/TopRatedMoviesContainer";
import TopRatedTvShowContainer from "./TopRated/TopRatedTvShowContainer";
import UpcomingMoviesContainer from "./Upcoming/UpcomingMoviesContainer";
import AiringTvShowContainer from "./Upcoming/AiringTvShowsContainer";
import "../styles/App.css";
import Profile from "./ProfilePage";

function App() {
  const [searchResults, setSearchResults] = useState({});
  const [showTrending, setShowTrending] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [showTopRated, setShowTopRated] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setShowTrending(false);
  };

  useEffect(() => {
    if (searchResults.results && searchResults.results.length === 0) {
      setShowTrending(true);
      setShowTopRated(true);
    }
  }, [searchResults]);
  return (
    <div className="App">
      <Toaster />{" "}
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Homepage
                handleSearchResults={handleSearchResults}
                searchResults={searchResults}
              />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/top-rated-movies"
            element={<TopRatedMoviesContainer />}
          />
          <Route
            path="/top-rated-tv-shows"
            element={<TopRatedTvShowContainer />}
          />
          <Route
            path="/upcoming-movies"
            element={<UpcomingMoviesContainer />}
          />
          <Route path="/airing-tv-shows" element={<AiringTvShowContainer />} />

          <Route
            path="/search"
            element={<SearchResultsCard results={searchResults.results} />}
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}
export default App;
