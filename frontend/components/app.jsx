import React from "react";
import {Provider} from "react-redux";
import {HashRouter, Route} from "react-router-dom";

import Splash from "./splash/splash.jsx";

const App = (props) => (
  <Provider store={props.store}>
    <HashRouter>

      <h1>I am app</h1>
      <Route path={"/"} component={Splash} />

    </HashRouter>
  </Provider>
)

export default App;
