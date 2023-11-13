import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "./Profile.css";
import Input from "../Input/Input";
import useFormValidation from "../../hooks/useFormValidation";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContex";

export default function Profile({ name, signOut }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    reset({ username: currentUser.name, email: currentUser.email });
  }, [reset]);
console.log(currentUser);
  function onEdit(evt) {
    evt.preventDefault();

  }

  function outLogin() {
    signOut();
  }

  return (
    <section className="profile page__profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
      <Form name={name} isValid={isValid} onSubmit={onEdit}>
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
        />
      </Form>
      <Link to={"/"} onClick={outLogin} className="profile__link">
        Выйти из аккаунта
      </Link>
    </section>
  );
}
