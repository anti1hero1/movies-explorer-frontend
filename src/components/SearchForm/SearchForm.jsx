import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";
import { MESSAGE, PATH_NAME } from "../../utils/constants";

export default function SearchForm({
  handldeSearch,
  values,
  setValues,
  name,
}) {
  const [isError, setIsError] = useState(false);

  function onSubmit(evt) {
    evt.preventDefault();
    if (name === PATH_NAME.MOVIES && values.search.length === 0) {
      setIsError(true);
      return;
    } else {
      handldeSearch();
      setIsError(false);
    }
  }

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const checked = evt.target.checked;
    const type = evt.target.type;

    setValues((oldValues) => {
      if (type === "checkbox") {
        return { ...oldValues, [name]: checked };
      }
      return { ...oldValues, [name]: value };
    });
  }

  return (
    <section className="search">
      <div className="search__container">
        <form
          noValidate
          className="search__form"
          name={"SearchForm"}
          onSubmit={onSubmit}
          id="SearchForm"
        >
          <input
            name="search"
            type="search"
            placeholder="Фильм"
            className="search__input"
            value={values.search}
            required
            onChange={handleChange}
          />
          <button className="search__submit" />
        </form>
        <span
          className={`search__error ${isError ? "search__error_active" : ""}`}
        >
          {isError ? MESSAGE.ERROR_EMPTY_STRING : ""}
        </span>
        <FilterCheckbox isCheck={values.short} changeShot={handleChange} />
      </div>
    </section>
  );
}
