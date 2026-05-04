import React from "react";
import classNames from "classnames";

import styles from "./button.module.scss";

export function ButtonGroup({ children, position = "end" }) {
  const buttonGroupClass = classNames(styles.buttonGroup, styles[position]);
  return <div className={buttonGroupClass}>{children}</div>;
}

export default function Button({
  title = "",
  type = "button",
  disabled = false,
  children,
  onClick,
  bgColor = styles.primary,
  style = "default",
  ariaLabel = "",
  shape = "pill",
}) {
  const buttonClass = classNames(
    styles.button,
    bgColor,
    style === "icon" ? styles.icon : null,
    shape === "pill" ? styles.pill : null
  );
  return (
    <button
      title={title}
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
