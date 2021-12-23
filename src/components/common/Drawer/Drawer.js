import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import ScrollBox from "components/common/ScrollBox";

import styles from "./Drawer.module.scss";

function CloseDrawerButton({ setIsOpen }) {
  return (
    <button className={styles.closeDrawerBtn}>
      <FontAwesomeIcon
        onClick={() => setIsOpen(false)}
        icon={["fas", "long-arrow-alt-right"]}
      />
    </button>
  );
}

export default function Drawer({ children, isOpen, setIsOpen }) {
  let drawerClass = classNames(styles.Drawer, isOpen ? styles.open : "");

  return (
    <div className={drawerClass}>
      <CloseDrawerButton setIsOpen={setIsOpen} />
      <ScrollBox>{children}</ScrollBox>
    </div>
  );
}
