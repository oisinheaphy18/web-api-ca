// ===== CA2: Movies API (TMDB proxy) =====
// added TMDB helper methods so my server fetches TMDB data and my React app can call my API instead

// using Node's built-in fetch (fixes node-fetch ESM issues on Node 22)

const throwTmdbError = async (response, fallbackMessage) => {
  let message = fallbackMessage;
  try {
    const errorJson = await response.json();
    message = errorJson.status_message || message;
  } catch (e) {
    // ignore
  }
  throw new Error(message);
};

const requireTmdbKey = () => {
  if (!process.env.TMDB_KEY) {
    throw new Error('TMDB_KEY missing in .env');
  }
};

// ------------------------------------------------------------
// CA2: Core movie fetch helpers
// ------------------------------------------------------------
// added helpers used by /api/movies/discover, /upcoming, /toprated, /genres, /:id

export const getDiscoverMovies = async () => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB discover request failed');
  }

  return await response.json();
};

export const getUpcomingMovies = async () => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB upcoming request failed');
  }

  return await response.json();
};

export const getTopRatedMovies = async () => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB top rated request failed');
  }

  return await response.json();
};

export const getGenres = async () => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB genres request failed');
  }

  return await response.json();
};

export const getMovieById = async (id) => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB movie details request failed');
  }

  return await response.json();
};

// ------------------------------------------------------------
// CA2: Expanded Movies API helpers (extra endpoints for higher marks)
// ------------------------------------------------------------
// added extra helpers for trending, images, credits, person pages so React can use my API instead of TMDB directly

export const getTrendingToday = async () => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB trending request failed');
  }

  return await response.json();
};

export const getMovieImages = async (id) => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB movie images request failed');
  }

  return await response.json();
};

export const getMovieCredits = async (id) => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB movie credits request failed');
  }

  return await response.json();
};

export const getMovieReviews = async (id) => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB movie reviews request failed');
  }

  return await response.json();
};

export const getPersonDetails = async (personId) => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB person details request failed');
  }

  return await response.json();
};

export const getPersonMovieCredits = async (personId) => {
  requireTmdbKey();

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.TMDB_KEY}`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB person movie credits request failed');
  }

  return await response.json();
};
