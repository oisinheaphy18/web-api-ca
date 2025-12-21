import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

const MovieCard = ({ movie, action, badgeText }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "/placeholder.png";

  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* Part 3 — optional small banner at the top of the card */}
      {badgeText ? (
        <div
          style={{
            backgroundColor: "#ab47bc",
            color: "white",
            fontSize: "0.8rem",
            fontWeight: "bold",
            padding: "4px 8px",
          }}
        >
          {badgeText}
        </div>
      ) : null}

      <Link to={`/movies/${movie.id}`}>
        <CardMedia
          sx={{ height: 500 }}
          image={posterUrl}
          title={movie.title}
        />
      </Link>

      <CardContent>
        <Typography variant="h6" component="p">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {action ? action(movie) : null}
      </CardActions>
    </Card>
  );
};

export default MovieCard;
