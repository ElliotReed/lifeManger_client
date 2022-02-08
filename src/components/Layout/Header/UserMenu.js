import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "libs/authentication/useAuth";

import Button, { ButtonGroup } from "components/common/Button";
import DateDisplay from "components/common/datetime/DateDisplay";

import styles from "./user-menu.module.scss";

export default function UserMenu() {
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
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
        <section
          className={
            displayMenu ? classnames(styles.menu, styles.menuOpen) : styles.menu
          }
        >
          <ul className={styles.userMenuList}>
            <li className={styles.user}>
              <FontAwesomeIcon icon={["fas", "user-circle"]} size="2x" />{" "}
              <p className={styles.email}>{auth.user.email}</p>
            </li>
            <li className={styles.history}>
              <p>user since:</p>
              <DateDisplay>{auth.user.createdAt}</DateDisplay>
            </li>
          </ul>
          <div className={styles.signout}>
            <ButtonGroup position="center">
              <Button
                onClick={() =>
                  auth.logout(
                    navigate("authorization/sign-in", {
                      state: { from: { pathname: location } },
                    })
                  )
                }
              >
                Sign Out
              </Button>
            </ButtonGroup>
          </div>
        </section>
      </div>
    </div>
  );
}
