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
