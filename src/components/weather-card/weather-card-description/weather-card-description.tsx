import React from "react";
import { CityWeatherAdapted } from "../../../types";
import { upperCaseFirst } from "../../../common";

import "./weather-card-description.scss";

interface Props {
  city: CityWeatherAdapted;
}

const WeatherCardDescription: React.FC<Props> = ({ city }) => {
  const { main, weather } = city;

  return (
    <>
      <p className="weather-card__description">
        {`Feels like ${main.feelsLike}ºC. `}
        {weather.map((item) => (
          <span key={item.id}>{`${upperCaseFirst(item.description)}. `}</span>
        ))}
      </p>
    </>
  );
};

export default WeatherCardDescription;
