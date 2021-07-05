import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Widget from "../widget/widget";
import { store } from "../../index";

// eslint-disable-next-line no-undef
class WidgetWeather extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  connectedCallback() {
    // eslint-disable-next-line no-undef
    const mountPoint = document.createElement("div");
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(mountPoint);

    return ReactDOM.render(
      <Provider store={store}>
        <Widget />
      </Provider>,
      mountPoint
    );
  }
}

// eslint-disable-next-line no-undef
window.customElements.define("widget-weather", WidgetWeather);

export default WidgetWeather;

// // eslint-disable-next-line no-undef
// const testInstance = document.createElement("widget-weather");
// // eslint-disable-next-line no-undef
// document.body.appendChild(testInstance);
