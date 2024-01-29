const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export default headers;
