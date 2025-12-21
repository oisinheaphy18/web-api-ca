// Part 1 — new page that consumes the “Trending Today” feed
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTrendingToday } from "../api/tmdb-api";
import PlaylistAdd from "../components/cardIcons/playlistAdd";

const TrendingTodayPage = () => {
  // Part 1 — load trending list with React Query
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingToday,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Today"
      movies={movies}
      action={(movie) => <PlaylistAdd movie={movie} />}
      // Part 1 — simple visual cue for this new page
      badgeText="Trending"
    />
  );
};

export default TrendingTodayPage;
