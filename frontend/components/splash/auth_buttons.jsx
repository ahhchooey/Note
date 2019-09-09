import React from "react";
import {Link} from "react-router-dom";


const AuthButtons = (props) => (
  <div className="auth-buttons">
    <Link className="signup-button" to={"/signup"}>Sign Up</Link>
    {" or "}
    <Link className="login-button" to={"/login"}>Log In</Link>
  </div>
)

export default AuthButtons;
