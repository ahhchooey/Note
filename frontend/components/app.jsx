import React from "react";
import {Provider} from "react-redux";
import {HashRouter, Route, Switch} from "react-router-dom";

import Splash from "./splash/splash.jsx";
import Note from "./note/nb.jsx";
import {AuthRoute, ProtectedRoute} from "../utils/route_util.jsx";
import SignupFormContainer from "./splash/signup_form_container.js";
import LoginFormContainer from "./splash/login_form_container.js";

const App = (props) => (
  <Provider store={props.store}>
    <HashRouter>
      <Switch>

        <ProtectedRoute path={"/note"} component={Note} />

        <AuthRoute exact path={"/signup"} component={SignupFormContainer} />
        <AuthRoute exact path={"/login"} component={LoginFormContainer} />
        <AuthRoute path={"/"} component={Splash} />

      </Switch>
    </HashRouter>
  </Provider>
)

export default App;
