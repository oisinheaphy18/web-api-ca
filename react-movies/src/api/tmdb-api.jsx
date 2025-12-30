// tmdb-api.jsx
// Talks to my Movies API (which talks to TMDB) and returns data to the rest of the app.

// ===== CA2: Movies API integration =====
// updated API calls so React pulls core movie data via my Express Movies API instead of calling TMDB directly

const handleResponse = (response) => {
  if (!response.ok) {
    return response.text().then((text) => {
      let message = "Something went wrong";
      try {
        const error = JSON.parse(text);
        message = error.status_message || error.message || error.msg || error.error || message;
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

export const getTopRatedMovies = () => {
  return fetch(`/api/movies/toprated`).then(handleResponse);
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}`).then(handleResponse);
};

export const getGenres = () => {
  return fetch(`/api/movies/genres`).then(handleResponse);
};

// NOTE: these were calling TMDB directly before.
// once the matching endpoints are added to my movies-api, these will be switched to /api/movies/* routes too.

export const getTrendingToday = () => {
  return fetch(`/api/movies/trending`).then(handleResponse);
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}/images`).then(handleResponse);
};

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(`/api/movies/${id}/reviews`).then(handleResponse);
};

export const getMovieCredits = (movieId) => {
  return fetch(`/api/movies/${movieId}/credits`).then(handleResponse);
};

export const getPersonDetails = (personId) => {
  return fetch(`/api/movies/person/${personId}`).then(handleResponse);
};

export const getPersonMovieCredits = (personId) => {
  return fetch(`/api/movies/person/${personId}/movie_credits`).then(handleResponse);
};
