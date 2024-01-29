import React, { useState, useEffect } from "react";
import ContentList from "../components/ContentList";
import Pagination from "../components/Pagination";
import headers from "../shared/api";

const MainPage = () => {
  const [movies, setMovies] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const getMovies = () => {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/trending/movie/day?page=${currentPage}`,
        {
          method: "GET",
          headers,
        }
      )
        .then((res) => res.json())
        .then(({ results, total_pages }) => {
          setMovies(results);
          setTotalPages(total_pages);
          setIsLoading(false);
        })
        .catch((err) => "Error Fetching Data: "(err));
    };

    getMovies();
  }, [currentPage]);

  return (
    <div className="MainPage">
      <Pagination
        totalPages={totalPages}
        handlePrevClick={handlePrevClick}
        handleNextClick={handleNextClick}
        currentPage={currentPage}
        handleLatest={handleLatest}
        handleFirst={handleFirst}
      />
      {isLoading ? <p className="loading">Loading Movies..</p> : null}
      {movies && <ContentList movies={movies} />}
    </div>
  );
};

export default MainPage;
