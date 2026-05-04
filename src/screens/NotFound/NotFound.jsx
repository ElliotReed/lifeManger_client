import { NavLink } from "react-router-dom";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.NotFound}>
      <h1>404 not found</h1>
      <p>the page you are looking for doesn't exist</p>
      <NavLink to="/">home</NavLink>
    </div>
  );
}
