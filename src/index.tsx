import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./components/app/app";
import createAPI from "./store/api/api";
import { reducer } from "./store/reducer";
import { fetchWeather } from "./store/api/api-actions";

import "./components/styles/styles.scss";

const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(fetchWeather());

class WidgetWeather extends HTMLElement {
  mountPoint: HTMLDivElement;

  connectedCallback() {
    this.mountPoint = document.createElement("div");

    return ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      this.mountPoint
    );
  }
}

window.customElements.define("widget-weather", WidgetWeather);
