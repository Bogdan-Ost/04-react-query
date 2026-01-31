import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

interface Settings {
  params: {
    query: string;
    page: number;
  };
  headers: {
    Authorization: string;
  };
}

interface fetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<fetchMoviesResponse> => {
  const settings: Settings = {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const { data } = await axios.get<fetchMoviesResponse>(BASE_URL, settings);
  return data;
};
