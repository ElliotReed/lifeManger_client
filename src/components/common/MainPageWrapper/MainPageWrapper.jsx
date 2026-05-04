import styles from "./main-page-wrapper.module.scss";

export default function MainPageWrapper(props) {
  return (
    <div id="main-portal-root" className={styles.mainWrapper}>
      <main>{props.children}</main>
    </div>
  );
}
