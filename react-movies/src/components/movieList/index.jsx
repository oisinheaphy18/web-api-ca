import React from "react";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";

const MovieList = ({ movies, action, badgeText }) => {
  return (
    <Grid container spacing={5}>
      {/* Part 3 — forward `badgeText` into each MovieCard */}
      {movies.map((m) => (
        <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MovieCard movie={m} action={action} badgeText={badgeText} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
