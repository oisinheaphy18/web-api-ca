// ===== CA2: Movies API (expanded endpoints) =====
// added multiple endpoints so the React app can fetch movie data via my own API

import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  getDiscoverMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getGenres,
  getMovieById,
  getTrendingToday,
  getMovieImages,
  getMovieCredits,
  getPersonDetails,
  getPersonMovieCredits
} from '../tmdb-api.js';

const router = express.Router();

// ------------------------------------------------------------
// CA2: Core Movies API endpoints
// ------------------------------------------------------------
// added core movie endpoints so React does not call TMDB directly

router.get('/discover', asyncHandler(async (req, res) => {
  const discoverMovies = await getDiscoverMovies();
  res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  const upcomingMovies = await getUpcomingMovies();
  res.status(200).json(upcomingMovies);
}));

router.get('/toprated', asyncHandler(async (req, res) => {
  const topRatedMovies = await getTopRatedMovies();
  res.status(200).json(topRatedMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));

// ------------------------------------------------------------
// CA2: Additional Movies API endpoints
// ------------------------------------------------------------
// added extra endpoints to show an expanded Movies API for higher marks

router.get('/trending', asyncHandler(async (req, res) => {
  const trending = await getTrendingToday();
  res.status(200).json(trending);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
  const images = await getMovieImages(req.params.id);
  res.status(200).json(images);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
  const credits = await getMovieCredits(req.params.id);
  res.status(200).json(credits);
}));

// ------------------------------------------------------------
// CA2: Person endpoints (cast/crew drill-down)
// ------------------------------------------------------------
// added person endpoints so React can navigate from cast to person pages

router.get('/person/:id', asyncHandler(async (req, res) => {
  const person = await getPersonDetails(req.params.id);
  res.status(200).json(person);
}));

router.get('/person/:id/movie_credits', asyncHandler(async (req, res) => {
  const credits = await getPersonMovieCredits(req.params.id);
  res.status(200).json(credits);
}));

// ------------------------------------------------------------
// CA2: Movie details (keep this last so it does not swallow other routes)
// ------------------------------------------------------------
// added movie details endpoint that uses :id after the more specific routes

router.get('/:id', asyncHandler(async (req, res) => {
  const movie = await getMovieById(req.params.id);
  res.status(200).json(movie);
}));

export default router;
