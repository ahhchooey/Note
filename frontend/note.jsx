import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app.jsx";
import configureStore from "./stores/store.js";


$(() => {
  const root = document.getElementById("root");

  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = {
      session: {
        currentUser: window.currentUser
      }
    };
    delete window.currentUser;
  }
  const store = configureStore(preloadedState);
  //  window.getState = store.getState;
  //  window.dispatch = store.dispatch;

  ReactDOM.render(<App store={store} />, root)
})
