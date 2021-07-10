import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../store/api/api-actions";

interface IForm {
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (evt: SyntheticEvent) => void;
  value: string;
}

const useAddForm = (): IForm => {
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

  return {
    value,
    handleChange,
    handleSubmit,
  };
};

export default useAddForm;
