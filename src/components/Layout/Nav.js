import { NavLinkWrapper } from "components/Links";

import style from "./Nav.module.scss";

const Nav = ({ background }) => (
  <nav className={background ? style.backgroundNav : style.nav}>
    <ul>
      <li>
        <NavLinkWrapper text="aspects" icon="user" />
      </li>
      <li>
        <NavLinkWrapper text="assets" icon="warehouse" />
      </li>
      <li>
        <NavLinkWrapper text="household" icon="home" />
      </li>
      <li>
        <NavLinkWrapper text="meals" icon="utensils" />
      </li>
      <li>
        <NavLinkWrapper text="overview" icon="eye" />
      </li>
    </ul>
  </nav>
);

export default Nav;
