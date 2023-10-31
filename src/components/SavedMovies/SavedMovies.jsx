import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useCallback, useEffect, useState } from "react";

export default function SavedMovies({ savedMovies, onDelete, setIsError }) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [searchedMovie, setSearchedMovie] = useState('')
  const [isCheck, setIsCheck] = useState(false)

  const filter = useCallback((search, isCheck, movies) => {
    setSearchedMovie(search)
    setFilteredMovies(movies.filter((movie) => {
      const searchName = movie.nameRU.toLowerCase().includes(search.toLowerCase())
      return isCheck ? (searchName && movie.duration <= 40) : searchName
    }))
  }, [])

  function searchMovies(search) {
    filter(search, isCheck, savedMovies)
  }

  useEffect(() => {
    filter(searchedMovie, isCheck, savedMovies)
  }, [filter, savedMovies, isCheck, searchedMovie])

  function changeShort() {
    if (isCheck) {
      setIsCheck(false)
      filter(searchedMovie, false, savedMovies)
    } else {
      setIsCheck(true)
      filter(searchedMovie, true, savedMovies)
    }
  }

  return (
    <>
      <SearchForm
        isCheck={isCheck}
        searchMovies={searchMovies}
        searchedMovie={searchedMovie}
        changeShort={changeShort}
        setIsError={setIsError}
        savedMovies={savedMovies}
      />
      <MoviesCardList
        movies={filteredMovies}
        onDelete={onDelete}
      />
    </>
  )
}
