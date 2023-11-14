import { PATH_NAME } from "../../utils/constants";
import "./Form.css";

export default function Form({
  name,
  children,
  isValid,
  onSubmit,
  isEditActive,
  isSending,
  isChanged,
  isError,
}) {
  const { AUTORIZATION, REGISTRATION } = PATH_NAME;
  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {name === AUTORIZATION ? (
        <>
          <span
            className={`login__error-request ${
              isError ? "login__error-request_active" : ""
            }`}
          >
            {"При входе произошла ошибка."}
          </span>
          <button
            type="submit"
            className={`login__submit ${
              isValid ? "" : "login__submit_disabled"
            }`}
            disabled={!isValid}
          >
            {"Войти"}
          </button>
        </>
      ) : name === REGISTRATION ? (
        <>
          <span
            className={`login__error-request login__error-request_type_reg ${
              isError ? "login__error-request_active" : ""
            }`}
          >
            {"При регистрации произошла ошибка."}
          </span>
          <button
            type="submit"
            className={`login__submit ${
              isValid ? "" : "login__submit_disabled"
            }`}
          >
            {"Зарегистрироваться"}
          </button>
        </>
      ) : (
        <>
          <span
            className={`profile__error-request ${
              isError ? "profile__error-request_active" : ""
            }`}
          >
            {"При обновлении профиля произошла ошибка."}
          </span>
          {isEditActive && (
            <button
              type="submit"
              className="profile__submit_save"
              disabled={!isValid || isSending || isChanged }
            >
              Сохранить
            </button>
          )}
        </>
      )}
    </form>
  );
}
