import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "./Button";

import styles from "./IconButton.module.scss";

export default function IconButton({
  title = "",
  type = "button",
  disabled = false,
  onClick = null,
  icon,
  children,
  shape = null,
}) {
  const displayedIcon = (icon) => {
    return <FontAwesomeIcon icon={["fas", `${icon}`]} />;
  };

  return (
    <Button
      shape={shape}
      style="icon"
      title={title}
      type={type}
      disabled={disabled}
      bgColor={styles.bgColor}
      onClick={onClick}
    >
      <span className={styles.iconMargin}>{displayedIcon(icon)}</span>
      {children}
    </Button>
  );
}
