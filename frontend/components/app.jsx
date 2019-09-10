import React from "react";
import {Provider} from "react-redux";
import {HashRouter, Route, Switch} from "react-router-dom";

import Splash from "./splash/splash.jsx";
import Note from "./note/nb.jsx";
import {AuthRoute, ProtectedRoute} from "../utils/route_util.jsx";

const App = (props) => (
  <Provider store={props.store}>
    <HashRouter>
      <Switch>

        <ProtectedRoute path={"/note"} component={Note} />
        <AuthRoute path={"/"} component={Splash} />

      </Switch>
    </HashRouter>
  </Provider>
)

export default App;
