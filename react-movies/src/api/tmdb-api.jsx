// tmdb-api.jsx
// Talks to TMDB and returns data to the rest of the app.

const handleResponse = (response) => {
  if (!response.ok) {
    return response.text().then((text) => {
      let message = "Something went wrong";
      try {
        const error = JSON.parse(text);
        message = error.status_message || error.message || error.error || message;
      } catch (e) {
        if (text) message = text;
      }
      throw new Error(message);
    });
  }
  return response.json();
};

export const getMovies = () => {
  return fetch(`/api/movies/discover`).then(handleResponse);
};

export const getUpcomingMovies = () => {
  return fetch(`/api/movies/upcoming`).then(handleResponse);
};

// Part 1 — new endpoint: “Trending Today” list (static-style feed)
export const getTrendingToday = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then(handleResponse);
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}`).then(handleResponse);
};

export const getGenres = () => {
  return fetch(`/api/movies/genres`).then(handleResponse);
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then(handleResponse);
};

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then(handleResponse);
};

// ------------------------------------------------------------
// Part 1 — new endpoint: Top Rated (static list for a new page)
// ------------------------------------------------------------
export const getTopRatedMovies = () => {
  return fetch(`/api/movies/toprated`).then(handleResponse);
};

// ------------------------------------------------------------
// Part 1 — new parameterised endpoint: movie credits (cast)
// ------------------------------------------------------------
export const getMovieCredits = (movieId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(handleResponse);
};

// ------------------------------------------------------------
// Part 1 — new parameterised endpoints: person details + credits
// ------------------------------------------------------------
export const getPersonDetails = (personId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${personId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then(handleResponse);
};

export const getPersonMovieCredits = (personId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then(handleResponse);
};
