import styles from "screens/colorTest.module.scss";

export function ColorTest() {
  return (
    <div className={styles.colorTest}>
      <ul className={styles.main}>
        <li>
          <div className={styles.main100}></div>
          <p>main-100</p>
        </li>
        <li>
          <div className={styles.main200}></div>
          <p>main-200</p>
        </li>
        <li>
          <div className={styles.main300}></div>
          <p>main-300</p>
        </li>
        <li>
          <div className={styles.main400}></div>
          <p>main-400</p>
        </li>
        <li>
          <div className={styles.main500}></div>
          <p>main-500</p>
        </li>
        <li>
          <div className={styles.main600}></div>
          <p>main-600</p>
        </li>
        <li>
          <div className={styles.main700}></div>
          <p>main-700</p>
        </li>
        <li>
          <div className={styles.main800}></div>
          <p>main-800</p>
        </li>
        <li>
          <div className={styles.main900}></div>
          <p>main-900</p>
        </li>
      </ul>
    </div>
  );
}
