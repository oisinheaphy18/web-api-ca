// Part 2 — Remove from Watchlist icon (uses removeFromMustWatch)

import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromWatchlist = ({ movie }) => {
  const { removeFromMustWatch } = useContext(MoviesContext);

  const handleClick = (e) => {
    e.preventDefault();
    removeFromMustWatch(movie);
  };

  return (
    <IconButton aria-label="remove from watchlist" onClick={handleClick}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchlist;
