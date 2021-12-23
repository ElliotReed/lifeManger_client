import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Nav.module.scss";

const NavPublic = ({ background }) => (
  <nav className={background ? style.backgroundNav : style.nav}>
    <ul>
      <li>
        <NavLink to="/" activeClassName={style.active}>
          Home
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default NavPublic;
