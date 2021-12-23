import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./links.module.scss";

export const AssetManagerLink = () => (
  <Link to="/asset">
    <i className="material-icons link__i">style</i>
    <span className="link__seperator">Asset Manager</span>
  </Link>
);
export const NavLinkWrapper = ({ text, icon }) => {
  return (
    <NavLink
      to={`/${text}`}
      title={text}
      className={styles.link}
      activeClassName={styles.active}
    >
      <FontAwesomeIcon icon={icon} />
      <span className={styles.link__seperator}>{text}</span>
    </NavLink>
  );
};

export const BackLink = (props) => (
  <Link to={props.to}>
    <FontAwesomeIcon icon={props.icon} />
    <span className="link__seperator">{props.children}</span>
  </Link>
);
