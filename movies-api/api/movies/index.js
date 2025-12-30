import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  getDiscoverMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getGenres,
  getMovieById
} from '../tmdb-api.js';

const router = express.Router();

// movie routes to be added

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

router.get('/:id', asyncHandler(async (req, res) => {
  const movie = await getMovieById(req.params.id);
  res.status(200).json(movie);
}));

export default router;
