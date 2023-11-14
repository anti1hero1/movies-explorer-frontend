import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "./SectionLogin.css";
import { PATH_NAME } from "../../utils/constants";

export default function SectionLogin({
  name,
  children,
  isValid,
  onSubmit,
  isError,
}) {
  const { AUTORIZATION, REGISTRATION } = PATH_NAME;
  return (
    <section className="login page__login">
      <Link to={"/"} className="login__link-home"></Link>
      <h2 className="login__title">
        {name === AUTORIZATION ? "Рады видеть!" : "Добро пожаловать!"}
      </h2>
      <Form name={name} isValid={isValid} onSubmit={onSubmit} isError={isError}>
        {children}
      </Form>

      {name === AUTORIZATION ? (
        <p className="login__text">
          Ещё не зарегистрированы?{" "}
          <Link to={`/${REGISTRATION}`} className="login__link">
            Регистрация
          </Link>
        </p>
      ) : name === REGISTRATION ? (
        <p className="login__text">
          Уже зарегистрированы?{" "}
          <Link to={`/${AUTORIZATION}`} className="login__link">
            Войти
          </Link>
        </p>
      ) : (
        <Link to={"/"}>Выйти из аккаунта</Link>
      )}
    </section>
  );
}
