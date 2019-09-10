import React from "react";
import {Route, Switch} from "react-router-dom";

import Navbar from "./navbar.jsx";
import FrontPage from "./front_page.jsx";
import FourZeroFour from "../errors/page_not_found_404.jsx";


const Splash = (props) => (
  <div className="splash">
    <Navbar />
    <Switch>
      <Route exact path={"/"} component={FrontPage} />
      <Route path={"/"} component={FourZeroFour} />
    </Switch>
  </div>
)

export default Splash;
