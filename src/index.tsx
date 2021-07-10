import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReactShadowRoot from "react-shadow-root";
import { configureStore } from "@reduxjs/toolkit";
import App from "./components/app/app";
import createAPI from "./store/api/api";
import { reducer } from "./store/reducer";

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

customElements.define("weather-widget", class extends HTMLElement {});

ReactDOM.render(
  <ReactShadowRoot>
    <link
      rel="stylesheet"
      href="https://best-weather-widget.netlify.app/styles.min.css"
    />
    <Provider store={store}>
      <App />
    </Provider>
  </ReactShadowRoot>,
  document.querySelector("weather-widget")
);
