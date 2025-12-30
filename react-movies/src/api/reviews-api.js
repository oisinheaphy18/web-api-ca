// ===== CA2: Another API (Reviews) =====
// added fetch helpers for my Reviews API so reviews are stored in Mongo and linked to logged-in users

const handleResponse = (response) => {
  if (!response.ok) {
    return response.text().then((text) => {
      let message = "Something went wrong";
      try {
        const error = JSON.parse(text);
        message = error.message || error.msg || error.error || message;
      } catch (e) {
        if (text) message = text;
      }
      throw new Error(message);
    });
  }
  if (response.status === 204) return null;
  return response.json();
};

export const getMovieReviewsFromApi = (movieId) => {
  return fetch(`/api/reviews/movie/${movieId}`).then(handleResponse);
};

export const getMyReviews = (token) => {
  return fetch(`/api/reviews/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(handleResponse);
};

export const saveMyReview = (token, body) => {
  return fetch(`/api/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  }).then(handleResponse);
};

export const deleteMyReview = (token, movieId) => {
  return fetch(`/api/reviews/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(handleResponse);
};
