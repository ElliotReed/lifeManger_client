import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "components/common/Logo";

import styles from "./welcome.module.scss";

const siteTitle = process.env.REACT_APP_SITE_TITLE;
export default function Welcome() {
  return (
    <section className={styles.Welcome}>
      <div className={styles.jumbotron}>
        <header className={styles.head}>
          <Logo siteTitle={siteTitle} />
        </header>
        <div className={styles.body}>
          <p>
            <b>{siteTitle}</b> is a tool to help organize your life
          </p>
        </div>
        <footer>
          <NavLink to="authorization/sign-in">Sign In</NavLink>
          <NavLink to="authorization/create-account">Create Account</NavLink>
        </footer>
      </div>
    </section>
  );
}
