import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import * as api from "../utils/MainApi";
import { PATH_NAME } from "../utils/constants";
import { CurrentUserContext } from "../context/CurrentUserContex";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.loggedIn) ?? false
  );
  const [saveMovie, setSaveMovie] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isSending, setSending] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isEditActive, setEditActive] = useState(false);

  const {
    HOME,
    AUTORIZATION,
    REGISTRATION,
    PROFILE,
    MOVIES,
    SAVE,
    OTHER,
    ERROR,
  } = PATH_NAME;

  const navigate = useNavigate();
  function handleRegister(value) {
    setSending(true);
    api
      .registration(value)
      .then(() => {
        setError(false);
        handleLogin(value);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(setSending(false));
  }

  function handleLogin(value) {
    setSending(true);
    api
      .authorization(value)
      .then(({ token }) => {
        setError(false);
        navigate(`/${MOVIES}`, { replace: true });
        setLoggedIn(true);
        localStorage.loggedIn = true;
        localStorage.jwt = token;
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(setSending(false));
  }

  function signOut() {
    navigate("/", { replace: true });
    setLoggedIn(false);
    localStorage.clear();
  }

  function checkToken() {
    api
      .checkToken()
      .then((user) => {
        setCurrentUser({
          name: user.name,
          email: user.email,
        });
      })
      .catch((err) => {
        signOut();
        console.log(err);
      });
  }

  function getSavedMovies() {
    api
      .getMovies()
      .then((data) => setSaveMovie(data))
      .catch((err) => console.log(err));
  }

  function handleLikeMovies(movie) {
    if (!saveMovie.some((item) => item.movieId === movie.id)) {
      api
        .addMovies(movie)
        .then((res) => setSaveMovie((movie) => [...movie, res]))
        .catch((err) => console.log(err));
    } else {
      const id = saveMovie.find((item) => item.movieId === movie.id)._id;
      api
        .deleteMovies(id)
        .then(() =>
          setSaveMovie((movies) => movies.filter((item) => item._id !== id))
        )
        .catch((err) => console.log(err));
    }
  }

  function handleDelete(movie) {
    api
      .deleteMovies(movie._id)
      .then(() =>
        setSaveMovie((movies) =>
          movies.filter((item) => item._id !== movie._id)
        )
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setError(false);
    setSuccess(false);
    setEditActive(false);
  }, [navigate]);

  function handleEditProfile(values) {
    setSending(true);
    api
      .setUserInfo(values)
      .then((user) => {
        setError(false);
        setSuccess(true);
        setCurrentUser({ name: user.name, email: user.email });
        setEditActive(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      })
      .finally(setSending(false));
  }

  useEffect(() => {
    if (localStorage.loggedIn) {
      checkToken();
      getSavedMovies();
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Routes>
          <Route
            path={`/${AUTORIZATION}`}
            element={
              loggedIn ? (
                <Navigate to={`/${MOVIES}`} replace />
              ) : (
                <Main
                  name={AUTORIZATION}
                  setLoggedIn={setLoggedIn}
                  handleLogin={handleLogin}
                  isError={isError}
                />
              )
            }
          />

          <Route
            path={`/${REGISTRATION}`}
            element={
              loggedIn ? (
                <Navigate to={`/${MOVIES}`} replace />
              ) : (
                <Main
                  name={REGISTRATION}
                  setLoggedIn={setLoggedIn}
                  handleRegister={handleRegister}
                  isError={isError}
                />
              )
            }
          />

          <Route
            path="/"
            element={
              <>
                <Header name={HOME} loggedIn={loggedIn} />
                <Main name={HOME} />
                <Footer />
              </>
            }
          />

          <Route
            path={`/${MOVIES}`}
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={Main}
                  name={MOVIES}
                  saveMovie={saveMovie}
                  handleLikeMovies={handleLikeMovies}
                  loggedIn={loggedIn}
                />
                <Footer />
              </>
            }
          />

          <Route
            path={`/${SAVE}`}
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={Main}
                  name={SAVE}
                  saveMovie={saveMovie}
                  handleDelete={handleDelete}
                  loggedIn={loggedIn}
                />
                <Footer />
              </>
            }
          />

          <Route
            path={`/${PROFILE}`}
            element={
              <>
                <Header loggedIn={loggedIn} />
                <ProtectedRoute
                  element={Main}
                  name={PROFILE}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  signOut={signOut}
                  isSending={isSending}
                  handleEditProfile={handleEditProfile}
                  isError={isError}
                  isEditActive={isEditActive}
                  setEditActive={setEditActive}
                  isSuccess={isSuccess}
                  setSuccess={setSuccess}
                />
              </>
            }
          />

          <Route
            path={OTHER}
            element={
              <>
                <Main name={ERROR} />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
