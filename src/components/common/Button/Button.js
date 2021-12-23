import React from "react";
import cn from "classnames";

import styles from "./Button.module.scss";

const Button = ({
  title = "",
  type = "button",
  disabled = false,
  children,
  onClick,
  bgColor = styles.primary,
  style = "default",
}) => {
  const buttonClass = cn(
    styles.button,
    bgColor,
    style === "icon" ? styles.icon : null
  );
  return (
    <button
      title={title}
      type={type}
      disabled={disabled}
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
