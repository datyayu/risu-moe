import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import registerServiceWorker from "./registerServiceWorker";
import "./base.css";

import { store } from "./store";
import { App } from "./App";

const ConnectedApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

const rootElement = document.getElementById("root");

ReactDOM.render(ConnectedApp, rootElement);
registerServiceWorker();
