import { createAction } from "@reduxjs/toolkit";
import { ActionType } from "./actions";

export const setCityWeather = createAction(
  ActionType.SET_CITY_WEATHER,
  (cityWeather) => {
    return {
      payload: cityWeather,
    };
  }
);

export const setStatus = createAction(ActionType.SET_STATUS, (status) => {
  return {
    payload: status,
  };
});

export const setCities = createAction(ActionType.SET_CITIES, (cities) => {
  return {
    payload: cities,
  };
});

export const deleteCityWeather = createAction(
  ActionType.DELETE_CITY_WEATHER,
  (cityId) => {
    return {
      payload: cityId,
    };
  }
);
