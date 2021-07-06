import { ThunkAction } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { APIRoutes, Status, API_KEY } from "../../const";
import { ActionTypes } from "../actions";
import * as ActionCreators from "../action-creators";
import { adaptToClient } from "../../common";

type AppThunk<ReturnType = void> = ThunkAction<
  Promise<ReturnType>,
  unknown,
  AxiosInstance,
  ActionTypes
>;

// api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}

export const fetchWeather =
  (city = "London"): AppThunk =>
  async (dispatch, _getState, api) => {
    dispatch(ActionCreators.setStatus(Status.LOAD));
    try {
      const { data } = await api.get(
        `${APIRoutes.WEATHER}q=${city}&appid=${API_KEY}&units=metric`
      );
      dispatch(ActionCreators.setCityWeather(adaptToClient(data)));
      dispatch(ActionCreators.setStatus(Status.LOADED));
    } catch (e) {
      dispatch(ActionCreators.setStatus(Status.ERROR));
    }
  };

export const fetchUserWeather =
  (lat: number, long: number): AppThunk =>
  async (dispatch, _getState, api) => {
    dispatch(ActionCreators.setStatus(Status.LOAD));
    try {
      const { data } = await api.get(
        `${APIRoutes.WEATHER}lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
      );
      dispatch(ActionCreators.setCityWeather(adaptToClient(data)));
      dispatch(ActionCreators.setStatus(Status.LOADED));
    } catch (e) {
      dispatch(ActionCreators.setStatus(Status.ERROR));
    }
  };
