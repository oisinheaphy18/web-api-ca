import React, { useState } from "react";
import Header from "../headerMovieList";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import FilterCard from "../filterMoviesCard";

const TemplateMovieListPage = ({ title, movies, action, badgeText }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    if (type === "genre") setGenreFilter(value);
  };

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
        <FilterCard
          onUserInput={handleChange}
          titleFilter={nameFilter}
          genreFilter={genreFilter}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9} xl={9}>
        <Header title={title} />
        {/* Part 3 — forward optional badge text to cards (e.g., “Trending”) */}
        <MovieList movies={displayedMovies} action={action} badgeText={badgeText} />
      </Grid>
    </Grid>
  );
};

export default TemplateMovieListPage;
