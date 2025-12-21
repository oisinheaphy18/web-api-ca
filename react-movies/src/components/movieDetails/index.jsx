import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Drawer from "@mui/material/Drawer";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import MovieReviews from "../movieReviews";
import { Link } from "react-router-dom";

// Part 1 — use movie credits endpoint to show cast
import { getMovieCredits } from "../../api/tmdb-api";

// Part 3 — nicer runtime formatting for display
import { formatRuntime } from "../../util";

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cast, setCast] = useState([]);

  // Part 1 — fetch cast for this movie (parameterised by movie.id)
  useEffect(() => {
    if (movie && movie.id) {
      getMovieCredits(movie.id)
        .then((data) => {
          if (data && data.cast) {
            setCast(data.cast.slice(0, 5));
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [movie]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              {movie.title}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {movie.overview}
            </Typography>

            <Typography variant="body2">Release: {movie.release_date}</Typography>

            <Typography variant="body2">Rating: {movie.vote_average}</Typography>

            {/* Part 3 — show runtime as “H h M m” */}
            {movie.runtime ? (
              <Typography variant="body2">
                Runtime: {formatRuntime(movie.runtime)}
              </Typography>
            ) : null}

            <Box sx={{ mt: 2 }}>
              <Chip
                label="Production Countries"
                color="primary"
                sx={{ mr: 1, mb: 1 }}
              />
              {(movie.production_countries || []).map((c) => (
                <Chip
                  key={c.iso_3166_1 + c.name}
                  label={c.name}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            {/* Part 1 — list top cast with links to each person page */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Top Cast
              </Typography>
              <ul style={{ paddingLeft: "1rem" }}>
                {cast.map((actor) => (
                  <li key={actor.cast_id}>
                    <Link to={`/person/${actor.id}`}>
                      {actor.name} as {actor.character}
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{ position: "fixed", bottom: "1em", right: "1em" }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
