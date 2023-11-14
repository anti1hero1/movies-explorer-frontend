import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import Profile from "../Profile/Profile";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function Main({
  name,
  setLoggedIn,
  moviesAll,
  saveMovie,
  handleLogin,
  handleRegister,
  handleLikeMovies,
  handleDelete,
  signOut,
  isSending,
  handleEditProfile,
  isError,
  isEditActive,
  setEditActive,
}) {
  return (
    <main className="main">
      {
        {
          home: (
            <>
              <Promo />
              <AboutProject />
              <Techs />
              <AboutMe />
              <Portfolio />
            </>
          ),
          signin: (
            <Login
              name={name}
              setLoggedIn={setLoggedIn}
              handleLogin={handleLogin}
              isError={isError}
            />
          ),
          signup: (
            <Register
              name={name}
              setLoggedIn={setLoggedIn}
              handleRegister={handleRegister}
              isError={isError}
            />
          ),
          error: <Error />,
          profile: (
            <Profile
              name={name}
              setLoggedIn={setLoggedIn}
              signOut={signOut}
              isSending={isSending}
              handleEditProfile={handleEditProfile}
              isError={isError}
              isEditActive={isEditActive}
              setEditActive={setEditActive}
            />
          ),
          movies: (
            <>
              <SearchForm isCheck={() => {}} changeShot={() => {}} />
              <MoviesCardList
                movies={moviesAll}
                handleLikeMovies={handleLikeMovies}
                saveMovie={saveMovie}
              />
            </>
          ),
          'saved-movies': (
            <>
              <SearchForm isCheck={() => {}} changeShot={() => {}} />
              <MoviesCardList movies={saveMovie} handleDelete={handleDelete} />
            </>
          ),
        }[name]
      }
    </main>
  );
}
