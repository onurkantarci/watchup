import { useRef } from "react";
import ListItem from "./ListItem";
import Toast from "./Toast";
import headers from "../shared/api";

const ContentList = ({ movies }) => {
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
        toastRef.current.showToast(
          "success",
          "Added to watchlist successfully!"
        );
      })
      .catch((error) => {
        console.error("Error adding to watchlist", error.message);
        toastRef.current.showToast("error", "Couldn't add to watchlist!");
      });
  };

  const movieContent = movies.map((movie) => (
    <>
      <ListItem
        key={movie.id}
        movie={movie}
        handleAddToList={() => handleAddToList(movie.id)}
      />
    </>
  ));

  return (
    <div className="movies-content">
      <Toast ref={toastRef} />
      {movieContent}
    </div>
  );
};

export default ContentList;
