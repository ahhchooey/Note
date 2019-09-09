import React from "react";
import {Route} from "react-router-dom";

import Navbar from "./navbar.jsx";
import FrontPage from "./front_page.jsx";


const Splash = (props) => (
  <div className="splash">
    <Navbar />
    <Route path={"/"} component={FrontPage} />
  </div>
)

export default Splash;
