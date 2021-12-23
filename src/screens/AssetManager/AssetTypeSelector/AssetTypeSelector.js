import styles from "./asset-type-selector.module.scss";

export default function AssetTypeSelector({ list, handleClick }) {
  return (
    <div className={styles.AssetTypeSelector}>
      <ul>
        {list &&
          list.map((item) => (
            <li key={item.id} data-id={item.id} onClick={handleClick}>
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  );
}
