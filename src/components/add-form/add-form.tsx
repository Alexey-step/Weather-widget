import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import EnterArrowIcon from "../UI/icons/enter-arrow-icon/enter-arrow-icon";
import { fetchWeather } from "../../store/api/api-actions";

import "./add-form.scss";

const AddForm: React.FC = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(fetchWeather(value));
    setValue("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="add-form__label" htmlFor="city-name">
        Add Location:
      </label>
      <div className="add-form__wrapper">
        <input
          className="add-form__field"
          onChange={handleChange}
          type="text"
          id="city-name"
          value={value}
          placeholder="New York"
        />
        <button type="submit" className="add-form__btn">
          <EnterArrowIcon />
        </button>
      </div>
    </form>
  );
};

export default AddForm;
