import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "./Profile.css";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContex";

export default function Profile({
  name,
  signOut,
  isSending,
  handleEditProfile,
  isError,
  isEditActive,
  setEditActive,
  isSuccess,
  setSuccess,
}) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    reset({ username: currentUser.name, email: currentUser.email });
  }, [reset, currentUser]);

  function outLogin() {
    signOut();
  }

  function handleEdit() {
    setEditActive(true);
    setSuccess(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleEditProfile(values);
  }

  return (
    <section className="profile page__profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <Form
        name={name}
        isValid={isValid}
        onSubmit={handleSubmit}
        isEditActive={isEditActive}
        isSending={isSending}
        isChanged={
          values.username === currentUser.name &&
          values.email === currentUser.email
        }
        isError={isError}
        isSuccess={isSuccess}
      >
        <Input
          selectname={name}
          name="username"
          type="text"
          title="Имя"
          minLength="3"
          value={values.username}
          isInputValid={isInputValid.username}
          error={errors.username}
          onChange={handleChange}
          isEditActive={isEditActive}
        />
        <Input
          selectname={name}
          name="email"
          type="email"
          title="E-mail"
          value={values.email}
          isInputValid={isInputValid.email}
          error={errors.email}
          onChange={handleChange}
          isEditActive={isEditActive}
        />
      </Form>
      {!isEditActive && (
        <>
          <button
            type="button"
            className="profile__submit"
            onClick={handleEdit}
          >
            {"Редактировать"}
          </button>
          <Link to={"/"} onClick={outLogin} className="profile__link">
            Выйти из аккаунта
          </Link>
        </>
      )}
    </section>
  );
}
