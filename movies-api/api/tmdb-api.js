import fetch from 'node-fetch';

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

export const getDiscoverMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB discover request failed');
  }

  return await response.json();
};

export const getUpcomingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB upcoming request failed');
  }

  return await response.json();
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB top rated request failed');
  }

  return await response.json();
};

export const getGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB genres request failed');
  }

  return await response.json();
};

export const getMovieById = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    await throwTmdbError(response, 'TMDB movie details request failed');
  }

  return await response.json();
};
