import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import headers from "../shared/api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  useEffect(() => {
    const getMovieDetails = () => {
      setLoading(true);
      fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMovieDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    getMovieDetails();
  }, [id]);

  return (
    <div className="details">
      {movieDetails && (
        <div>
          {loading ? <p className="loading">Loading...</p> : null}
          <img
            className="original-image"
            src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
            alt={movieDetails.title}
          ></img>
          <a
            href={movieDetails.homepage}
            rel="noreferrer"
            target="_blank"
            style={linkStyle}
          >
            <h1>
              <IoHome /> {movieDetails.title}
            </h1>
          </a>
          <p>
            Genre: {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
          <h4>Release Date: {movieDetails.release_date}</h4>
          <p>Budget: {movieDetails.budget}</p>
          <h4>Language: {movieDetails.original_language.toUpperCase()}</h4>
          <h3>{movieDetails.overview}</h3>
          {movieDetails.genres && <div></div>}
          <h4>
            Production Companies:&nbsp;
            {movieDetails.production_companies.map((company) => (
              <span key={company.id}>
                {company.name}, ({company.origin_country})
              </span>
            ))}
          </h4>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
