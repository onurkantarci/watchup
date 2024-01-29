import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ movie, handleAddToList }) => {
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
    <div className="searched-movies">
      <Link to={`/movies/${movie.id}`}>
        {imagePath && <img src={imagePath} width={300} alt={movie.title} />}
      </Link>

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

export default SearchItem;
