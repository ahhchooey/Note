import React from "react";
import {Route} from "react-router-dom";

import Navbar from "./navbar.jsx";
import FrontPage from "./front_page.jsx";
import SignupFormContainer from "./signup_form_container.js";
import LoginFormContainer from "./login_form_container.js";


const Splash = (props) => (
  <div className="splash">
    <Navbar />
    <Route exact path={"/"} component={FrontPage} />
    <Route exact path={"/signup"} component={SignupFormContainer} />
    <Route exect path={"/login"} component={LoginFormContainer} />
  </div>
)

export default Splash;
