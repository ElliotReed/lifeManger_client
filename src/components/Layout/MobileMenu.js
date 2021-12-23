import React from "react";
import Nav from "./Nav";

import styles from "./MobileMenu.module.scss";

export default function MobileMenu({ isActive, setIsActive }) {
  let offCanvasStyle = `${styles.offCanvasContainer} ${
    isActive ? styles.openNav : ""
  }`;

  return (
    <aside className={offCanvasStyle} onClick={() => setIsActive(false)}>
      <div className={styles.offscreenNavWrapper}>
        <Nav />
      </div>
    </aside>
  );
}
