import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app.jsx";
import configureStore from "./stores/store.js";


$(() => {
  const root = document.getElementById("root");
  const store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<App store={store} />, root)
})
