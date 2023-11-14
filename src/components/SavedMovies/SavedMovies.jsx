import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useSearch } from "../../hooks/useSearch";
import { useState } from "react";

export default function SavedMovies({
  saveMovie,
  handleDelete,
  isSearch,
  name,
}) {
  const [values, setValues] = useState({ search: "", short: false });
  const { filteredMovies, handldeSearch, message } = useSearch(
    values,
    setValues,
    saveMovie
  );

  return (
    <>
      <SearchForm
        handldeSearch={handldeSearch}
        values={values}
        setValues={setValues}
        name={name}
      />
      <MoviesCardList
        movies={filteredMovies}
        handleDelete={handleDelete}
        saveMovie={saveMovie}
        isSearch={isSearch}
        message={message}
      />
    </>
  );
}
