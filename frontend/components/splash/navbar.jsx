import React from "react";
import {Link} from "react-router-dom";

import Logo from "./logo.jsx";
import AuthButtons from "./auth_buttons.jsx";


export default class Navbar extends React.Component {

  render() {
    return (
      <nav className="navbar">
        <Logo />
        <Link className="plans" to={"/plans"}>Plans</Link>
        <Link className="features" to={"/"}>Features</Link>
        <Link className="help" to={"/help"}>Help & Learning</Link>
        <Link className="about" to={"/"}>About Me</Link>
        <AuthButtons /> 
      </nav>
    )
  }
}
