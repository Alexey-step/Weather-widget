import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { setCityWeather } from "../../store/action-creators";
import Widget from "../widget/widget";
import { CityWeatherAdapted } from "../../types";
import { Status } from "../../const";
import Error from "../error/error";
import useGeolocation from "../../hooks/useGeolocation";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state);
  const { errorMessage } = useGeolocation();

  useEffect(() => {
    const citiesList = JSON.parse(localStorage.getItem("items"));
    if (citiesList) {
      citiesList.forEach((city: CityWeatherAdapted) =>
        dispatch(setCityWeather(city))
      );
    }
  }, [dispatch]);

  return (
    <>
      {status === Status.ERROR && <Error message={errorMessage} />}
      <Widget />
    </>
  );
};

export default App;
