import React from "react";
import {Link} from "react-router-dom";


const Logo = (props) => (
  <Link className="complete-logo" to={"/"}>
    <img className="logo" src="https://www.designfreelogoonline.com/wp-content/uploads/2017/07/000856-Wolf-head-logo-maker-01.png" alt="logo" />
    <h1 className="splash-title">note</h1>
  </Link>
)

export default Logo;
