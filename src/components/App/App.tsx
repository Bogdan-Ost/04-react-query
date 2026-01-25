// import { useState } from "react";
import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };
  const {
    data = [],
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["person", searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  useEffect(() => {
    if (searchQuery && data && data.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data, searchQuery]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isFetched && <Loader />}
      {isError && <ErrorMessage />}
      {data.length > 0 && <MovieGrid movies={data} onSelect={openModal} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster />
    </div>
  );
}
