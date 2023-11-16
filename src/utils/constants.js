export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const NAME_REGEX = /^[a-zA-Zа-яА-Я\s-]+$/;

export const BASE_URL_MAIN =
  "https://api.anti1hero1-diplom.nomoredomainsrocks.ru";
export const BASE_URL_BEATFILM = "https://api.nomoreparties.co";

export const PATH_NAME = {
  HOME: "home",
  BEATFILM: "beatfilm-movies",
  AUTORIZATION: "signin",
  REGISTRATION: "signup",
  PROFILE: "profile",
  MOVIES: "movies",
  SAVE: "saved-movies",
  USER: "users/me",
  OTHER: "*",
  ERROR: "error",
};

export const MESSAGE = {
  ERROR_PROFILE: "При обновлении профиля произошла ошибка.",
  ERROR_REGISTRATION: "При регистрации произошла ошибка.",
  ERROR_AUTORIZATION: "При входе произошла ошибка.",
  SUCCESS_PROFILE: "Данные успешно изменены.",
  ERROR_EMAIL: "Пожалуйста, введите адрес электронной почты.",
  ERROR_NAME: "Cодержит только латиницу, кириллицу, пробел или дефис",
  ERROR_SEARCH:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
  ERROR_EMPTY_STRING: "Введите ключевое слово.",
  NOTHING: "Ничего не найдено.",
};

export const SCREEN = {
  VERY_MAX_WIDTH: 1280,
  MAX_WIDTH: 1024,
  MEDIUM_WIDTH: 650,
  SMALL_WIDTH: 320,
};

export const CARD_PARAM = {
  VERY_MAX_WIDTH: {
    init: 16,
    step: 4,
  },
  MAX_WIDTH: {
    init: 12,
    step: 3,
  },
  MEDIUM_WIDTH: {
    init: 8,
    step: 2,
  },
  SMALL_WIDTH: {
    init: 5,
    step: 2,
  },
};

export const MAX_DURATION = 40;
