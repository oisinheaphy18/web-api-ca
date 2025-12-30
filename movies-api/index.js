// tasky-api/index.js
// ===== CA2: Movies API + Reviews API wiring =====
// added router mounts for movies + reviews so React can fetch via my own API instead of TMDB directly

import dotenv from 'dotenv';
dotenv.config(); // load env before any db/module reads it

import express from 'express';
import cors from 'cors';

// IMPORTANT: db import must happen after dotenv.config() in ESM projects
await import('./db/index.js');

import usersRouter from './api/users/index.js';
import moviesRouter from './api/movies/index.js';
import reviewsRouter from './api/reviews/index.js';

const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// simple root route
app.get('/', (req, res) => {
  res.status(200).send('Movies API running. Try /api/movies/discover');
});

app.use('/api/users', usersRouter);

// movie routes
app.use('/api/movies', moviesRouter);

// reviews routes (protected where needed)
app.use('/api/reviews', reviewsRouter);

app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
