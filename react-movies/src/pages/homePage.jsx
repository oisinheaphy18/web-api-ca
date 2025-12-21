// Part 2 — Show both: add to Favourites and add to Watchlist on the home list

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getMovies } from "../api/tmdb-api";

import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const HomePage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      // Part 2 — render both icons on each card
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <PlaylistAdd movie={movie} />
        </>
      )}
    />
  );
};

export default HomePage;
