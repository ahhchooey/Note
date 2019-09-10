import React from "react";
import {Link} from "react-router-dom";


const FourZeroFour = (props) => (
  <div className="four-zero-four">
    <p>404</p>
    <Link className="four-zero-four-button" to={"/"}>AHH, go back.</Link>
  </div>
)

export default FourZeroFour;
