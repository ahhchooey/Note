import React from "react";
import {Link} from "react-router-dom";

import Logo from "./logo.jsx";
import AuthButtons from "./auth_buttons.jsx";


export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar">
        <Logo className="complete-logo" />
        <div className="links">
          <Link className="ln plans" to={"/plans"}>Plans<font className="arrow">▼</font></Link>
          <Link className="ln features" to={"/"}>Features<font className="arrow">▼</font></Link>
          <Link className="ln help" to={"/help"}>Help & Learning</Link>
          <Link className="ln about" to={"/"}>About Me<font className="arrow">▼</font></Link>
        </div>
        <AuthButtons /> 
      </nav>
    )
  }
}
