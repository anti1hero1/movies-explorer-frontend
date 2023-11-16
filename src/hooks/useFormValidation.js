import { useCallback, useEffect, useState } from "react";
import { EMAIL_REGEX, MESSAGE, NAME_REGEX } from "../utils/constants";

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isInputValid, setIsInputValid] = useState({});
  const [isValid, setIsValid] = useState(false);
  const { ERROR_NAME, ERROR_EMAIL } = MESSAGE;

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });
    setErrors((oldErrors) => {
      if (name === "email" && !EMAIL_REGEX.test(value)) {
        return {
          ...oldErrors,
          [name]: ERROR_EMAIL,
        };
      } else if (name === "username" && !NAME_REGEX.test(value)) {
        return {
          ...oldErrors,
          [name]: ERROR_NAME,
        };
      } else {
        return { ...oldErrors, [name]: validationMessage };
      }
    });
    setIsInputValid((oldValid) => {
      if (
        (name === "email" && !EMAIL_REGEX.test(value)) ||
        (name === "username" && !NAME_REGEX.test(value))
      ) {
        return { ...oldValid, [name]: false };
      } else {
        return { ...oldValid, [name]: valid };
      }
    });

    setIsValid(form.checkValidity());
  }

  useEffect(() => {
    if (isValid && !Object.values(isInputValid).includes(false)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isInputValid]);

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });
  }, []);

  const reset = useCallback((data = {}) => {
    setValues(data);
    setErrors({});
    setIsInputValid({});
    setIsValid(false);
  }, []);

  return {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    setValue,
    reset,
  };
}
