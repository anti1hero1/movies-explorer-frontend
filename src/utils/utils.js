import { BASE_URL_BEATFILM } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getDuration = (duration) =>
  `${(duration / 60) | 0}ч ${duration % 60}м`;

export const getUrlImage = (url) => BASE_URL_BEATFILM + url;
