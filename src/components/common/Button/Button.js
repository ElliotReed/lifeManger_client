import React from "react";
import cx from 'classnames';

import styles from "./Button.module.scss";

const Button = ({
  title = "",
  type = "button",
  disabled = false,
  children,
  onClick,
  bgColor = styles.primary,
}) => {
  return (
    <button
      title={title}
      type={type}
      disabled={disabled}
      className={cx(styles.button, bgColor)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
