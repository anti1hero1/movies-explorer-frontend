import { BASE_URL_BEATFILM, MAX_DURATION } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getDuration(duration) {
  return `${(duration / 60) | 0}ч ${duration % 60}м`;
}

export function getUrlImage(url) {
  return BASE_URL_BEATFILM + url;
}

export function filterMovies(moviesList, values) {
  const flteredMovies = moviesList.filter(
    (movie) =>
      movie.nameEN
        .toLowerCase()
        .trim()
        .includes(values.search.trim().toLowerCase()) ||
      movie.nameRU
        .toLowerCase()
        .trim()
        .includes(values.search.trim().toLowerCase())
  );
  if (values.short) {
    return flteredMovies.filter((movie) => movie.duration <= MAX_DURATION);
  }
  return flteredMovies;
}
