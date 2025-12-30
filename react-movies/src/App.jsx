import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SiteHeader from "./components/siteHeader";
import HomePage from "./pages/homePage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";

import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import MyReviewsPage from "./pages/myReviewsPage";

import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/toprated" element={<TopRatedMoviesPage />} />

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
