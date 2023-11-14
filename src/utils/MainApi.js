import { PATH_NAME, BASE_URL_MAIN, BASE_URL_BEATFILM } from "./constants";
import { checkResponse } from "./utils";

const { AUTORIZATION, REGISTRATION, MOVIES, USER } = PATH_NAME;

export function getMovies() {
  return fetch(`${BASE_URL_MAIN}/${MOVIES}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  }).then(checkResponse);
};

export function addMovies(data) {
  return fetch(`${BASE_URL_MAIN}/${MOVIES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.jwt}`,
    },
    body: JSON.stringify({
      country: data.country,
      director: data.director,
      duration: data.duration,
      description: data.description,
      year: data.year,
      image: BASE_URL_BEATFILM + data.image.url,
      trailerLink: data.trailerLink,
      thumbnail: BASE_URL_BEATFILM + data.image.formats.thumbnail.url,
      movieId: data.id,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }),
  }).then(checkResponse);
}

export function deleteMovies(id) {
  return fetch(`${BASE_URL_MAIN}/${MOVIES}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  }).then(checkResponse);
}

export function registration({ username, email, password }) {
  return fetch(`${BASE_URL_MAIN}/${REGISTRATION}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username, email, password }),
  }).then(checkResponse);
}

export function authorization({ email, password }) {
  return fetch(`${BASE_URL_MAIN}/${AUTORIZATION}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function checkToken() {
  return fetch(`${BASE_URL_MAIN}/${USER}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.jwt}`,
    },
  }).then(checkResponse);
}

export function setUserInfo({ username, email }) {
  return fetch(`${BASE_URL_MAIN}/${USER}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.jwt}`,
    },
    body: JSON.stringify({ name: username, email }),
  }).then(checkResponse);
}
