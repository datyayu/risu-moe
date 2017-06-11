import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./base.css";

/*******************
 *    BASE APP     *
 *******************/

const ConnectedApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

/*******************
 *     RENDER      *
 *******************/

const rootElement = document.getElementById("root");
ReactDOM.render(ConnectedApp, rootElement);

/*******************
 * SERVICE WORKER  *
 *******************/

registerServiceWorker();
