import styles from "screens/colorTest.module.scss";

const shades = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];

function ListItem({ baseName, shade }) {
  return (
    <li>
      <div className={styles[baseName + shade]}></div>
      <p>{`${baseName}-${shade}`}</p>
    </li>
  );
}

function makeList(baseName) {
  const list = shades.map((shade) => (
    <ListItem baseName={baseName} shade={shade} />
  ));
  return list;
}
export function ColorTest() {
  const mainColorList = () => makeList("main");
  const supportColorList = () => makeList("support");
  const accentColorList = () => makeList("accent");

  return (
    <div className={styles.colorTest}>
      <ul className={styles.main}>{mainColorList()}</ul>
      <ul className={styles.support}>{supportColorList()}</ul>
      <ul className={styles.accent}>{accentColorList()}</ul>
    </div>
  );
}
