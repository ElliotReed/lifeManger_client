import classNames from "classnames";

import styles from "./ShowHIdeContainer.module.scss";

export default function ShowHideContainer({ show = false, children }) {
  const showHideStyle = classNames(
    styles.ShowHideContainer,
    !show ? styles.hide : ""
  );

  return <div className={showHideStyle}>{children}</div>;
}
