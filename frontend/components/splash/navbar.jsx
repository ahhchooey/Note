import React from "react";

import Logo from "./logo.jsx";
import AuthButtons from "./auth_buttons.jsx";


export default class Navbar extends React.Component {

  componentDidMount() {
    $(".about").hover(() => {
      $(".about-dropdown").toggleClass("visible")
    })
  }

  render() {
    return (
      <nav className="navbar">
        <Logo className="complete-logo" />
        <div className="links">
          <div className="ln plans" to={"/"}>Plans<font className="arrow"></font></div>
          <div className="ln features" to={"/"}>Features<font className="arrow"></font></div>
          <div className="ln help" to={"/"}>Help & Learning</div>
          <div className="ln about about-ln" to={"/"}>About Me<font className="arrow">▼</font>
            <div className="about-dropdown">
              <a href="https://github.com/ahhchooey/Note">
                <img className="about-me-img" src="https://image.flaticon.com/icons/png/512/25/25231.png" />
              </a>
              <a href="https://github.com/ahhchooey/Note">
                <img className="about-me-img" src="https://image.flaticon.com/icons/png/512/34/34227.png" />
              </a>
              <a href="https://alexchui.dev">
                <img className="about-me-img" src="http://www.vectorico.com/download/office/folder-icon.png" />
              </a>
            </div>
          </div>
        </div>
        <AuthButtons /> 
      </nav>
    )
  }
}
