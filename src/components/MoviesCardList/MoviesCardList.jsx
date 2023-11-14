import { PATH_NAME } from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

export default function MoviesCardList({
  movies,
  handleLikeMovies,
  saveMovie,
  handleDelete,
  isSearch,
  clickMore,
  count,
  name,
  message,
}) {
  return (
    <section className="gallery page__gallery">
      {isSearch && name === PATH_NAME.MOVIES ? (
        <Preloader />
      ) : message ? (
        <span>{message}</span>
      ) : (
        <>
          <ul className="gallery__lists">
            {movies.slice(0, count).map((data) => {
              return (
                <MoviesCard
                  key={data.id ?? data._id}
                  data={data}
                  handleLikeMovies={handleLikeMovies}
                  saveMovie={saveMovie}
                  handleDelete={handleDelete}
                />
              );
            })}
          </ul>
          {name === PATH_NAME.MOVIES && (
            <button
              type="button"
              className={`gallery__more ${
                count >= movies.length && "gallery__more_hidden"
              }`}
              onClick={clickMore}
            >
              Ёще
            </button>
          )}
        </>
      )}
    </section>
  );
}
