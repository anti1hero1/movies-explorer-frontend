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
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

export default function Main({
  name,
  setLoggedIn,
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
  isSuccess,
  setSuccess,
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
              isSuccess={isSuccess}
              setSuccess={setSuccess}
            />
          ),
          movies: (
            <Movies
              handleLikeMovies={handleLikeMovies}
              saveMovie={saveMovie}
              name={name}
            />
          ),
          "saved-movies": (
            <SavedMovies
              handleDelete={handleDelete}
              saveMovie={saveMovie}
              name={name}
            />
          ),
        }[name]
      }
    </main>
  );
}
