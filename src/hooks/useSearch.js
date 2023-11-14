import { useEffect, useState } from "react";
import { MESSAGE, PATH_NAME } from "../utils/constants";
import { getMoviesApi } from "../utils/MoviesApi";
import { useLocation } from "react-router-dom";
import { filterMovies } from "../utils/utils";

export function useSearch(values, setValues, saveMovie) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const { pathname } = useLocation();
  const [isSearch, setSearch] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("allMovies" in localStorage && pathname === `/${PATH_NAME.MOVIES}`) {
      setValues(JSON.parse(localStorage.values));
      setFilteredMovies(JSON.parse(localStorage.searchedMovies));
      isNothing(JSON.parse(localStorage.searchedMovies));
    } else if (pathname === `/${PATH_NAME.SAVE}`) {
      setFilteredMovies(filterMovies(saveMovie, values));
      isNothing(filterMovies(saveMovie, values));
    }
  }, [saveMovie]);

  function search() {
    let movies;
    if (pathname === `/${PATH_NAME.MOVIES}`) {
      movies = searchMoviesMain(movies);
    } else {
      movies = filterMovies(saveMovie, values);
      setFilteredMovies(movies);
    }
    isNothing(movies);
  }

  function searchMoviesMain() {
    const movies = filterMovies(JSON.parse(localStorage.allMovies), values);
    localStorage.values = JSON.stringify(values);
    localStorage.searchedMovies = JSON.stringify(movies);
    setFilteredMovies(movies);
    return movies;
  }

  function isNothing(movies) {
    movies.length === 0 ? setMessage(MESSAGE.NOTHING) : setMessage("");
  }

  useEffect(() => {
    if (values.search.length === 0 && pathname === `/${PATH_NAME.MOVIES}`) {
      return;
    }
    search();
  }, [values.short]);

  async function handldeSearch() {
    setMessage("");
    if (!("allMovies" in localStorage) && pathname === `/${PATH_NAME.MOVIES}`) {
      try {
        setSearch(true);
        const allMovies = await getMoviesApi();
        localStorage.allMovies = JSON.stringify(allMovies);
        isNothing(searchMoviesMain());
        setSearch(false);
        return;
      } catch (err) {
        setSearch(false);
        setMessage(MESSAGE.ERROR_SEARCH);
      }
    }
    search();
  }

  return {
    values,
    filteredMovies,
    handldeSearch,
    isSearch,
    message,
    setFilteredMovies,
  };
}
