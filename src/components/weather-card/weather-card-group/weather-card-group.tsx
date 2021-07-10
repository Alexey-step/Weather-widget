import React from "react";
import { CityWeatherAdapted } from "../../../types";
import LocationArrowIcon from "../../UI/icons/location-arrow-icon/location-arrow-icon";

interface Props {
  city: CityWeatherAdapted;
}

const WeatherCardGroup: React.FC<Props> = ({ city }) => {
  const { wind, visibility, main } = city;
  const { pressure, humidity } = main;
  const { speed, deg } = wind;

  return (
    <div className="weather-card__group">
      <p className="weather-card__text">
        <LocationArrowIcon />
        {speed}m/s {deg}
      </p>
      <p className="weather-card__text">Pressure: {pressure}hPa</p>
      <p className="weather-card__text">
        Humidity: <span>{humidity}%</span>
      </p>
      <p className="weather-card__text">Visibility: {visibility}km</p>
      <p className="weather-card__text"></p>
    </div>
  );
};

export default WeatherCardGroup;
