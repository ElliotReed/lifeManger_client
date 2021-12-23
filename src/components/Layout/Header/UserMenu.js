import * as React from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAuth } from "libs/authentication/useAuth";

import DateDisplay from "components/common/datetime/DateDisplay";
import styles from "./user-menu.module.scss";

export default function UserMenu() {
  const auth = useAuth();
  const [displayMenu, setDisplayMenu] = React.useState(false);

  React.useEffect(() => {
    const hideUserMenu = () => setDisplayMenu(false);

    if (displayMenu) {
      window.addEventListener("click", hideUserMenu);
    }

    return () => {
      window.removeEventListener("click", hideUserMenu);
    };
  }, [displayMenu]);

  return (
    <div className={styles.userMenu}>
      <div className={styles.logged}>
        <button
          className={styles.icon}
          onClick={() => setDisplayMenu(!displayMenu)}
        >
          <FontAwesomeIcon icon={["fas", "user-circle"]} size="lg" />
        </button>
        <ul
          className={
            displayMenu ? classnames(styles.menu, styles.menuOpen) : styles.menu
          }
        >
          <li className={styles.user}>
            <FontAwesomeIcon icon={["fas", "user-circle"]} size="2x" />{" "}
            <p className={styles.email}>{auth.user.email}</p>
          </li>
          <li className={styles.history}>
            <p>user since:</p>
            <DateDisplay>{auth.user.createdAt}</DateDisplay>
          </li>

          <li className={styles.signout} onClick={auth.logout}>
            <p>Sign Out</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
