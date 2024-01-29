import React, { useCallback, useEffect, useState } from "react";
import SearchList from "../components/SearchList";
import Pagination from "../components/Pagination";
import headers from "../shared/api";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchedMovies, setSearchedMovies] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  console.log({ test: searchedMovies });

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

  const getMovies = useCallback(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchInput}&page=${currentPage}`,
      {
        method: "GET",
        headers,
      }
    )
      .then((res) => res.json())
      .then(({ results, total_pages, page }) => {
        if (results && results.length > 0) {
          setSearchedMovies(results);
        }
        setTotalPages(total_pages);
        setCurrentPage(page);
        setIsLoading(false);
      });
  }, [searchInput, currentPage]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    getMovies();
  };

  useEffect(() => {
    if (searchInput === "") {
      setSearchedMovies();
    }
  }, [searchInput]);

  return (
    <div>
      <div className="search-movie">
        <input
          type="search"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search a movie..."
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {searchedMovies && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          handleLatest={handleLatest}
          handleFirst={handleFirst}
        />
      )}
      {isLoading ? <p className="loading">Loading Movies..</p> : null}
      <div className="searched-movies">
        {searchedMovies && <SearchList searchedMovies={searchedMovies} />}
      </div>
    </div>
  );
};

export default SearchPage;
