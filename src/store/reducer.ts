import { createReducer } from "@reduxjs/toolkit";
import { CityWeatherAdapted } from "../types";
import * as ActionCreators from "./action-creators";
import { Status } from "../const";

interface InitialStateTypes {
  cities: CityWeatherAdapted[];
  status: string;
}

const InitialState: InitialStateTypes = {
  cities: [],
  status: Status.PENDING,
};

export const reducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(ActionCreators.setCityWeather, (state, action) => {
      const index = state.cities.findIndex(
        (city) => city.id === action.payload.id
      );
      if (index >= 0) {
        state.cities = [...state.cities];
      } else {
        state.cities = [...state.cities, action.payload];
      }
    })
    .addCase(ActionCreators.setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(ActionCreators.setCities, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(ActionCreators.deleteCityWeather, (state, action) => {
      const index = state.cities.findIndex(
        (city) => city.id === action.payload
      );
      state.cities = [
        ...state.cities.slice(0, index),
        ...state.cities.slice(index + 1),
      ];
    });
});

export type RootState = ReturnType<typeof reducer>;
