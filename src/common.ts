import { CityWeather, CityWeatherAdapted } from "./types";
import { ADAPT_VISIBILITY } from "./const";

export const adaptToClient = (data: CityWeather): CityWeatherAdapted => {
  const adaptedData = {
    ...data,
    main: {
      ...data.main,
      feelsLike: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      temp: Math.round(data.main.temp),
    },
    visibility: data.visibility / ADAPT_VISIBILITY,
  };

  delete adaptedData.main.feels_like;
  delete adaptedData.main.temp_min;
  delete adaptedData.main.temp_max;

  return adaptedData;
};

export const upperCaseFirst = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};
