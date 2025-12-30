import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../contexts/authContext";
import Spinner from "../components/spinner";
import { deleteMyReview, getMyReviews } from "../api/reviews-api";

const MyReviewsPage = () => {
  const { token } = useContext(AuthContext);

  const { data, error, isPending, isError, refetch } = useQuery({
    queryKey: ["myReviews"],
    queryFn: () => getMyReviews(token),
    retry: 0
  });

  if (isPending) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  const remove = async (movieId) => {
    await deleteMyReview(token, movieId);
    refetch();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>My Reviews</h2>

      {data && data.length > 0 ? (
        <ul>
          {data.map((r) => (
            <li key={r._id} style={{ marginBottom: "0.75rem" }}>
              <div><strong>{r.movieTitle}</strong> (Movie ID: {r.movieId})</div>
              <div>Rating: {r.rating}</div>
              <div>{r.review}</div>
              <button onClick={() => remove(r.movieId)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews saved yet.</p>
      )}
    </div>
  );
};

export default MyReviewsPage;
