import styles from "./ScrollBox.module.scss";

export default function ScrollBox({ children }) {
  return <div className={styles.scrollbox}>{children}</div>;
}
