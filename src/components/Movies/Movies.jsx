import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CARD_PARAM, SCREEN } from "../../utils/constants";
import { useSearch } from "../../hooks/useSearch";

export default function Movies({ saveMovie, handleLikeMovies, name }) {
  const { VERY_MAX_WIDTH, MAX_WIDTH, MEDIUM_WIDTH, SMALL_WIDTH } = CARD_PARAM;
  const [count, setCount] = useState(VERY_MAX_WIDTH.init);
  const [values, setValues] = useState({ search: "", short: false });
  const { filteredMovies, handldeSearch, isSearch, message } = useSearch(
    values,
    setValues
  );
  const { pathname } = useLocation();

  function printCards() {
    let counter = {};
    if (window.innerWidth < SCREEN.MEDIUM_WIDTH) {
      counter.init = SMALL_WIDTH.init;
      counter.step = SMALL_WIDTH.step;
    } else if (window.innerWidth < SCREEN.MAX_WIDTH) {
      counter.init = MEDIUM_WIDTH.init;
      counter.step = MEDIUM_WIDTH.step;
    } else if (window.innerWidth < SCREEN.VERY_MAX_WIDTH) {
      counter.init = MAX_WIDTH.init;
      counter.step = MAX_WIDTH.step;
    } else {
      counter.init = VERY_MAX_WIDTH.init;
      counter.step = VERY_MAX_WIDTH.step;
    }
    return counter;
  }

  useEffect(() => {
    function printCardsForResize() {
      setCount(printCards().init);
    }
    printCardsForResize();
    window.addEventListener("resize", printCardsForResize);
    return () => window.removeEventListener("resize", printCardsForResize);
  }, [pathname]);

  function clickMore() {
    setCount(count + printCards().step);
  }
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
        handleLikeMovies={handleLikeMovies}
        saveMovie={saveMovie}
        isSearch={isSearch}
        clickMore={clickMore}
        count={count}
        name={name}
        message={message}
      />
    </>
  );
}
