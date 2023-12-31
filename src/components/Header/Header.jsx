import { useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { PATH_NAME } from "../../utils/constants";

export default function Header({ name, loggedIn }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { HOME, AUTORIZATION, REGISTRATION, MOVIES, SAVE, PROFILE } = PATH_NAME;

  function handelClick() {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  function clickLink() {
    setIsOpen(false);
  }

  useEffect(() => {
    function closeBurgerForResize() {
      if (document.documentElement.clientWidth > "767") {
        setIsOpen(false);
        window.removeEventListener("resize", closeBurgerForResize);
      }
    }
    if (isOpen) {
      window.addEventListener("resize", closeBurgerForResize);
      return () => window.removeEventListener("resize", closeBurgerForResize);
    }
  }, [isOpen]);

  return (
    <header
      className={`header page__header ${
        name !== HOME ? "page__header_type_page" : ""
      }`}
    >
      <div>
        <Link to={"/"} className="header__link-home"></Link>
      </div>
      {!loggedIn ? (
        <nav>
          <ul className="header__links-container">
            <li>
              <Link to={`/${REGISTRATION}`} className="header__signup">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to={`/${AUTORIZATION}`} className="header__signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <>
          <nav className={`header__nav ${isOpen ? "header__nav_open" : ""}`}>
            <ul className="header__links-container header__links-container_type_page">
              <li className="header__link-container">
                <Link
                  to={"/"}
                  className={`header__link ${
                    pathname === "/" ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Главная
                </Link>
              </li>
              <li className="header__link-container">
                <Link
                  to={`/${MOVIES}`}
                  className={`header__link ${
                    pathname === `/${MOVIES}` ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Фильмы
                </Link>
              </li>
              <li className="header__link-container">
                <Link
                  to={`/${SAVE}`}
                  className={`header__link ${
                    pathname === `/${SAVE}` ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="header__link-container">
                <Link
                  to={`/${PROFILE}`}
                  className={`header__link header__link_type_acc ${
                    pathname === `/${PROFILE}` ? "header__link_active" : ""
                  }`}
                  onClick={clickLink}
                >
                  Аккаунт <div className="header__profile-icon"></div>
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="header__burger-close"
              onClick={handelClick}
            ></button>
          </nav>
          <button
            type="button"
            className="header__burger"
            onClick={handelClick}
          ></button>
        </>
      )}
    </header>
  );
}
