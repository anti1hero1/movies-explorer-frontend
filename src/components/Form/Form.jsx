import { MESSAGE, PATH_NAME } from "../../utils/constants";
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
  isSuccess,
}) {
  const { AUTORIZATION, REGISTRATION } = PATH_NAME;
  const {
    ERROR_PROFILE,
    ERROR_REGISTRATION,
    ERROR_AUTORIZATION,
    SUCCESS_PROFILE,
  } = MESSAGE;
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
            {ERROR_AUTORIZATION}
          </span>
          <button
            type="submit"
            className={`login__submit ${
              isValid ? "" : "login__submit_disabled"
            }`}
            disabled={!isValid}
          >
            Войти
          </button>
        </>
      ) : name === REGISTRATION ? (
        <>
          <span
            className={`login__error-request login__error-request_type_reg ${
              isError ? "login__error-request_active" : ""
            }`}
          >
            {ERROR_REGISTRATION}
          </span>
          <button
            type="submit"
            className={`login__submit ${
              isValid ? "" : "login__submit_disabled"
            }`}
          >
            Зарегистрироваться
          </button>
        </>
      ) : (
        <>
          <span
            className={`message ${
              isError && "profile__error-request message_active"
            }
               ${isSuccess && "profile__success-request message_active"}
            }`}
          >
            {isError ? ERROR_PROFILE : SUCCESS_PROFILE}
          </span>
          {isEditActive && (
            <button
              type="submit"
              className="profile__submit_save"
              disabled={!isValid || isSending || isChanged}
            >
              Сохранить
            </button>
          )}
        </>
      )}
    </form>
  );
}
