import React from "react";
import { CityWeatherAdapted } from "../../types";
import WeatherCardDescription from "./weather-card-description/weather-card-description";
import WeatherCardGroup from "./weather-card-group/weather-card-group";

interface Props {
  city: CityWeatherAdapted;
}

const WeatherCard: React.FC<Props> = ({ city }) => {
  const { name, sys, main, weather } = city;

  return (
    <article className="weather-card">
      <h2 className="weather-card__title">
        {name}, {sys.country}
      </h2>
      <div className="weather-card__wrapper">
        <div className="weather-card__img-wrapper">
          {weather.map((item) => (
            <img
              key={item.id}
              className="weather-card__img"
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt="weather"
            />
          ))}
        </div>
        <span className="weather-card__temperature">{main.temp}ºC</span>
      </div>
      <WeatherCardDescription city={city} />
      <WeatherCardGroup city={city} />
    </article>
  );
};

export default WeatherCard;
