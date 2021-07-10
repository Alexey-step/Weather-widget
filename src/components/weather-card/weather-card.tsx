import React from "react";
import { CityWeatherAdapted } from "../../types";
import WeatherCardDescription from "./weather-card-description/weather-card-description";
import LocationArrowIcon from "../UI/icons/location-arrow-icon/location-arrow-icon";

interface Props {
  city: CityWeatherAdapted;
}

const WeatherCard: React.FC<Props> = ({ city }) => {
  const { name, sys, wind, visibility, main, weather } = city;

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
      <div className="weather-card__group">
        <p className="weather-card__text">
          <LocationArrowIcon />
          {wind.speed}m/s {wind.deg}
        </p>
        <p className="weather-card__text">Pressure: {main.pressure}hPa</p>
        <p className="weather-card__text">
          Humidity: <span>{main.humidity}%</span>
        </p>
        <p className="weather-card__text">Visibility: {visibility}km</p>
        <p className="weather-card__text"></p>
      </div>
    </article>
  );
};

export default WeatherCard;
