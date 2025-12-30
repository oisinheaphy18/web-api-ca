import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SiteHeader from "./components/siteHeader";
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";

import TrendingTodayPage from "./pages/trendingTodayPage";
import PersonDetailsPage from "./pages/personDetailsPage";

import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import MyReviewsPage from "./pages/myReviewsPage";

import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import WatchlistPage from "./pages/watchlistPage";
import MovieDetailsPage from "./pages/movieDetailsPage";

import ProtectedRoute from "./components/protectedRoute";

// ===== CA2: Routing + protected routes =====
// added protected routes for user-only pages and added missing routes so header navigation works properly

const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/toprated" element={<TopRatedMoviesPage />} />

        <Route path="/trending" element={<TrendingTodayPage />} />
        <Route path="/person/:id" element={<PersonDetailsPage />} />

        <Route path="/movies/:id" element={<MovieDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/myreviews"
          element={
            <ProtectedRoute>
              <MyReviewsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies/favorites"
          element={
            <ProtectedRoute>
              <FavoriteMoviesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies/watchlist"
          element={
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
