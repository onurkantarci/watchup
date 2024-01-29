import { useRef } from "react";
import SearchItem from "./SearchItem";
import Toast from "./Toast";
import headers from "../shared/api";

const SearchList = ({ searchedMovies }) => {
  const toastRef = useRef();

  const handleAddToList = (movieId) => {
    const addToListRequest = {
      method: "POST",
      headers,
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        watchlist: true,
      }),
    };

    fetch(
      "https://api.themoviedb.org/3/account/20802055/watchlist",
      addToListRequest
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to add to watchlist. ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        toastRef.current.showToast("success");
      })
      .catch((error) => {
        console.error("Error adding to watchlist", error.message);
        toastRef.current.showToast("error");
      });
  };

  const movieContent = searchedMovies.map((movie) => (
    <>
      <Toast ref={toastRef} />
      <SearchItem
        key={movie.id}
        movie={movie}
        handleAddToList={() => handleAddToList(movie.id)}
      />
    </>
  ));
  return <div className="searched-movies-content">{movieContent}</div>;
};

export default SearchList;
