// ===== CA2: Another API (Reviews API) =====
// added a Mongo-backed reviews API with user-specific protected routes + movie-based public fetch

import express from 'express';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';
import Review from './reviewModel.js';

const router = express.Router();

// public: get reviews for a movie
router.get('/movie/:id', asyncHandler(async (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  if (Number.isNaN(movieId)) {
    res.status(400).json({ message: 'movie id must be a number' });
    return;
  }

  const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
  res.status(200).json(reviews);
}));

// protected: get reviews for logged-in user
router.get('/user', authenticate, asyncHandler(async (req, res) => {
  const userName = req.user.username;
  const reviews = await Review.find({ userName }).sort({ createdAt: -1 });
  res.status(200).json(reviews);
}));

// protected: create or update a review for the logged-in user + movie
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const userName = req.user.username;

  const movieId = Number(req.body.movieId);
  const movieTitle = req.body.movieTitle || '';
  const rating = Number(req.body.rating);
  const review = req.body.review || '';

  if (!movieId || Number.isNaN(movieId)) {
    res.status(400).json({ message: 'movieId is required' });
    return;
  }

  if (Number.isNaN(rating)) {
    res.status(400).json({ message: 'rating is required' });
    return;
  }

  const doc = await Review.findOneAndUpdate(
    { userName, movieId },
    { userName, movieId, movieTitle, rating, review },
    { new: true, upsert: true }
  );

  res.status(201).json(doc);
}));

// protected: delete a review for logged-in user
router.delete('/:movieId', authenticate, asyncHandler(async (req, res) => {
  const userName = req.user.username;
  const movieId = parseInt(req.params.movieId, 10);

  if (Number.isNaN(movieId)) {
    res.status(400).json({ message: 'movieId must be a number' });
    return;
  }

  const result = await Review.deleteOne({ userName, movieId });

  // still return 204 for idempotent delete, but this helps debugging
  if (result.deletedCount === 0) {
    res.status(204).end();
    return;
  }

  res.status(204).end();
}));

export default router;
