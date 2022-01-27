import { useAuth } from "libs/authentication/useAuth";

import Logo from "components/common/Logo/";
import LoginRegister from "./LoginRegister";
import Nav from "../Nav";
import NavPublic from "../NavPublic";
import UserMenu from "./UserMenu";

import styles from "./header.module.scss";

// Hamburger menu button deactivated in favor of footer nav
const Header = ({ siteTitle, isActive, setIsActive }) => {
  const auth = useAuth();

  let hamburgerStyle = `${styles.hamburger} ${styles.hamburgerSqueeze} ${
    isActive ? styles.isActive : ""
  }`;

  return (
    <header className={styles.header}>
      <Logo siteTitle={siteTitle} />
      <div className={styles.mainNavWrapper}>
        {auth.user ? <Nav /> : <NavPublic />}
      </div>
      {auth.user ? <UserMenu /> : <LoginRegister />}
      {/* <button
        className={hamburgerStyle}
        type="button"
        onClick={() => setIsActive(!isActive)}
      >
        <span className={styles.hamburgerBox}>
          <span className={styles.hamburgerInner}></span>
        </span>
      </button> */}
    </header>
  );
};

export default Header;
