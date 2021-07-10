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
        <span className="weather-card__value">
          {speed}m/s {deg}
        </span>
      </p>
      <p className="weather-card__text">
        Pressure: <span className="weather-card__value">{pressure}hPa</span>
      </p>
      <p className="weather-card__text">
        Humidity: <span className="weather-card__value">{humidity}%</span>
      </p>
      <p className="weather-card__text">
        Visibility: <span className="weather-card__value">{visibility}km</span>
      </p>
    </div>
  );
};

export default WeatherCardGroup;
