import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useEffect, useState } from "react";
import { getMoviesApi } from "../utils/MoviesApi";
import * as api from "../utils/MainApi";
import { PATH_NAME } from "../utils/constants";
import { CurrentUserContext } from "../context/CurrentUserContex";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.loggedIn ?? false);
  const [moviesAll, setMoviesAll] = useState([]);
  const [saveMovie, setSaveMovie] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const getAllMovies = () => {
    getMoviesApi()
      .then((res) => {
        setMoviesAll(res);
      })
      .catch();
  };

  const handleRegister = (value) => {
    api
      .registration(value)
      .then(() => {
        handleLogin(value);
      })
      .catch();
  };

  const handleLogin = (value) => {
    api
      .authorization(value)
      .then(({ token }) => {
        navigate(PATH_NAME.MOVIES, { replace: true });
        setLoggedIn(true);
        localStorage.loggedIn = true;
        localStorage.jwt = token;
        console.log(token);
      })
      .catch();
  };

  const signOut = () => {
    setLoggedIn(false);
    localStorage.clear();
    localStorage.loggedIn = false;
  };

  // const checkToken = () => {
  //   api
  //     .checkToken()
  //     .then((user) => {
  //       setCurrentUser({
  //         name: user.name,
  //         email: user.email,
  //       });
  //     })
  //     .catch((err) => {
  //       signOut();
  //       console.log(err);
  //     });
  // };

  const checkToken = async () => {
    try {
      const user = await api.checkToken();
      setCurrentUser({
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      signOut();
      console.log(err);
    }
  };

  const getSavedMovies = () => {
    api
      .getMovies()
      .then((data) => setSaveMovie(data))
      .catch();
  };

  const handleLikeMovies = (movie) => {
    if (!saveMovie.some((item) => item.movieId === movie.id)) {
      api
        .addMovies(movie)
        .then((res) => setSaveMovie((movie) => [...movie, res]))
        .catch();
    } else {
      const id = saveMovie.find((item) => item.movieId === movie.id)._id;
      api
        .deleteMovies(id)
        .then(() =>
          setSaveMovie((movies) => movies.filter((item) => item._id !== id))
        )
        .catch();
    }
  };

  const handleDelete = (movie) => {
    api
      .deleteMovies(movie._id)
      .then(() =>
        setSaveMovie((movies) =>
          movies.filter((item) => item._id !== movie._id)
        )
      )
      .catch();
  };

  useEffect(() => {
    checkToken();
    getSavedMovies();
  }, [loggedIn]);

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Routes>
          <Route
            path="/signin"
            element={
              <Main
                name="signin"
                setLoggedIn={setLoggedIn}
                handleLogin={handleLogin}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Main
                name="signup"
                setLoggedIn={setLoggedIn}
                handleRegister={handleRegister}
              />
            }
          />

          <Route
            path="/"
            element={
              <>
                <Header name="home" loggedIn={loggedIn} />
                <Main name="home" />
                <Footer />
              </>
            }
          />

          <Route
            path="/movies"
            element={
              <>
                <Header />
                <Main
                  name="movies"
                  moviesAll={moviesAll}
                  saveMovie={saveMovie}
                  handleLikeMovies={handleLikeMovies}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="/saved-movies"
            element={
              <>
                <Header />
                <Main
                  name="savedmovies"
                  saveMovie={saveMovie}
                  handleDelete={handleDelete}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Main
                  name="profile"
                  setLoggedIn={setLoggedIn}
                  signOut={signOut}
                />
              </>
            }
          />

          <Route
            path="*"
            element={
              <>
                <Main name="error" />
              </>
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
