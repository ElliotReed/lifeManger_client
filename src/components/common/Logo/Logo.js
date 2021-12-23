import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Logo.module.scss";

export default function Logo({ siteTitle }) {
  return (
    <div className={style.logo}>
      <Link to="/">
        <span>
          <FontAwesomeIcon icon={["fas", "yin-yang"]} />
        </span>
        <p>{siteTitle}</p>
      </Link>
    </div>
  );
}
