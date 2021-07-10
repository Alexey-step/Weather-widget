import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactShadowRoot from "react-shadow-root";
import { RootState } from "../../store/reducer";
import { setCityWeather, setStatus } from "../../store/action-creators";
import Widget from "../widget/widget";
import { CityWeatherAdapted } from "../../types";
import { fetchUserWeather } from "../../store/api/api-actions";
import { Status } from "../../const";
import Error from "../error/error";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state);

  const geolocationSuccess = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    dispatch(
      fetchUserWeather(position.coords.latitude, position.coords.longitude)
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationSuccess);
    } else {
      dispatch(setStatus(Status.ERROR));
      setTimeout(() => dispatch(setStatus(Status.PENDING)), 3000);
    }
  }, []);

  useEffect(() => {
    const citiesList = JSON.parse(localStorage.getItem("items"));
    if (citiesList) {
      citiesList.forEach((city: CityWeatherAdapted) =>
        dispatch(setCityWeather(city))
      );
    }
  }, [dispatch]);

  if (status === Status.ERROR) {
    return <Error message="Geolocation off" />;
  }

  return (
    <ReactShadowRoot>
      <link
        rel="stylesheet"
        href="https://best-weather-widget.netlify.app/styles.min.css"
      />
      <Widget />
    </ReactShadowRoot>
  );
};

export default App;
