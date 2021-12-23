import { NavLinkWrapper } from "components/Links";

import styles from "./footer-nav.module.scss";

const FooterNav = ({ background }) => (
  <nav className={background ? styles.backgroundNav : styles.nav}>
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

export default FooterNav;
