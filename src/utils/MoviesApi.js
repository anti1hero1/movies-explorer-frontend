import { BASE_URL_BEATFILM, PATH_NAME } from "./constants";
import { checkResponse } from "./utils";

export const getMoviesApi = () => {
  return fetch(`${BASE_URL_BEATFILM}${PATH_NAME.BEATFILM}`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
};
