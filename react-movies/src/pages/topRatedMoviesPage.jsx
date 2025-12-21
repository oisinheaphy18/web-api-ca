// Part 1 — new page that consumes the Top Rated endpoint
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTopRatedMovies } from "../api/tmdb-api";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const TopRatedMoviesPage = () => {
  // Part 1 — load Top Rated movies with React Query
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["toprated"],
    queryFn: getTopRatedMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  // TMDB returns { results: [...] }
  const movies = data.results;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      // reuse add-to-watchlist icon
      action={(movie) => <PlaylistAdd movie={movie} />}
    />
  );
};

export default TopRatedMoviesPage;
