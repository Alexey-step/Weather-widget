import { CityWeatherAdapted } from "../types";

export enum ActionType {
  SET_CITY_WEATHER = "setCityWeather",
  SET_STATUS = "setStatus",
  DELETE_CITY_WEATHER = "deleteCityWeather",
  SET_CITIES = "setCities",
}

interface setCityWeatherAction {
  type: ActionType.SET_CITY_WEATHER;
  payload: CityWeatherAdapted;
}

interface setCitiesAction {
  type: ActionType.SET_CITY_WEATHER;
  payload: CityWeatherAdapted[];
}

interface setStatusAction {
  type: ActionType.SET_STATUS;
  payload: string;
}

interface deleteCityWeatherAction {
  type: ActionType.SET_STATUS;
  payload: number;
}

export type ActionTypes =
  | setCityWeatherAction
  | setStatusAction
  | setCitiesAction
  | deleteCityWeatherAction;
