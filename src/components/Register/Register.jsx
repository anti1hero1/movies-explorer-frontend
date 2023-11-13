import Input from "../Input/Input";
import SectionLogin from "../SectionLogin/SectionLogin";
import useFormValidation from "../../hooks/useFormValidation";

export default function Login({ name, setLoggedIn, handleRegister }) {
  const { values, errors, isInputValid, isValid, handleChange } =
    useFormValidation();

  function onRegister(evt) {
    evt.preventDefault();
    handleRegister(values);
  }

  return (
    <SectionLogin name={name} isValid={isValid} onSubmit={onRegister}>
      <Input
        name="username"
        type="text"
        title="Имя"
        minLength="2"
        value={values.username}
        isInputValid={isInputValid.username}
        error={errors.username}
        onChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        title="E-mail"
        value={values.email}
        isInputValid={isInputValid.email}
        error={errors.email}
        onChange={handleChange}
      />
      <Input
        name="password"
        type="password"
        title="Пароль"
        minLength="3"
        value={values.password}
        isInputValid={isInputValid.password}
        error={errors.password}
        onChange={handleChange}
      />
    </SectionLogin>
  );
}
