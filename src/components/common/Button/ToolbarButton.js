import React from "react";
import Button from "./Button";

import styles from "./ToolbarButton.module.scss";

export default function ToolbarButton({
  title = "",
  type = "button",
  disabled = false,
  children,
  onClick,
}) {
  return (
    <Button
      title={title}
      type={type}
      disabled={disabled}
      bgColor={styles.bgColor}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
