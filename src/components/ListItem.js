import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ListItem = ({ movie, handleAddToList }) => {
  const [imagePath, setImagePath] = useState(null);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  useEffect(() => {
    if (movie.poster_path) {
      setImagePath(`https://image.tmdb.org/t/p/original${movie.poster_path}`);
    }
  }, [movie.poster_path]);

  return (
    <div className="movie">
      {imagePath && (
        <Link to={`/movies/${movie.id}`}>
          <img className="img" src={imagePath} width={300} alt={movie.title} />
        </Link>
      )}

      <button
        onClick={() => {
          handleAddToList(movie.id);
        }}
        className="add-to-list"
      >
        Add to watchlist
      </button>
      <Link to={`/movies/${movie.id}`} style={linkStyle}>
        {movie.title}
      </Link>
    </div>
  );
};

export default ListItem;
