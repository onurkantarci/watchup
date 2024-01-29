import React, { useEffect, useRef, useState } from "react";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import headers from "../shared/api";

const MyList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const toastRef = useRef();

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  useEffect(() => {
    const getMovies = () => {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/account/20802055/watchlist/movies?page=${currentPage}`,
        {
          method: "GET",
          headers,
        }
      )
        .then((res) => res.json())
        .then(({ results, total_pages, ...others }) => {
          console.log({ results });
          setMovies(results);
          setTotalPages(total_pages);
          setIsLoading(false);
        })
        .catch((err) => "Error Fetching Data: "(err));
    };
    getMovies();
  }, [currentPage]);

  const removeMovie = (movieId) => {
    const removeMovieRequest = {
      method: "POST",
      headers,
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: false,
      }),
    };

    fetch(
      "https://api.themoviedb.org/3/account/20802055/watchlist",
      removeMovieRequest
    )
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
      })
      .catch((error) => {
        toastRef.current.showToast(
          "error",
          `Couldn't remove movie: ${error.message}`
        );
      });
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handleLatest = () => {
    setCurrentPage(totalPages);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  };

  const movieContent = movies?.map((movie) => (
    <div className="movie">
      <div key={movie.id}>
        <Link to={`/movies/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            width={300}
            alt={movie.title}
          />
        </Link>

        <button onClick={() => removeMovie(movie.id)} className="remove-button">
          X
        </button>
        <Link to={`/movies/${movie.id}`} style={linkStyle}>
          <h2>{movie.title}</h2>
        </Link>
      </div>
    </div>
  ));

  return (
    <div>
      <Toast ref={toastRef} />
      <Pagination
        totalPages={totalPages}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
        currentPage={currentPage}
        handleLatest={handleLatest}
        handleFirst={handleFirst}
      />
      {isLoading ? <p className="loading">Loading Movies..</p> : null}
      <div className="movies-content">{movieContent}</div>
    </div>
  );
};

export default MyList;
