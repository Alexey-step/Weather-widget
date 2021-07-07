import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import retargetEvents from "react-shadow-dom-retarget-events";
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
class WidgetWeather extends HTMLElement {
  mountPoint: HTMLDivElement;

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(this.mountPoint);
    retargetEvents(shadowRoot);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      this.mountPoint
    );
  }
}

customElements.define("weather-widget", WidgetWeather);
