import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./components/app/app";
import createAPI from "./store/api/api";
import { reducer } from "./store/reducer";
// import { fetchWeather } from "./store/api/api-actions";

import "./index.scss";

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

// store.dispatch(fetchWeather());

// function HtmlTagWrapper(Component: (props?: any) => JSX.Element) {
//   const el = document.getElementById("simple-calendar");
//   const attrs = el.attributes;

//   const props = attrToObj(attrs);
//   console.log(props);
//   ReactDOM.render(<Component {...props} />, el);
// }

// const el = document.getElementById("weather-widget");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#weather-widget")
);
