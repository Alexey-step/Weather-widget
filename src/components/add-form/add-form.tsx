import React from "react";
import EnterArrowIcon from "../UI/icons/enter-arrow-icon/enter-arrow-icon";
import useAddForm from "../../hooks/useAddForm";

const AddForm: React.FC = () => {
  const { value, handleChange, handleSubmit } = useAddForm();

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
