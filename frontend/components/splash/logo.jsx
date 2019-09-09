import React from "react";
import {Link} from "react-router-dom";


const Logo = (props) => (
  <Link to={"/"}>
    <img className="logo" src="https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD" alt="logo" />
    <h1>note</h1>
  </Link>
)

export default Logo;
