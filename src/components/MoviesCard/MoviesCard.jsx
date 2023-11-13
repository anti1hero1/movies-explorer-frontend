import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { Link } from "react-router-dom";
import { getDuration, getUrlImage } from "../../utils/utils";
import { PATH_NAME } from "../../utils/constants";

export default function MoviesCard({
  data,
  handleLikeMovies,
  saveMovie,
  handleDelete,
}) {
  const { pathname } = useLocation();
  const { nameRU, image, trailerLink, duration } = data;
  const isLiked =
    pathname === PATH_NAME.MOVIES
      ? saveMovie.some((item) => item.movieId === data.id)
      : false;

  function onClick() {
    if (pathname === PATH_NAME.MOVIES) {
      handleLikeMovies(data);
    } else {
      handleDelete(data);
    }
  }
  return (
    <li className="gallery__card">
      <article>
        <Link to={trailerLink} target="_blank">
          <img
            src={
              pathname === PATH_NAME.MOVIES
                ? getUrlImage(image.url)
                : data.image
            }
            alt={nameRU}
            className="gallery__image"
          />
        </Link>
        <div className="gallery__card-group">
          <div className="gallery__text-group">
            <p className="gallery__subtitle">{nameRU}</p>
            <span className="gallery__duration">{getDuration(duration)}</span>
          </div>
          {pathname === PATH_NAME.MOVIES ? (
            <button
              type="button"
              className={`gallery__save ${
                isLiked ? "gallery__save_active" : ""
              }`}
              onClick={onClick}
            />
          ) : (
            <button
              type="button"
              className={`gallery__save gallery__save_type_delete`}
              onClick={onClick}
            />
          )}
        </div>
      </article>
    </li>
  );
}
