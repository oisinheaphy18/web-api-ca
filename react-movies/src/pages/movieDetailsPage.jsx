import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const MoviePage = () => {
  const { id } = useParams();

  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ["movie", { id: id }],
    queryFn: getMovie,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  // Part 1: Extend the App - MovieDetails component will now ALSO
  // show a "Top Cast" section and link to each actor's page.
  // That new cast code lives inside MovieDetails/index.jsx.

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} />
        </PageTemplate>
      ) : null}
    </>
  );
};

export default MoviePage;
